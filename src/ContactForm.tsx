import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSitePreferences } from './context/SitePreferences.tsx'
import { formCopy } from './strings.ts'

type FieldKey =
  | 'name'
  | 'email'
  | 'message'
  | 'subject'
  | 'consent'
  | 'phone'
  | 'visitPlan'

type FieldErrors = Partial<Record<FieldKey, string>>

const MESSAGE_MIN = 10
const SUBJECT_MAX = 160

const CONTACT_INBOX = 'tilakbhati91@gmail.com'
const FORMSUBMIT_AJAX = `https://formsubmit.co/ajax/${CONTACT_INBOX}`
const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

async function postWeb3Json(
  url: string,
  body: Record<string, string>,
): Promise<void> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  let data: { success?: boolean; message?: string }
  try {
    data = JSON.parse(text) as { success?: boolean; message?: string }
  } catch {
    const staticHint =
      res.status === 404 && url.startsWith('/')
        ? ' This host has no /api/contact (use VITE_WEB3FORMS_ACCESS_KEY and remove VITE_CONTACT_SUBMIT_URL for static hosting).'
        : ''
    throw new Error(
      `Could not send message (HTTP ${res.status}).${staticHint}`,
    )
  }
  if (!res.ok || !data.success) {
    throw new Error(
      data?.message ?? 'Could not send message. Try again shortly.',
    )
  }
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function isValidPhoneOptional(value: string): boolean {
  const t = value.trim()
  if (!t) return true
  const digits = t.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

function formSubmitResponseOk(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false
  const s = (data as { success?: unknown }).success
  return s === true || s === 'true'
}

function extrasBlock(phone: string, visitPlan: string): string {
  const lines: string[] = []
  const p = phone.trim()
  const v = visitPlan.trim()
  if (p) lines.push(`Phone: ${p}`)
  if (v) lines.push(`Visit plan: ${v}`)
  return lines.length ? `\n\n${lines.join('\n')}` : ''
}

export function ContactForm() {
  const { locale } = useSitePreferences()
  const fc = formCopy[locale]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [visitPlan, setVisitPlan] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const [serverMessage, setServerMessage] = useState<string | null>(null)

  const honeypotRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const web3AccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
  const submitProxyUrl = import.meta.env.VITE_CONTACT_SUBMIT_URL?.trim()
  const customFormEndpoint = import.meta.env.VITE_CONTACT_FORM_ACTION?.trim()
  const hasReliableEmailProvider = Boolean(
    web3AccessKey || submitProxyUrl || customFormEndpoint,
  )

  useEffect(() => {
    if (status !== 'success' || !successRef.current) return
    const el = successRef.current
    el.focus()
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [status])

  function validate(): boolean {
    const next: FieldErrors = {}
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedSubject = subject.trim()
    const trimmedMessage = message.trim()

    if (trimmedName.length < 2) {
      next.name = fc.errors.name
    }
    if (!trimmedEmail) {
      next.email = fc.errors.emailRequired
    } else if (!isValidEmail(trimmedEmail)) {
      next.email = fc.errors.emailInvalid
    }
    if (!isValidPhoneOptional(phone)) {
      next.phone = fc.errors.phoneInvalid
    }
    if (trimmedSubject.length > SUBJECT_MAX) {
      next.subject = fc.errors.subjectLen(SUBJECT_MAX)
    }
    if (trimmedMessage.length < MESSAGE_MIN) {
      next.message = fc.errors.messageLen(MESSAGE_MIN)
    }
    if (!consent) {
      next.consent = fc.errors.consent
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function resetFields() {
    setName('')
    setEmail('')
    setPhone('')
    setSubject('')
    setVisitPlan('')
    setMessage('')
    setConsent(false)
    if (honeypotRef.current) honeypotRef.current.value = ''
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setServerMessage(null)
    if (!validate()) return

    if (honeypotRef.current?.value.trim()) {
      setStatus('success')
      setServerMessage(null)
      resetFields()
      return
    }

    setStatus('submitting')

    const sub = subject.trim()
    const trimmedMessage = message.trim()
    const extra = extrasBlock(phone, visitPlan)
    const consentLine = `Consent (privacy): ${consent ? 'yes' : 'no'}`
    const fullMessage = `${trimmedMessage}${extra}\n\n${consentLine}`

    try {
      // Prefer browser → Web3Forms when the key is in the bundle (works on Netlify, GoDaddy,
      // custom domains). Netlify proxy is only for builds that omit the key from the client.
      if (web3AccessKey) {
        await postWeb3Json(WEB3FORMS_URL, {
          access_key: web3AccessKey,
          subject: sub || 'RS Library — contact form',
          from_name: 'RS Library website',
          name: name.trim(),
          email: email.trim(),
          replyto: email.trim(),
          message: fullMessage,
          botcheck: honeypotRef.current?.value ?? '',
        })
        setStatus('success')
        setServerMessage(fc.success.thanks)
        resetFields()
        return
      }

      if (submitProxyUrl) {
        await postWeb3Json(submitProxyUrl, {
          subject: sub || 'RS Library — contact form',
          from_name: 'RS Library website',
          name: name.trim(),
          email: email.trim(),
          replyto: email.trim(),
          message: fullMessage,
          botcheck: honeypotRef.current?.value ?? '',
        })
        setStatus('success')
        setServerMessage(fc.success.thanks)
        resetFields()
        return
      }

      if (customFormEndpoint) {
        const body = new FormData()
        body.append('name', name.trim())
        body.append('email', email.trim())
        body.append('_replyto', email.trim())
        if (phone.trim()) body.append('phone', phone.trim())
        if (visitPlan.trim()) body.append('visit_plan', visitPlan.trim())
        if (sub) body.append('subject', sub)
        body.append('message', fullMessage)

        const res = await fetch(customFormEndpoint, {
          method: 'POST',
          body,
          headers: { Accept: 'application/json' },
        })

        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as {
            error?: string
          } | null
          throw new Error(data?.error ?? 'Something went wrong. Try again.')
        }

        setStatus('success')
        setServerMessage(fc.success.thanks)
        resetFields()
        return
      }

      const fd = new FormData()
      fd.append('name', name.trim())
      fd.append('email', email.trim())
      fd.append('_replyto', email.trim())
      fd.append('_subject', sub || 'RS Library — contact form')
      fd.append('message', fullMessage)
      fd.append('_template', 'table')
      fd.append('_captcha', 'false')
      fd.append('_gotcha', honeypotRef.current?.value ?? '')

      const res = await fetch(FORMSUBMIT_AJAX, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        referrerPolicy: 'unsafe-url',
        body: fd,
      })

      const data = (await res.json().catch(() => null)) as {
        success?: boolean | string
        message?: string
      } | null

      if (!res.ok || !formSubmitResponseOk(data)) {
        throw new Error(
          data?.message ??
            'Could not send message. Open the site via your dev server (npm run dev) or a hosted URL, then try again.',
        )
      }

      setStatus('success')
      setServerMessage(fc.formSubmitNote)
      resetFields()
    } catch (err) {
      setStatus('error')
      setServerMessage(
        err instanceof Error ? err.message : 'Something went wrong.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        className="form-feedback form-feedback--success"
        role="status"
        tabIndex={-1}
        aria-live="polite"
      >
        <p className="form-feedback__title">{fc.success.title}</p>
        {serverMessage ? (
          <p className="form-feedback__detail">{serverMessage}</p>
        ) : (
          <p className="form-feedback__detail">{fc.success.thanksShort}</p>
        )}
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            setStatus('idle')
            setServerMessage(null)
          }}
        >
          {fc.actions.sendAnother}
        </button>
      </div>
    )
  }

  const msgLen = message.trim().length
  const msgOk = msgLen >= MESSAGE_MIN

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <input
        ref={honeypotRef}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hp-field"
      />

      {import.meta.env.PROD && !hasReliableEmailProvider ? (
        <p className="form-banner form-banner--warning" role="alert">
          {fc.warnings.missingEmailProvider}
        </p>
      ) : null}

      <div className="field">
        <label htmlFor="contact-name">{fc.labels.name}</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(ev) => {
            setName(ev.target.value)
            if (errors.name) setErrors((p) => ({ ...p, name: undefined }))
          }}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name && (
          <span id="contact-name-error" className="field-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="contact-email">{fc.labels.email}</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => {
            setEmail(ev.target.value)
            if (errors.email) setErrors((p) => ({ ...p, email: undefined }))
          }}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email && (
          <span id="contact-email-error" className="field-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="contact-phone">
          {fc.labels.phone}{' '}
          <span className="label-optional">{fc.labels.optional}</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(ev) => {
            setPhone(ev.target.value)
            if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }))
          }}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={
            errors.phone ? 'contact-phone-error' : 'contact-phone-hint'
          }
        />
        <span id="contact-phone-hint" className="field-hint">
          {fc.labels.phoneHint}
        </span>
        {errors.phone && (
          <span id="contact-phone-error" className="field-error" role="alert">
            {errors.phone}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="contact-subject">
          {fc.labels.subject}{' '}
          <span className="label-optional">{fc.labels.optional}</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          autoComplete="off"
          maxLength={SUBJECT_MAX}
          value={subject}
          onChange={(ev) => {
            setSubject(ev.target.value)
            if (errors.subject) setErrors((p) => ({ ...p, subject: undefined }))
          }}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={
            errors.subject
              ? 'contact-subject-hint contact-subject-error'
              : 'contact-subject-hint'
          }
        />
        <span id="contact-subject-hint" className="field-hint">
          {fc.hints.subject(SUBJECT_MAX)}
        </span>
        {errors.subject && (
          <span id="contact-subject-error" className="field-error" role="alert">
            {errors.subject}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="contact-visit-plan">
          {fc.labels.visitPlan}{' '}
          <span className="label-optional">{fc.labels.optional}</span>
        </label>
        <textarea
          id="contact-visit-plan"
          name="visit_plan"
          rows={2}
          value={visitPlan}
          onChange={(ev) => setVisitPlan(ev.target.value)}
          aria-describedby="contact-visit-plan-hint"
        />
        <span id="contact-visit-plan-hint" className="field-hint">
          {fc.labels.visitPlanHint}
        </span>
      </div>

      <div className="field">
        <label htmlFor="contact-message">{fc.labels.message}</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(ev) => {
            setMessage(ev.target.value)
            if (errors.message) setErrors((p) => ({ ...p, message: undefined }))
          }}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message
              ? 'contact-message-hint contact-message-error'
              : 'contact-message-hint'
          }
        />
        <span id="contact-message-hint" className="field-hint">
          {fc.hints.message(MESSAGE_MIN, msgLen, msgOk)}
        </span>
        {errors.message && (
          <span id="contact-message-error" className="field-error" role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <div className="field field--checkbox">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(ev) => {
              setConsent(ev.target.checked)
              if (errors.consent) setErrors((p) => ({ ...p, consent: undefined }))
            }}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={
              errors.consent ? 'contact-consent-error' : undefined
            }
          />
          <span>
            {fc.labels.consentBefore}{' '}
            <a href="#privacy">{fc.labels.consentPrivacy}</a>{' '}
            {fc.labels.consentAfter}
          </span>
        </label>
        {errors.consent && (
          <span id="contact-consent-error" className="field-error" role="alert">
            {errors.consent}
          </span>
        )}
      </div>

      {status === 'error' && serverMessage && (
        <p className="form-banner form-banner--error" role="alert">
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        className="btn btn--primary"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? fc.actions.sending : fc.actions.send}
      </button>
    </form>
  )
}
