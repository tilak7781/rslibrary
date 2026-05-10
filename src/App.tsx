import { useCallback, useEffect, useState } from 'react'
import { AnnouncementBar } from './AnnouncementBar'
import { BackToTop } from './BackToTop'
import { ContactForm } from './ContactForm'
import { copyToClipboard } from './copyToClipboard'
import { useSitePreferences } from './context/SitePreferences.tsx'
import { JsonLd } from './JsonLd'
import {
  getGoogleMapsSearchUrl,
  getMapEmbedSrc,
  normalizeWhatsAppDigits,
  phoneTelHref,
  siteConfig,
} from './siteConfig'
import { uiCopy } from './strings'
import './App.css'

function App() {
  const { locale, setLocale, theme, toggleTheme } = useSitePreferences()
  const t = uiCopy[locale]
  const [toast, setToast] = useState<string | null>(null)

  const telHref = phoneTelHref(siteConfig.phoneRaw)
  const waDigits = normalizeWhatsAppDigits(
    siteConfig.whatsappRaw || siteConfig.phoneRaw,
  )
  const phoneLabel =
    siteConfig.phoneDisplay || siteConfig.phoneRaw || '—'

  const mapEmbedSrc = getMapEmbedSrc()
  const mapsSearchUrl = getGoogleMapsSearchUrl()

  const addressClipboard = siteConfig.addressLines.join('\n')
  const hoursClipboard = siteConfig.hoursLines.join('\n')

  const pushToast = useCallback((msg: string) => {
    setToast(msg)
  }, [])

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 2400)
    return () => window.clearTimeout(id)
  }, [toast])

  const copyAddress = async () => {
    const ok = await copyToClipboard(addressClipboard)
    pushToast(ok ? t.visit.addressCopied : t.quickActions.copyFailed)
  }

  const copyHours = async () => {
    const ok = await copyToClipboard(hoursClipboard)
    pushToast(ok ? t.visit.hoursCopied : t.quickActions.copyFailed)
  }

  const sharePage = async () => {
    const url = window.location.href
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: document.title,
          text: 'RS Library',
          url,
        })
        pushToast(t.quickActions.shared)
        return
      } catch (err: unknown) {
        const name =
          err && typeof err === 'object' && 'name' in err
            ? String((err as { name: unknown }).name)
            : ''
        if (name === 'AbortError') return
      }
    }
    const ok = await copyToClipboard(url)
    pushToast(ok ? t.quickActions.linkCopied : t.quickActions.copyFailed)
  }

  return (
    <div className="site">
      <JsonLd />
      <a className="skip-link" href="#main-content">
        {t.skipLink}
      </a>

      <AnnouncementBar dismissLabel={t.layout.announceDismiss} />

      <header className="site-header">
        <div className="site-header__row">
          <div className="site-header__brand">
            <a className="logo" href="#top">
              RS Library
            </a>
            <p className="logo-tagline">{t.brandTagline}</p>
          </div>
          <div
            className="site-header__tools"
            role="toolbar"
            aria-label={locale === 'hi' ? 'भाषा और थीम' : 'Language and theme'}
          >
            <div className="lang-toggle" role="group" aria-label="Language">
              <button
                type="button"
                className={`lang-toggle__btn${locale === 'en' ? ' is-active' : ''}`}
                onClick={() => setLocale('en')}
                aria-pressed={locale === 'en'}
              >
                {t.toolbar.langEn}
              </button>
              <button
                type="button"
                className={`lang-toggle__btn${locale === 'hi' ? ' is-active' : ''}`}
                onClick={() => setLocale('hi')}
                aria-pressed={locale === 'hi'}
              >
                {t.toolbar.langHi}
              </button>
            </div>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark' ? t.toolbar.themeLight : t.toolbar.themeDark
              }
            >
              <span aria-hidden="true">{theme === 'dark' ? '☀' : '☽'}</span>
            </button>
          </div>
        </div>
        <nav className="nav" aria-label="Primary">
          <ul className="nav__list">
            <li>
              <a href="#about">{t.nav.about}</a>
            </li>
            <li>
              <a href="#facilities">{t.nav.amenities}</a>
            </li>
            <li>
              <a href="#visit">{t.nav.visit}</a>
            </li>
            <li>
              <a href="#rules">{t.nav.rules}</a>
            </li>
            <li>
              <a href="#faq">{t.nav.faq}</a>
            </li>
            <li>
              <a href="#gallery">{t.nav.gallery}</a>
            </li>
            <li>
              <a href="#contact">{t.nav.contact}</a>
            </li>
            <li>
              <a href="#privacy">{t.nav.privacy}</a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__grid">
            <div className="hero__main">
              <p className="hero__eyebrow">{t.hero.eyebrow}</p>
              <h1 id="hero-title" className="hero__title">
                {t.hero.title}
              </h1>
              <p className="hero__lede">{t.hero.lede}</p>
              <ul className="hero__highlights" aria-label="What to expect">
                {t.hero.bullets.map((line) => (
                  <li key={line}>
                    <span className="hero__bullet" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="hero__actions">
                <a className="btn btn--primary" href="#contact">
                  {t.hero.ctaMessage}
                </a>
                <a className="btn btn--outline" href="#facilities">
                  {t.hero.ctaAmenities}
                </a>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => void sharePage()}
                >
                  {t.quickActions.sharePage}
                </button>
              </div>
            </div>
            <aside className="hero__aside" aria-label={t.hero.asideLabel}>
              <div className="fact-card">
                <span className="fact-card__label">{t.hero.factsLabels.model}</span>
                <p className="fact-card__value">{t.hero.facts.model}</p>
              </div>
              <div className="fact-card">
                <span className="fact-card__label">{t.hero.factsLabels.space}</span>
                <p className="fact-card__value">{t.hero.facts.space}</p>
              </div>
              <div className="fact-card">
                <span className="fact-card__label">{t.hero.factsLabels.basics}</span>
                <p className="fact-card__value">{t.hero.facts.basics}</p>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="about"
          className="panel panel--muted"
          aria-labelledby="about-title"
        >
          <div className="panel__inner">
            <h2 id="about-title" className="section-title">
              {t.about.title}
            </h2>
            <p className="lead">{t.about.lead}</p>
            <p>{t.about.body}</p>
          </div>
        </section>

        <section id="facilities" className="panel" aria-labelledby="facilities-title">
          <div className="panel__inner panel__inner--wide">
            <h2 id="facilities-title" className="section-title">
              {t.facilities.title}
            </h2>
            <p className="section-intro">{t.facilities.intro}</p>
            <div className="facility-grid">
              {t.facilities.cards.map((title, i) => (
                <article key={title} className="facility-card">
                  <h3 className="facility-card__title">{title}</h3>
                  <p className="facility-card__text">
                    {t.facilities.cardBodies[i]}
                  </p>
                </article>
              ))}
            </div>
            <p className="panel-note">
              <strong>{t.facilities.noteLead}</strong> {t.facilities.noteRest}
            </p>
          </div>
        </section>

        <section id="visit" className="panel panel--muted" aria-labelledby="visit-title">
          <div className="panel__inner panel__inner--wide">
            <h2 id="visit-title" className="section-title">
              {t.visit.title}
            </h2>
            <p className="section-intro">{t.visit.intro}</p>
            <div className="visit-grid">
              <div className="visit-card">
                <h3 className="visit-card__label">{t.visit.address}</h3>
                <address className="visit-card__body">
                  {siteConfig.addressLines.map((line) => (
                    <span key={line} className="visit-card__line">
                      {line}
                    </span>
                  ))}
                </address>
                {siteConfig.addressLines.length > 0 ? (
                  <div className="visit-card__toolbar">
                    <button
                      type="button"
                      className="btn btn--ghost btn--compact"
                      onClick={() => void copyAddress()}
                    >
                      {t.visit.copyAddress}
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="visit-card">
                <h3 className="visit-card__label">{t.visit.hours}</h3>
                <div className="visit-card__body">
                  {siteConfig.hoursLines.map((line) => (
                    <p key={line} className="visit-card__line">
                      {line}
                    </p>
                  ))}
                </div>
                {siteConfig.hoursLines.length > 0 ? (
                  <div className="visit-card__toolbar">
                    <button
                      type="button"
                      className="btn btn--ghost btn--compact"
                      onClick={() => void copyHours()}
                    >
                      {t.visit.copyHours}
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="visit-card visit-card--wide">
                <h3 className="visit-card__label">{t.visit.fees}</h3>
                <p className="visit-card__body">{siteConfig.feeNote}</p>
              </div>
              <div className="visit-card">
                <h3 className="visit-card__label">{t.visit.call}</h3>
                <p className="visit-card__body">
                  {telHref ? (
                    <a href={telHref} className="visit-link">
                      {phoneLabel}
                    </a>
                  ) : (
                    phoneLabel
                  )}
                </p>
              </div>
              <div className="visit-card">
                <h3 className="visit-card__label">{t.visit.whatsapp}</h3>
                <p className="visit-card__body">
                  {waDigits ? (
                    <a
                      href={`https://wa.me/${waDigits}`}
                      className="visit-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  ) : (
                    '—'
                  )}
                </p>
              </div>
            </div>
            <div className="map-frame">
              <h3 className="map-frame__title">{t.visit.mapTitle}</h3>
              <p className="map-frame__hint">{t.visit.directionsPlaceholder}</p>
              {mapEmbedSrc ? (
                <div className="map-frame__embed">
                  <iframe
                    title={t.visit.mapTitle}
                    src={mapEmbedSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <div className="map-frame__fallback">
                  <a
                    className="btn btn--primary"
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.visit.openInMaps}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="rules" className="panel" aria-labelledby="rules-title">
          <div className="panel__inner">
            <h2 id="rules-title" className="section-title">
              {t.rules.title}
            </h2>
            <p className="lead">{t.rules.intro}</p>
            <ul className="rules-list">
              {t.rules.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="faq"
          className="panel panel--muted"
          aria-labelledby="faq-title"
        >
          <div className="panel__inner">
            <h2 id="faq-title" className="section-title">
              {t.faq.title}
            </h2>
            <p className="lead">{t.faq.intro}</p>
            <div className="faq-list">
              {t.faq.items.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary className="faq-item__q">{item.q}</summary>
                  <p className="faq-item__a">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="panel" aria-labelledby="gallery-title">
          <div className="panel__inner panel__inner--wide">
            <h2 id="gallery-title" className="section-title">
              {t.gallery.title}
            </h2>
            <p className="section-intro">{t.gallery.intro}</p>
            <div className="gallery-grid">
              {t.gallery.captions.map((cap, i) => (
                <figure key={cap} className="gallery-cell">
                  <div
                    className="gallery-cell__placeholder"
                    aria-hidden="true"
                  />
                  <figcaption className="gallery-cell__cap">
                    {cap} · #{i + 1}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="panel panel--contact panel--muted"
          aria-labelledby="contact-title"
        >
          <div className="panel__inner panel__inner--contact">
            <div className="contact-intro">
              <h2 id="contact-title" className="section-title">
                {t.contact.title}
              </h2>
              <p className="lead">{t.contact.lead}</p>
              <p className="contact-intro__fine">{t.contact.fine}</p>
            </div>
            <div className="contact-form-shell">
              <ContactForm />
            </div>
          </div>
        </section>

        <section
          id="privacy"
          className="panel privacy panel--muted"
          aria-labelledby="privacy-title"
        >
          <div className="panel__inner">
            <h2 id="privacy-title" className="section-title">
              {t.privacy.title}
            </h2>
            <p className="privacy-short">{t.privacy.body}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__top">
            <p className="site-footer__brand">{t.footer.brand}</p>
            {siteConfig.socialLinks.length > 0 ? (
              <nav
                className="site-footer__social"
                aria-label={t.footer.socialHeading}
              >
                <ul className="site-footer__social-list">
                  {siteConfig.socialLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
          <p className="site-footer__legal">
            {t.footer.copyright} {new Date().getFullYear()} RS Library ·{' '}
            <a href="#privacy">{t.footer.privacy}</a>
          </p>
        </div>
      </footer>

      {toast ? (
        <div className="site-toast" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}

      <BackToTop label={t.layout.backToTop} />

      {waDigits ? (
        <a
          className="wa-fab"
          href={`https://wa.me/${waDigits}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.waFab}
        >
          <span className="wa-fab__icon" aria-hidden="true">
            💬
          </span>
          <span className="wa-fab__text">{t.waFab}</span>
        </a>
      ) : null}
    </div>
  )
}

export default App
