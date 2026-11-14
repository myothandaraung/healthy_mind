import { useQuery } from '@tanstack/react-query'
import { BarChart3, BookOpen, CalendarDays, Flower2 } from 'lucide-react'
import { moodApi } from '@/features/mood/mood-api'
import { journalApi } from '@/features/journal/journal-api'
import { useTranslation } from '@/i18n'
import { Card } from '@/components/ui/card'

export default function ProgressPage() {
  const { t } = useTranslation()
  const { data: moods, isLoading: moodsLoading } = useQuery({ queryKey: moodApi.keys.list(), queryFn: () => moodApi.list() })
  const { data: journals, isLoading: journalsLoading } = useQuery({ queryKey: journalApi.keys.list(), queryFn: journalApi.list })

  if (moodsLoading || journalsLoading) return <div className="py-12 text-center">{t('common.loading')}</div>

  const entries = moods ?? []
  const journalEntries = journals ?? []
  const thirtyDaysAgo = Date.now() - 30 * 86400000
  const recent = entries.filter((entry) => new Date(entry.occurred_at).getTime() >= thirtyDaysAgo)
  const average = recent.length ? (recent.reduce((sum, entry) => sum + entry.mood_level, 0) / recent.length).toFixed(1) : '—'
  const activeDays = new Set(recent.map((entry) => new Date(entry.occurred_at).toDateString())).size
  const emotionCounts = recent.flatMap((entry) => entry.emotion_tags).reduce<Record<string, number>>((counts, tag) => {
    const normalized = tag.trim()
    if (normalized) counts[normalized] = (counts[normalized] ?? 0) + 1
    return counts
  }, {})
  const commonEmotions = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1]).slice(0, 5)
  const recentDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(Date.now() - (6 - index) * 86400000)
    const dayEntries = entries.filter((entry) => new Date(entry.occurred_at).toDateString() === date.toDateString())
    const level = dayEntries.length ? dayEntries.reduce((sum, entry) => sum + entry.mood_level, 0) / dayEntries.length : 0
    return { label: date.toLocaleDateString(undefined, { weekday: 'short' }), level }
  })

  const stats = [
    { icon: Flower2, label: t('progress.averageMood'), value: average },
    { icon: CalendarDays, label: t('progress.activeDays'), value: String(activeDays) },
    { icon: BarChart3, label: t('progress.moodEntries'), value: String(recent.length) },
    { icon: BookOpen, label: t('progress.journalEntries'), value: String(journalEntries.length) },
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <header><p className="text-sm font-medium text-brand-slate">{t('progress.eyebrow')}</p><h1 className="mt-1 text-3xl font-semibold">{t('progress.title')}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">{t('progress.subtitle')}</p></header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => <Card key={label} padding="sm"><Icon className="mb-3 h-5 w-5 text-brand-slate" aria-hidden="true" /><p className="text-2xl font-semibold">{value}</p><p className="mt-1 text-xs text-gray-500">{label}</p></Card>)}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_.8fr]">
        <Card>
          <h2 className="text-lg font-semibold">{t('progress.sevenDays')}</h2>
          <div className="mt-6 flex h-52 items-end justify-between gap-2 border-b border-[#e1e8e4] pb-2" aria-label={t('progress.chartLabel')}>
            {recentDays.map((day) => <div key={day.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><span className="text-xs font-medium text-brand-slate">{day.level ? day.level.toFixed(1) : '—'}</span><div className="w-full max-w-12 rounded-t-lg bg-brand-sage transition-all" style={{ height: day.level ? `${Math.max(16, day.level / 5 * 75)}%` : '3px' }} /><span className="text-[11px] text-gray-500">{day.label}</span></div>)}
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">{t('progress.commonEmotions')}</h2>
          {commonEmotions.length ? <ul className="mt-4 space-y-3">{commonEmotions.map(([emotion, count]) => <li key={emotion} className="flex items-center justify-between gap-3 rounded-button bg-[#f5f8f6] px-3 py-2"><span className="truncate text-sm">{emotion}</span><span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-brand-slate">{count}</span></li>)}</ul> : <p className="py-8 text-center text-sm text-gray-500">{t('progress.noEmotions')}</p>}
        </Card>
      </div>

      <p className="rounded-button border border-[#e1e8e4] bg-white/70 p-4 text-xs leading-5 text-gray-500">{t('progress.note')}</p>
    </div>
  )
}
