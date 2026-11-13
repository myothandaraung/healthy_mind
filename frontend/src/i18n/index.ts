import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

import en from './en'
import ja from './ja'
import my from './my'

const resources = {
  en: { translation: en },
  ja: { translation: ja },
  my: { translation: my },
} as const

const savedLocale = typeof window !== 'undefined' ? window.localStorage.getItem('mindcare.locale') : null

i18n.use(initReactI18next).init({
  resources,
  lng: savedLocale && ['en', 'ja', 'my'].includes(savedLocale) ? savedLocale : 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'ja', 'my'],
  ns: ['translation'],
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (language) => {
  if (typeof window !== 'undefined') window.localStorage.setItem('mindcare.locale', language)
})

export default i18n

export { useTranslation }

export type Locale = 'en' | 'ja' | 'my'

export const LOCALES: Locale[] = ['en', 'ja', 'my']

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
  my: 'မြန်မာဘာသာ',
}

export const LOCALE_NATIVE_LABELS: Record<Locale, string> = {
  en: 'English',
  ja: '\u65e5\u672c\u8a9e',
  my: '\u1019\u103c\u1014\u103a\u1019\u102c\u1018\u102c\u101e\u102c',
}
