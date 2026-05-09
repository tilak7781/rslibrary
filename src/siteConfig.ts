/** Site copy configurable via .env — swap values for your real address & links */

function splitLines(value: string | undefined, fallback: string): string[] {
  const fb = fallback
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
  const v = value?.trim()
  if (!v) return fb
  if (v.includes('|'))
    return v
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean)
  return v
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Digits only for https://wa.me/… (country code + number, no + or spaces) */
export function normalizeWhatsAppDigits(raw: string | undefined): string | null {
  if (!raw?.trim()) return null
  const d = raw.replace(/\D/g, '')
  return d.length >= 10 ? d : null
}

export function phoneTelHref(phone: string | undefined): string | null {
  if (!phone?.trim()) return null
  const cleaned = phone.replace(/[^\d+]/g, '')
  return cleaned ? `tel:${cleaned}` : null
}

export const siteConfig = {
  addressLines: splitLines(
    import.meta.env.VITE_ADDRESS_LINES,
    '123 Study Lane, Near City College\nYour City, State — PIN',
  ),
  hoursLines: splitLines(
    import.meta.env.VITE_HOURS_LINES,
    'Mon–Sat: 7:00 AM – 9:00 PM\nSun: Closed',
  ),
  feeNote:
    import.meta.env.VITE_FEE_NOTE?.trim() ||
    'Ask at the desk for current daily / monthly seating rates.',
  phoneDisplay:
    import.meta.env.VITE_PHONE_DISPLAY?.trim() ||
    import.meta.env.VITE_PHONE?.trim() ||
    '',
  phoneRaw: import.meta.env.VITE_PHONE?.trim() || '',
  whatsappRaw: import.meta.env.VITE_WHATSAPP?.trim() || '',
  mapEmbedUrl: import.meta.env.VITE_MAP_EMBED_URL?.trim() || '',
  mapQuery:
    import.meta.env.VITE_MAP_QUERY?.trim() ||
    import.meta.env.VITE_ADDRESS_LINES?.replace(/\|/g, ', ')
      .replace(/\n/g, ', ')
      .trim() ||
    'India',
}

export function getMapEmbedSrc(): string {
  if (siteConfig.mapEmbedUrl) return siteConfig.mapEmbedUrl
  const q = encodeURIComponent(siteConfig.mapQuery)
  return `https://www.google.com/maps?q=${q}&z=16&output=embed`
}
