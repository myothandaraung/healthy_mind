import { useMemo, useState } from 'react'
import { BookOpen, ExternalLink, Headphones, Library, PlayCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useTranslation } from '@/i18n'
import { recommendationsForLocale, type RecommendationCategory } from './recommendation-catalog'

type Filter = 'all' | RecommendationCategory

const FILTERS: Filter[] = ['all', 'book', 'podcast', 'video']
const CATEGORY_ICONS = { book: BookOpen, podcast: Headphones, video: PlayCircle } as const

export default function RecommendationsPage() {
  const { t, i18n } = useTranslation()
  const [filter, setFilter] = useState<Filter>('all')
  const locale = i18n.resolvedLanguage?.split('-')[0] ?? 'en'
  const recommendations = useMemo(() => recommendationsForLocale(locale), [locale])
  const visibleRecommendations = filter === 'all'
    ? recommendations
    : recommendations.filter((recommendation) => recommendation.category === filter)

  return (
    <div className="mx-auto max-w-5xl space-y-7 px-4 py-6 sm:px-6 sm:py-8">
      <header className="max-w-2xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-sage/35 bg-white/70 px-3 py-1.5 text-xs font-medium text-brand-slate">
          <Library className="h-4 w-4" aria-hidden="true" />{t('recommendations.eyebrow')}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('recommendations.title')}</h1>
        <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">{t('recommendations.subtitle')}</p>
      </header>

      <div role="group" aria-label={t('recommendations.filterLabel')} className="flex gap-2 overflow-x-auto rounded-card border border-[#e1e8e4] bg-white/80 p-2">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
            className={`min-h-10 shrink-0 rounded-button px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-slate ${filter === item ? 'bg-brand-slate text-white' : 'text-brand-slate hover:bg-[#edf3f0]'}`}
          >
            {t(`recommendations.categories.${item}`)}
          </button>
        ))}
      </div>

      {visibleRecommendations.length === 0 ? (
        <Card className="py-10 text-center text-sm text-gray-500">{t('recommendations.empty')}</Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visibleRecommendations.map((recommendation) => {
            const Icon = CATEGORY_ICONS[recommendation.category]
            return (
              <Card key={recommendation.id} className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e8efe6] text-brand-slate"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <Badge>{t(`recommendations.categories.${recommendation.category}`)}</Badge>
                </div>
                <h2 className="mt-4 text-lg font-semibold leading-6 text-brand-slate-dark">{recommendation.title}</h2>
                <p className="mt-1 text-sm font-medium text-brand-slate">{recommendation.creator}</p>
                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">{recommendation.description}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#e1e8e4] pt-4">
                  <span className="text-xs text-gray-500">{t('recommendations.language')}: {t(`recommendations.languages.${recommendation.locale}`)}</span>
                  <a href={recommendation.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 rounded-button px-3 py-2 text-sm font-semibold text-brand-slate hover:bg-[#edf3f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-slate">
                    {t('recommendations.viewResource')}<ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <Card className="border-[#e4ded0] bg-[#faf7ef]">
        <h2 className="font-semibold">{t('recommendations.beforeYouOpen')}</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">{t('recommendations.privacyNotice')}</p>
        <p className="mt-2 text-sm leading-6 text-gray-600">{t('recommendations.disclaimer')}</p>
      </Card>
    </div>
  )
}
