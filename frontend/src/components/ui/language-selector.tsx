import { ChevronDown, Languages } from 'lucide-react'
import i18n, { LOCALES, LOCALE_NATIVE_LABELS, type Locale, useTranslation } from '@/i18n'
import { cn } from '@/lib/utils'

type LanguageSelectorProps = {
  compact?: boolean
  helper?: string
  className?: string
}

export function LanguageSelector({ compact = false, helper, className }: LanguageSelectorProps) {
  const { t } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage?.split('-')[0] ?? 'en'

  return (
    <div className={cn(compact ? 'rounded-button border border-[#dce6e2] bg-white p-2.5' : 'rounded-card border border-[#e1e8e4] bg-white/90 p-4', className)}>
      <div className={cn('flex gap-2.5', compact ? 'flex-col' : 'flex-col sm:flex-row sm:items-center sm:justify-between')}>
        <div className="flex min-w-0 items-start gap-2.5">
          <span className={cn('grid shrink-0 place-items-center bg-[#e7f0ec] text-brand-slate', compact ? 'h-8 w-8 rounded-lg' : 'h-9 w-9 rounded-xl')}>
            <Languages className={compact ? 'h-4 w-4' : 'h-5 w-5'} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <label htmlFor={compact ? 'sidebar-language' : 'menu-language'} className={cn('block font-semibold text-brand-slate-dark', compact ? 'text-xs' : 'text-sm')}>{t('common.language')}</label>
            {helper && <p className="mt-0.5 text-xs leading-5 text-gray-600">{helper}</p>}
          </div>
        </div>
        <div className={cn('relative', compact ? 'w-full' : 'w-full sm:w-52')}>
          <select id={compact ? 'sidebar-language' : 'menu-language'} value={currentLanguage} onChange={(event) => i18n.changeLanguage(event.target.value)} className={cn('min-h-10 w-full appearance-none rounded-xl border border-[#cfdcd7] bg-[#f8faf8] py-2 pl-3 pr-9 text-sm font-medium text-brand-slate-dark shadow-[0_1px_2px_rgba(24,51,47,.04)] transition hover:border-brand-sage focus:border-brand-slate focus:bg-white focus:outline-none focus:ring-3 focus:ring-brand-sage/20', compact && 'min-h-9 rounded-lg py-1.5 text-xs')}>
            {LOCALES.map((locale) => <option key={locale} value={locale}>{LOCALE_NATIVE_LABELS[locale as Locale]}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
