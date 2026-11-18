import { Link } from 'react-router-dom'
import { ArrowRight, BookHeart, Flower2, HeartHandshake, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useTranslation } from '@/i18n'
import i18n, { LOCALES, LOCALE_NATIVE_LABELS, type Locale } from '@/i18n'
import hero from '@/assets/hero.png'
import ThemeToggle from '@/components/ui/theme-toggle'

export default function HomePage() {
  const { t } = useTranslation()
  const features = [
    { icon: Flower2, title: t('home.moodTitle'), body: t('home.moodBody'), tone: 'bg-[#e8efe6]' },
    { icon: Sparkles, title: t('home.relaxTitle'), body: t('home.relaxBody'), tone: 'bg-[#eee9f6]' },
    { icon: HeartHandshake, title: t('home.helpTitle'), body: t('home.helpBody'), tone: 'bg-[#f6e9e7]' },
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-slate text-white shadow-lg sm:h-11 sm:w-11"><HeartHandshake size={21} /></span>
          <span className="text-lg font-semibold tracking-tight min-[380px]:text-xl">MindCare</span>
        </Link>
        <div className="flex min-w-0 items-center gap-2">
          <label className="flex min-w-0 items-center gap-2 text-sm text-brand-slate">
            <span className="hidden sm:inline">{t('common.language')}</span>
            <select aria-label={t('common.language')} value={i18n.resolvedLanguage ?? 'en'} onChange={(event) => i18n.changeLanguage(event.target.value)} className="min-h-10 max-w-[108px] rounded-button border border-brand-sage/40 bg-white/80 px-2 py-2 text-xs shadow-sm backdrop-blur sm:max-w-none sm:px-3 sm:text-sm">
              {LOCALES.map((locale) => <option key={locale} value={locale}>{LOCALE_NATIVE_LABELS[locale as Locale]}</option>)}
            </select>
          </label>
          <ThemeToggle compact className="sm:hidden" />
          {/* <ThemeToggle className="hidden sm:flex" /> */}
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-4 sm:px-6 sm:pb-16 sm:pt-8 lg:grid-cols-[1.08fr_.92fr] lg:pb-24 lg:pt-14">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-sage/25 bg-white/65 px-4 py-2 text-sm font-medium text-brand-slate shadow-sm"><Sparkles size={16} />{t('wellness.eyebrow')}</div>
            <h1 className="max-w-3xl text-[2.45rem] font-semibold leading-[1.12] text-brand-slate-dark min-[380px]:text-[2.75rem] sm:text-6xl sm:leading-[1.08] lg:text-7xl">{t('app.tagline')}</h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">{t('safety.notice')}</p>
            <div className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap">
              <Button asChild size="lg" className="w-full sm:w-auto"><Link to="/register">{t('auth.createAccount')}<ArrowRight size={18} className="ml-2" /></Link></Button>
              <Button variant="outline" asChild size="lg" className="w-full sm:w-auto"><Link to="/wellness">{t('wellness.explore')}</Link></Button>
              <Button variant="ghost" asChild size="lg" className="w-full sm:w-auto"><Link to="/login">{t('auth.login')}</Link></Button>
            </div>
          </div>
          <div className="relative mx-auto w-[calc(100%-12px)] max-w-lg sm:w-full">
            <div className="absolute -inset-3 rounded-[30px] bg-gradient-to-br from-brand-lavender/65 to-brand-sage/50 blur-2xl sm:-inset-5 sm:rounded-[40px]" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/75 p-2 shadow-[0_35px_80px_-35px_rgba(35,51,46,0.5)] sm:rounded-[36px] sm:p-3">
              <img src={hero} alt="" className="aspect-[4/4.25] w-full rounded-[22px] object-cover sm:aspect-[4/4.4] sm:rounded-[28px]" />
              <div className="absolute bottom-4 left-4 right-4 rounded-[18px] border border-white/80 bg-white/90 p-3 shadow-xl backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7 sm:rounded-[22px] sm:p-5">
                <div className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-lavender sm:h-10 sm:w-10"><BookHeart size={18} /></span><div className="min-w-0"><p className="text-sm font-semibold sm:text-base">{t('wellness.title')}</p><p className="line-clamp-2 text-xs leading-5 text-gray-600 sm:text-sm">{t('wellness.habitsIntro')}</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/70 bg-white/35 py-12 backdrop-blur-sm sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-5 md:grid-cols-3">
              {features.map(({ icon: Icon, title, body, tone }) => <Card key={title} padding="lg" className="group"><span className={`mb-4 grid h-11 w-11 place-items-center rounded-2xl ${tone} text-brand-slate transition-transform group-hover:scale-105 sm:mb-5 sm:h-12 sm:w-12`}><Icon size={21} /></span><h2 className="text-lg font-semibold sm:text-xl">{title}</h2><p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">{body}</p></Card>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <h2 className="text-[1.75rem] font-semibold leading-tight sm:text-4xl">{t('wellness.title')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">{t('wellness.subtitle')}</p>
          <div className="mx-auto mt-7 grid max-w-sm gap-3 sm:flex sm:max-w-none sm:justify-center"><Button asChild className="w-full sm:w-auto"><Link to="/wellness">{t('wellness.explore')}</Link></Button><Button variant="outline" asChild className="w-full sm:w-auto"><Link to="/get-help">{t('support.title')}</Link></Button></div>
        </section>
      </main>
    </div>
  )
}
