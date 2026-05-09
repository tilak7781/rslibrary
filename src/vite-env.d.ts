/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
  readonly VITE_CONTACT_FORM_ACTION?: string
  /** Multi-line OK in .env — use real newlines between lines */
  readonly VITE_ADDRESS_LINES?: string
  readonly VITE_HOURS_LINES?: string
  readonly VITE_FEE_NOTE?: string
  readonly VITE_PHONE?: string
  readonly VITE_PHONE_DISPLAY?: string
  readonly VITE_WHATSAPP?: string
  readonly VITE_MAP_QUERY?: string
  readonly VITE_MAP_EMBED_URL?: string
}
