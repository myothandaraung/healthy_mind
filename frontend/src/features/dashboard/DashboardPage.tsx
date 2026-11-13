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
      <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#174f47_0%,#236b60_55%,#425f70_100%)] px-6 py-8 text-white shadow-[0_28px_70px_-36px_rgba(16,43,39,0.75)] sm:px-9 sm:py-10">
        <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 right-28 h-52 w-52 rounded-full bg-brand-lavender/20 blur-3xl" />
        <div className="relative flex items-end justify-between gap-5">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur"><Sparkles className="h-3.5 w-3.5" />{t('wellness.eyebrow')}</div>
            <h1 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{t('dashboard.welcome')}{user?.name ? `, ${user.name}` : ''}</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">{t('dashboard.quickActionsIntro')}</p>
          </div>
          <span className="hidden h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/10 text-[#c9ede1] backdrop-blur sm:grid"><Flower2 className="h-7 w-7" /></span>
        </div>
      </div>

      <section aria-labelledby="quick-actions-title">
        <div className="mb-4">
          <h2 id="quick-actions-title" className="text-xl font-semibold">{t('dashboard.quickActions')}</h2>
          <p className="mt-1 text-sm text-gray-600">{t('dashboard.quickActionsIntro')}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {quickActions.map(({ icon: Icon, title, description, path, tone }) => (
            <button
              key={path}
              type="button"
              onClick={() => navigate(path)}
              className="group relative overflow-hidden rounded-card border border-white/90 bg-white/78 p-5 text-left shadow-[0_14px_35px_-28px_rgba(16,43,39,0.45)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-brand-sage/45 hover:shadow-[0_22px_48px_-28px_rgba(16,43,39,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-slate"
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

      <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-3">{t('dashboard.prompt')}</h2>
          <div className="grid grid-cols-5 gap-2 mb-4">
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
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">{t('dashboard.chart')}</h2>
          <div className="h-48 flex items-end gap-1 border-b border-gray-200 pb-2">
            {[5, 4, 3, 2, 1, 0].map((day) => {
              const target = new Date(Date.now() - day * 86400000).toDateString()
              const entry = entries.find((e) => new Date(e.occurred_at).toDateString() === target)
              const height = entry ? Math.max(20, (entry.mood_level / 5) * 100) : 0
              return (
                <div key={day} className="flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-brand-lavender rounded-t-button transition-colors"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500">{entry ? entry.mood_level : '—'}</span>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-gray-500 mt-2">{t('mood.chartAlt')}</p>
        </div>

        <div className="col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-3">{t('dashboard.activity')}</h2>
          <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => navigate('/relax')}>
            {t('relax.startBreathing')}
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">{t('dashboard.goals')}</h2>
          <p className="text-sm text-gray-600">{t('dashboard.goalsSub')}</p>
          <Button variant="ghost" className="w-full text-left" onClick={() => navigate('/journal')}>{t('dashboard.writeEntry')}</Button>
        </div>

        <div className="col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-3">{t('dashboard.journal')}</h2>
          {journalList.length === 0 ? (
            <p className="text-sm text-gray-500">{t('journal.empty')}</p>
          ) : (
            <ul className="space-y-2">
              {journalList.slice(0, 3).map((entry) => (
                <li key={entry.id} className="flex items-center justify-between p-2 rounded-button bg-gray-50/50 hover:bg-gray-100/50 transition-colors cursor-pointer">
                  <span className="text-sm truncate">{entry.title ?? t('journal.editor')}</span>
                  <span className="text-xs text-gray-500">{formatLocal(entry.created_at, 'UTC', 'PPp')}</span>
                </li>
              ))}
            </ul>
          )}
          <Button variant="ghost" className="w-full text-left mt-2" onClick={() => navigate('/journal')}>
            {t('dashboard.writeEntry')}
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-red-50 border-red-100 text-red-700">
        <h2 className="font-semibold mb-1">{t('dashboard.needSupport')}</h2>
        <p className="text-sm">{t('support.disclaimer')}</p>
        <Button variant="outline" className="w-full mt-3 border-red-200 text-red-700 hover:bg-red-100" onClick={() => navigate('/get-help')}>
          {t('dashboard.getHelp')}
        </Button>
      </Card>
    </div>
  )
}
