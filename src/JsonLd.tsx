import { useEffect } from 'react'
import { siteConfig } from './siteConfig'

const SCRIPT_ID = 'rs-library-schema'

export function JsonLd() {
  useEffect(() => {
    const addr = siteConfig.addressLines.join(', ').trim()
    const origin =
      typeof window !== 'undefined' ? window.location.origin : ''
    if (!addr && !siteConfig.phoneRaw) return

    const payload: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Library',
      name: 'RS Library',
      description:
        'Student reading room: bring your own books and notes; tables, chairs, AC, drinking water, and washrooms on site.',
    }
    if (origin) payload.url = origin
    if (siteConfig.phoneRaw) payload.telephone = siteConfig.phoneRaw
    if (addr) {
      payload.address = {
        '@type': 'PostalAddress',
        streetAddress: addr,
      }
    }

    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = SCRIPT_ID
    el.textContent = JSON.stringify(payload)
    document.head.appendChild(el)
    return () => {
      document.getElementById(SCRIPT_ID)?.remove()
    }
  }, [])

  return null
}
