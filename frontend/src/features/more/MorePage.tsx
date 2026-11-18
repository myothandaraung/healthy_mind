import { Link } from 'react-router-dom'
import { ArrowUpRight, BarChart3, BookHeart, Flower2, HeartHandshake, ListChecks, LogOut, NotebookPen, Settings2, Sparkles, WandSparkles } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { useAuth } from '@/features/auth'
import { Button } from '@/components/ui/button'
import { LanguageSelector } from '@/components/ui/language-selector'

export default function MorePage() {
  const { t } = useTranslation()
  const { logout } = useAuth()
  const items = [
    { to: '/mood', icon: Flower2, title: t('app.nav.mood'), body: t('home.moodBody'), tone: 'bg-[#e7f0ec]' },
    { to: '/journal', icon: NotebookPen, title: t('app.nav.journal'), body: t('journal.subtitle'), tone: 'bg-[#eeeaf5]' },
    { to: '/goals', icon: ListChecks, title: t('app.nav.goals'), body: t('dashboard.goalsIntro'), tone: 'bg-[#edf2e7]' },
    { to: '/relax', icon: Sparkles, title: t('app.nav.relax'), body: t('home.relaxBody'), tone: 'bg-[#f5eddc]' },
    { to: '/manifestation', icon: WandSparkles, title: t('app.nav.manifestation'), body: t('manifestation.subtitle'), tone: 'bg-[#eeeaf5]' },
    { to: '/wellness', icon: BookHeart, title: t('app.nav.learn'), body: t('wellness.subtitle'), tone: 'bg-[#e7f0ec]' },
    { to: '/progress', icon: BarChart3, title: t('app.nav.progress'), body: t('progress.subtitle'), tone: 'bg-[#eeeaf5]' },
    { to: '/get-help', icon: HeartHandshake, title: t('app.nav.getHelp'), body: t('support.subtitle'), tone: 'bg-[#fff0ee]' },
    { to: '/settings', icon: Settings2, title: t('app.nav.settings'), body: t('settings.profile'), tone: 'bg-[#f1f2ef]' },
  ]
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <header><h1 className="text-3xl font-semibold">{t('more.title')}</h1><p className="mt-2 text-sm text-gray-600">{t('more.subtitle')}</p></header>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(({ to, icon: Icon, title, body, tone }) => (
          <Link key={to} to={to} className="group relative rounded-card border border-[#e1e8e4] bg-white/90 p-5 shadow-[0_12px_32px_-24px_rgba(24,51,47,.3)] transition hover:-translate-y-0.5 hover:border-brand-sage">
            <span className={`mb-4 grid h-11 w-11 place-items-center rounded-2xl ${tone} text-brand-slate`}><Icon className="h-5 w-5" aria-hidden="true" /></span>
            <h2 className="font-semibold">{title}</h2><p className="mt-1 pr-6 text-sm leading-6 text-gray-600">{body}</p>
            <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-gray-300 transition group-hover:text-brand-slate" aria-hidden="true" />
          </Link>
        ))}
      </div>
      <LanguageSelector helper={t('more.languageHelp')} />
      <div className="border-t border-[#dce6e2] pt-5">
        <Button variant="ghost" className="w-full justify-start text-gray-600 sm:w-auto" onClick={logout}><LogOut className="mr-2 h-4 w-4" aria-hidden="true" />{t('auth.logout')}</Button>
      </div>
    </div>
  )
}
