/** Site copy configurable via .env — swap values for your real address & links */

function splitLines(value: string | undefined, fallback: string): string[] {
  const fb = fallback
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const v = value?.trim();
  if (!v) return fb;
  if (v.includes("|"))
    return v
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
  return v
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Digits only for https://wa.me/… (country code + number, no + or spaces) */
export function normalizeWhatsAppDigits(
  raw: string | undefined,
): string | null {
  if (!raw?.trim()) return null;
  const d = raw.replace(/\D/g, "");
  return d.length >= 10 ? d : null;
}

export function phoneTelHref(phone: string | undefined): string | null {
  if (!phone?.trim()) return null;
  const cleaned = phone.replace(/[^\d+]/g, "");
  return cleaned ? `tel:${cleaned}` : null;
}

export type SocialLink = { label: string; href: string };

/** `Label~https://…` pairs, several separated by `|` (tilde separates label from URL). */
export function parseSocialLinks(raw: string | undefined): SocialLink[] {
  if (!raw?.trim()) return [];
  const out: SocialLink[] = [];
  for (const part of raw.split("|")) {
    const p = part.trim();
    if (!p) continue;
    const sep = p.indexOf("~");
    if (sep < 1) continue;
    const label = p.slice(0, sep).trim();
    const href = p.slice(sep + 1).trim();
    if (!label || !href) continue;
    try {
      const u = new URL(href);
      if (u.protocol === "http:" || u.protocol === "https:")
        out.push({ label, href: u.href });
    } catch {
      /* skip invalid */
    }
  }
  return out;
}

function announcementLinesFromEnv(): string[] {
  const raw = import.meta.env.VITE_ANNOUNCEMENT?.trim();
  if (!raw) return [];
  return splitLines(raw, raw);
}

const envPhone = import.meta.env.VITE_PHONE?.trim() || "";
const envWhatsapp = import.meta.env.VITE_WHATSAPP?.trim() || "";
const envPhoneDisplay = import.meta.env.VITE_PHONE_DISPLAY?.trim() || "";

export const siteConfig = {
  announcementLines: announcementLinesFromEnv(),
  socialLinks: parseSocialLinks(import.meta.env.VITE_SOCIAL_LINKS),
  addressLines: splitLines(
    import.meta.env.VITE_ADDRESS_LINES,
    "Radha nagar infront of dav field\nBulandshahr, Uttar Pradesh — 203001",
  ),
  hoursLines: splitLines(
    import.meta.env.VITE_HOURS_LINES,
    "Mon–Sat: 7:00 AM – 9:00 PM\nSun: Closed",
  ),
  feeNote:
    import.meta.env.VITE_FEE_NOTE?.trim() ||
    "Ask at the desk for current daily / monthly seating rates.",
  /** Call card + tel: — uses PHONE, or WHATSAPP if PHONE is unset */
  phoneDisplay: envPhoneDisplay || envPhone || envWhatsapp || "",
  phoneRaw: envPhone || envWhatsapp || "",
  whatsappRaw: envWhatsapp || "",
  mapEmbedUrl: import.meta.env.VITE_MAP_EMBED_URL?.trim() || "",
  mapQuery:
    import.meta.env.VITE_MAP_QUERY?.trim() ||
    import.meta.env.VITE_ADDRESS_LINES?.replace(/\|/g, ", ")
      .replace(/\n/g, ", ")
      .trim() ||
    "India",
};

export function getGoogleMapsSearchUrl(): string {
  const q = encodeURIComponent(siteConfig.mapQuery)
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}

/** Only non-null when `VITE_MAP_EMBED_URL` is set — Google’s generic `?q=&output=embed` URLs often break inside iframes. */
export function getMapEmbedSrc(): string | null {
  const u = siteConfig.mapEmbedUrl?.trim()
  return u || null
}
