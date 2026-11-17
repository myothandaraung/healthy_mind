import { useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { subscribeToApiLoading } from '@/lib/api'
import { useTranslation } from '@/i18n'

export default function ApiLoadingIndicator() {
  const { t } = useTranslation()
  const [isPending, setIsPending] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => subscribeToApiLoading(setIsPending), [])

  useEffect(() => {
    if (!isPending) {
      setIsVisible(false)
      return
    }

    const timer = window.setTimeout(() => setIsVisible(true), 350)
    return () => window.clearTimeout(timer)
  }, [isPending])

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-white/55 px-4 backdrop-blur-[2px]"
      role="status"
      aria-live="polite"
      aria-label={t('common.loading')}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-brand-sage/35 bg-white px-5 py-4 text-sm font-medium text-brand-slate-dark shadow-xl">
        <LoaderCircle className="h-5 w-5 animate-spin text-brand-slate" aria-hidden="true" />
        <span>{t('common.loading')}</span>
      </div>
    </div>
  )
}
