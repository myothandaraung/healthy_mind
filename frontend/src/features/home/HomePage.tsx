import { Link } from 'react-router-dom'
import { ArrowRight, BookHeart, Flower2, HeartHandshake, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useTranslation } from '@/i18n'
import i18n, { LOCALES, LOCALE_NATIVE_LABELS, type Locale } from '@/i18n'
import hero from '@/assets/hero.png'

export default function HomePage() {
  const { t } = useTranslation()
  const features = [
    { icon: Flower2, title: t('home.moodTitle'), body: t('home.moodBody'), tone: 'bg-[#e8efe6]' },
    { icon: Sparkles, title: t('home.relaxTitle'), body: t('home.relaxBody'), tone: 'bg-[#eee9f6]' },
    { icon: HeartHandshake, title: t('home.helpTitle'), body: t('home.helpBody'), tone: 'bg-[#f6e9e7]' },
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-slate text-white shadow-lg"><HeartHandshake size={22} /></span>
          <span className="text-xl font-semibold tracking-tight">MindCare</span>
        </Link>
        <label className="flex items-center gap-2 text-sm text-brand-slate">
          <span className="hidden sm:inline">{t('common.language')}</span>
          <select aria-label={t('common.language')} value={i18n.resolvedLanguage ?? 'en'} onChange={(event) => i18n.changeLanguage(event.target.value)} className="rounded-button border border-brand-sage/40 bg-white/80 px-3 py-2 shadow-sm backdrop-blur">
            {LOCALES.map((locale) => <option key={locale} value={locale}>{LOCALE_NATIVE_LABELS[locale as Locale]}</option>)}
          </select>
        </label>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:pb-24 lg:pt-14">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-sage/25 bg-white/65 px-4 py-2 text-sm font-medium text-brand-slate shadow-sm"><Sparkles size={16} />{t('wellness.eyebrow')}</div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] text-brand-slate-dark sm:text-6xl lg:text-7xl">{t('app.tagline')}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">{t('safety.notice')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/register">{t('auth.createAccount')}<ArrowRight size={18} className="ml-2" /></Link></Button>
              <Button variant="outline" asChild size="lg"><Link to="/wellness">{t('wellness.explore')}</Link></Button>
              <Button variant="ghost" asChild size="lg"><Link to="/login">{t('auth.login')}</Link></Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-br from-brand-lavender/65 to-brand-sage/50 blur-2xl" />
            <div className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white/75 p-3 shadow-[0_35px_80px_-35px_rgba(35,51,46,0.5)]">
              <img src={hero} alt="" className="aspect-[4/4.4] w-full rounded-[28px] object-cover" />
              <div className="absolute bottom-7 left-7 right-7 rounded-[22px] border border-white/80 bg-white/88 p-5 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-brand-lavender"><BookHeart size={19} /></span><div><p className="font-semibold">{t('wellness.title')}</p><p className="text-sm text-gray-600">{t('wellness.habitsIntro')}</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/70 bg-white/35 py-16 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-5 md:grid-cols-3">
              {features.map(({ icon: Icon, title, body, tone }) => <Card key={title} padding="lg" className="group"><span className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl ${tone} text-brand-slate transition-transform group-hover:scale-105`}><Icon size={22} /></span><h2 className="text-xl font-semibold">{title}</h2><p className="mt-2 leading-7 text-gray-600">{body}</p></Card>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t('wellness.title')}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">{t('wellness.subtitle')}</p>
          <div className="mt-7 flex justify-center gap-3"><Button asChild><Link to="/wellness">{t('wellness.explore')}</Link></Button><Button variant="outline" asChild><Link to="/get-help">{t('support.title')}</Link></Button></div>
        </section>
      </main>
    </div>
  )
}
