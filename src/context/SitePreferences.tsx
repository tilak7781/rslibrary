import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Locale = 'en' | 'hi'
export type ThemeChoice = 'light' | 'dark'

const LANG_KEY = 'rs-library-lang'
const THEME_KEY = 'rs-library-theme'

function readStoredLang(): Locale {
  try {
    const v = localStorage.getItem(LANG_KEY)
    if (v === 'hi' || v === 'en') return v
  } catch {
    /* ignore */
  }
  return 'en'
}

function readStoredTheme(): ThemeChoice {
  try {
    const v = localStorage.getItem(THEME_KEY)
    if (v === 'light' || v === 'dark') return v
  } catch {
    /* ignore */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

type SitePreferencesValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  theme: ThemeChoice
  toggleTheme: () => void
}

const SitePreferencesContext = createContext<SitePreferencesValue | null>(null)

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window === 'undefined' ? 'en' : readStoredLang(),
  )
  const [theme, setThemeState] = useState<ThemeChoice>(() =>
    typeof window === 'undefined' ? 'light' : readStoredTheme(),
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.lang = locale === 'hi' ? 'hi' : 'en'
    try {
      localStorage.setItem(THEME_KEY, theme)
      localStorage.setItem(LANG_KEY, locale)
    } catch {
      /* ignore */
    }
  }, [theme, locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({ locale, setLocale, theme, toggleTheme }),
    [locale, setLocale, theme, toggleTheme],
  )

  return (
    <SitePreferencesContext.Provider value={value}>
      {children}
    </SitePreferencesContext.Provider>
  )
}

export function useSitePreferences(): SitePreferencesValue {
  const ctx = useContext(SitePreferencesContext)
  if (!ctx) {
    throw new Error(
      'useSitePreferences must be used within SitePreferencesProvider',
    )
  }
  return ctx
}
