import { createContext, useContext, useState } from 'react'

interface LanguageCtx {
  locale: string
  setLocale: (lng: string) => void
}

const LanguageContext = createContext<LanguageCtx | null>(null)

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export interface LanguageProviderProps {
  children: React.ReactNode
  defaultLocale?: string
}

export function LanguageProvider({ children, defaultLocale = 'en' }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState(defaultLocale)
  const setLocale = (lng: string) => {
    setLocaleState(lng)
    ;(window as any).i18n?.changeLanguage?.(lng)
  }
  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}
