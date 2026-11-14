import { useQuery } from '@tanstack/react-query'
import { useTranslation } from '@/i18n'
import { useAuth } from '@/features/auth'
import { moodApi } from '@/features/mood/mood-api'
import { journalApi } from '@/features/journal/journal-api'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatLocal } from '@/lib/date'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, BookHeart, Flower2, HeartHandshake, NotebookPen, Settings, SmilePlus, Sparkles } from 'lucide-react'

export default function DashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const navigate = useNavigate()

  const { data: moods, isLoading } = useQuery({
    queryKey: moodApi.keys.summary('week'),
    queryFn: () => moodApi.summary('week'),
    enabled: !!user,
  })
  const { data: journals } = useQuery({
    queryKey: journalApi.keys.list(),
    queryFn: journalApi.list,
    enabled: !!user,
  })

  if (isLoading) return <div className="py-10 text-center">{t('common.loading')}</div>

  const entries = moods?.entries ?? []
  const journalList = journals ?? []
  const quickActions = [
    { icon: SmilePlus, title: t('mood.title'), description: t('home.moodBody'), path: '/mood', tone: 'bg-[#e8efe6]' },
    { icon: NotebookPen, title: t('journal.title'), description: t('journal.subtitle'), path: '/journal', tone: 'bg-[#eee9f6]' },
    { icon: Flower2, title: t('relax.title'), description: t('home.relaxBody'), path: '/relax', tone: 'bg-[#f5eddc]' },
    { icon: BookHeart, title: t('wellness.title'), description: t('wellness.habitsIntro'), path: '/wellness', tone: 'bg-[#e8efe6]' },
    { icon: HeartHandshake, title: t('support.title'), description: t('home.helpBody'), path: '/get-help', tone: 'bg-[#f6e9e7]' },
    { icon: Settings, title: t('settings.title'), description: t('settings.profile'), path: '/settings', tone: 'bg-[#eee9f6]' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 sm:px-6">
      <div className="relative overflow-hidden rounded-[28px] border border-[#d6e4de] bg-[linear-gradient(135deg,#edf5f1_0%,#f8f7f2_58%,#eeeaf5_100%)] px-6 py-8 shadow-[0_24px_60px_-38px_rgba(24,51,47,0.45)] sm:px-9 sm:py-10">
        <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full bg-brand-sage/25 blur-2xl" />
        <div className="absolute -bottom-24 right-28 h-52 w-52 rounded-full bg-brand-lavender/45 blur-3xl" />
        <div className="relative flex items-end justify-between gap-5">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-sage/35 bg-white/65 px-3 py-1.5 text-xs font-medium text-brand-slate backdrop-blur"><Sparkles className="h-3.5 w-3.5" />{t('wellness.eyebrow')}</div>
            <h1 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{t('dashboard.welcome')}{user?.name ? `, ${user.name}` : ''}</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">{t('dashboard.quickActionsIntro')}</p>
          </div>
          <span className="hidden h-16 w-16 shrink-0 place-items-center rounded-2xl border border-brand-sage/30 bg-white/65 text-brand-slate backdrop-blur sm:grid"><Flower2 className="h-7 w-7" /></span>
        </div>
      </div>

      <section aria-labelledby="quick-actions-title">
        <div className="mb-4">
          <h2 id="quick-actions-title" className="text-xl font-semibold">{t('dashboard.quickActions')}</h2>
          <p className="mt-1 text-sm text-gray-600">{t('dashboard.quickActionsIntro')}</p>
        </div>
        <div className="grid grid-cols-1 gap-3 min-[390px]:grid-cols-2 md:grid-cols-3">
          {quickActions.map(({ icon: Icon, title, description, path, tone }) => (
            <button
              key={path}
              type="button"
              onClick={() => navigate(path)}
              className="group relative overflow-hidden rounded-card border border-white/90 bg-white/78 p-4 text-left shadow-[0_14px_35px_-28px_rgba(16,43,39,0.45)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-brand-sage/45 hover:shadow-[0_22px_48px_-28px_rgba(16,43,39,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-slate sm:p-5"
            >
              <span className={`mb-3 grid h-10 w-10 place-items-center rounded-2xl ${tone} text-brand-slate transition-transform group-hover:scale-105`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="block font-semibold text-brand-slate-dark">{title}</span>
              <span className="mt-1 hidden text-sm leading-5 text-gray-600 sm:block">{description}</span>
              <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-gray-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-slate" aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <Card>
          <h2 className="mb-3 text-lg font-semibold">{t('dashboard.prompt')}</h2>
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {[
              { v: 1, k: 'mood.levels.1' },
              { v: 2, k: 'mood.levels.2' },
              { v: 3, k: 'mood.levels.3' },
              { v: 4, k: 'mood.levels.4' },
              { v: 5, k: 'mood.levels.5' },
            ].map((l) => (
              <Button key={l.v} variant="outline" size="sm" onClick={() => navigate('/mood')}>
                {t(l.k)}
              </Button>
            ))}
          </div>
          <p className="text-xs text-gray-500">{t('dashboard.empty')}</p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
        <Card>
          <h2 className="mb-3 text-lg font-semibold">{t('dashboard.chart')}</h2>
          {entries.length === 0 ? <div className="grid min-h-32 place-items-center rounded-button border border-dashed border-[#d6e0dc] bg-[#f8faf8] px-4 text-center"><div><Flower2 className="mx-auto mb-2 h-6 w-6 text-brand-sage" aria-hidden="true" /><p className="text-sm text-gray-500">{t('dashboard.empty')}</p></div></div> : <div className="flex h-40 items-end gap-2 border-b border-[#e1e8e4] pb-2">
            {[5, 4, 3, 2, 1, 0].map((day) => {
              const target = new Date(Date.now() - day * 86400000).toDateString()
              const entry = entries.find((e) => new Date(e.occurred_at).toDateString() === target)
              const height = entry ? Math.max(20, (entry.mood_level / 5) * 100) : 0
              return (
                <div key={day} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <span className="text-[11px] font-medium text-brand-slate">{entry ? entry.mood_level : '—'}</span>
                  <div
                    className="w-full max-w-12 rounded-t-lg bg-brand-sage transition-all"
                    style={{ height: entry ? `${Math.max(12, height * 0.72)}%` : '3px' }}
                  />
                  <span className="text-[10px] text-gray-500">{new Date(Date.now() - day * 86400000).toLocaleDateString(undefined, { weekday: 'short' })}</span>
                </div>
              )
            })}
          </div>}
          <p className="mt-2 text-xs text-gray-500">{t('mood.chartAlt')}</p>
        </Card>

        <Card className="flex flex-col justify-between bg-[#f6f2e8]">
          <div><span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand-slate"><Sparkles className="h-5 w-5" aria-hidden="true" /></span><h2 className="text-lg font-semibold">{t('dashboard.activity')}</h2><p className="mt-2 text-sm leading-6 text-gray-600">{t('home.relaxBody')}</p></div>
          <Button className="mt-5 w-full" onClick={() => navigate('/relax')}>
            {t('dashboard.startBreathing')}
          </Button>
        </Card>
      </div>

        <Card>
          <div className="mb-3 flex items-center justify-between gap-3"><h2 className="text-lg font-semibold">{t('dashboard.journal')}</h2><Button variant="ghost" size="sm" onClick={() => navigate('/journal')}>{t('dashboard.writeEntry')}</Button></div>
          {journalList.length === 0 ? (
            <p className="rounded-button bg-[#f8faf8] p-5 text-center text-sm text-gray-500">{t('journal.empty')}</p>
          ) : (
            <ul className="space-y-2">
              {journalList.slice(0, 3).map((entry) => (
                <li key={entry.id} onClick={() => navigate('/journal')} className="flex cursor-pointer flex-col gap-1 rounded-button bg-[#f8faf8] p-3 transition-colors hover:bg-[#edf3f0] sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm truncate">{entry.title ?? t('journal.editor')}</span>
                  <span className="text-xs text-gray-500">{formatLocal(entry.created_at, 'UTC', 'PPp')}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

      <Card className="border-[#efd5d3] bg-[#fff5f3] p-6 text-[#8a4650]">
        <h2 className="font-semibold mb-1">{t('dashboard.needSupport')}</h2>
        <p className="text-sm">{t('support.disclaimer')}</p>
        <Button variant="outline" className="w-full mt-3 border-red-200 text-red-700 hover:bg-red-100" onClick={() => navigate('/get-help')}>
          {t('dashboard.getHelp')}
        </Button>
      </Card>
    </div>
  )
}
