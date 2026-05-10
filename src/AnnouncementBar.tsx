import { useMemo, useState } from 'react'
import { siteConfig } from './siteConfig'

const STORAGE_KEY = 'rs-library-announce-dismiss'

type Props = { dismissLabel: string }

export function AnnouncementBar({ dismissLabel }: Props) {
  const lines = siteConfig.announcementLines
  const fingerprint = useMemo(() => lines.join('\n'), [lines])

  const [open, setOpen] = useState(() => {
    if (!fingerprint) return false
    try {
      return sessionStorage.getItem(STORAGE_KEY) !== fingerprint
    } catch {
      return true
    }
  })

  if (!lines.length || !open) return null

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, fingerprint)
    } catch {
      /* ignore */
    }
    setOpen(false)
  }

  return (
    <div
      className="site-announce"
      role="region"
      aria-label="Announcement"
    >
      <div className="site-announce__text">
        {lines.map((line, i) => (
          <span key={`${i}-${line}`}>
            {i > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </div>
      <button
        type="button"
        className="site-announce__dismiss btn btn--ghost btn--compact"
        onClick={dismiss}
      >
        {dismissLabel}
      </button>
    </div>
  )
}
