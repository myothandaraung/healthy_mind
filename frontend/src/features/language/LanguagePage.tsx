import { useTranslation } from '@/i18n'
import { LanguageSelector } from '@/components/ui/language-selector'

export default function LanguagePage() {
  const { t } = useTranslation()
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <header>
        <p className="text-sm font-medium text-brand-slate">MindCare</p>
        <h1 className="mt-1 text-3xl font-semibold">{t('common.language')}</h1>
        <p className="mt-2 text-sm leading-6 text-gray-600">{t('more.languageHelp')}</p>
      </header>
      <LanguageSelector />
    </div>
  )
}
