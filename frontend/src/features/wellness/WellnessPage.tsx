import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'
import { useState } from 'react'
import { ExternalLink, PlayCircle } from 'lucide-react'

const REFLECTION_KEYS = ['enough', 'smallSteps', 'feelings', 'kindness', 'rest'] as const
const HABIT_KEYS = ['pause', 'move', 'connect', 'unplug', 'reflect', 'sleep'] as const
const ROUTINE_KEYS = ['morning', 'workday', 'evening'] as const
const OVERWHELMED_KEYS = ['ground', 'simplify', 'support'] as const
const PROMPT_KEYS = ['need', 'control', 'kind', 'release'] as const
const TAB_KEYS = ['everyday', 'stress', 'lowMood', 'anxiety'] as const
type WellnessTab = typeof TAB_KEYS[number]

const VIDEO_BY_LANGUAGE = {
  en: {
    id: 'E3Cts45FNrk',
    title: 'Doing What Matters in Times of Stress: An Illustrated Guide',
    source: 'World Health Organization (WHO)',
    heading: 'Watch in English',
    intro: 'A short, practical introduction to coping with stress from the World Health Organization.',
    open: 'Open on YouTube',
    notice: 'This video is hosted by YouTube. Playing it may share data with YouTube.',
  },
  ja: {
    id: 'cs6tIpi8FW4',
    title: 'ストレスって何？ こころとの上手なつきあい方',
    source: '厚生労働省 / Ministry of Health, Labour and Welfare',
    heading: '日本語で見る',
    intro: 'ストレスの仕組みと、こころをセルフケアする大切さを分かりやすく紹介します。',
    open: 'YouTubeで開く',
    notice: 'この動画はYouTubeで配信されています。再生すると、YouTubeにデータが送信される場合があります。',
  },
  my: {
    id: '-4VEOwzNM2E',
    title: 'စိတ်ဖိစီးမှုနဲ့ Burn Out ကို ဘယ်လိုကျော်ဖြတ်မလဲ',
    source: 'Olive Myanmar Vlog',
    heading: 'မြန်မာဘာသာဖြင့် ကြည့်ရန်',
    intro: 'စိတ်ဖိစီးမှု၊ စိတ်ရှုပ်ထွေးမှုနှင့် ပင်ပန်းနွမ်းနယ်မှုကို ကိုင်တွယ်ဖြေရှင်းသည့် ကိုယ်တွေ့နည်းလမ်းများကို မျှဝေထားသည်။',
    open: 'YouTube တွင် ဖွင့်ကြည့်ရန်',
    notice: 'ဤဗီဒီယိုကို YouTube မှ ပြသထားသည်။ ဖွင့်ကြည့်သည့်အခါ YouTube သို့ အချက်အလက်များ ပေးပို့နိုင်သည်။',
  },
} as const

export default function WellnessPage() {
  const { t, i18n } = useTranslation()
  const [activeTab, setActiveTab] = useState<WellnessTab>('everyday')
  const language = i18n.resolvedLanguage?.split('-')[0] as keyof typeof VIDEO_BY_LANGUAGE
  const video = VIDEO_BY_LANGUAGE[language] ?? VIDEO_BY_LANGUAGE.en

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <header className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-medium text-brand-slate">{t('wellness.eyebrow')}</p>
        <h1 className="text-3xl font-semibold mt-2">{t('wellness.title')}</h1>
        <p className="text-gray-600 mt-3">{t('wellness.subtitle')}</p>
      </header>

      <div role="tablist" aria-label={t('wellness.tabs.label')} className="grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-card bg-white p-2 border border-gray-200">
        {TAB_KEYS.map((tab) => (
          <button
            key={tab}
            id={`wellness-tab-${tab}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`wellness-panel-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`min-h-11 rounded-button px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-slate ${activeTab === tab ? 'bg-brand-slate text-white' : 'text-brand-slate hover:bg-gray-100'}`}
          >
            {t(`wellness.tabs.${tab}`)}
          </button>
        ))}
      </div>

      {activeTab !== 'everyday' && (
        <section id={`wellness-panel-${activeTab}`} role="tabpanel" aria-labelledby={`wellness-tab-${activeTab}`} className="space-y-5">
          <Card padding="md" className="bg-brand-lavender/30">
            <h2 className="text-xl font-semibold">{t(`wellness.topics.${activeTab}.title`)}</h2>
            <p className="text-gray-700 mt-2">{t(`wellness.topics.${activeTab}.intro`)}</p>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['notice', 'now', 'habits', 'support'] as const).map((section) => (
              <Card key={section} padding="md">
                <h3 className="font-semibold">{t(`wellness.topics.sections.${section}`)}</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc pl-5">
                  {[0, 1, 2].map((item) => <li key={item}>{t(`wellness.topics.${activeTab}.${section}.${item}`)}</li>)}
                </ul>
              </Card>
            ))}
          </div>
          <p className="text-sm text-gray-600 rounded-card border border-gray-200 bg-white p-4">{t('wellness.topics.disclaimer')}</p>
        </section>
      )}

      {activeTab === 'everyday' && <div id="wellness-panel-everyday" role="tabpanel" aria-labelledby="wellness-tab-everyday" className="space-y-8">

      <section aria-labelledby="positive-thinking-title">
        <h2 id="positive-thinking-title" className="text-xl font-semibold mb-4">{t('wellness.positiveTitle')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {REFLECTION_KEYS.map((key) => (
            <Card key={key} padding="md" className="bg-white">
              <p className="text-brand-slate-dark leading-relaxed">{t(`wellness.reflections.${key}`)}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="habits-title">
        <h2 id="habits-title" className="text-xl font-semibold mb-2">{t('wellness.habitsTitle')}</h2>
        <p className="text-sm text-gray-600 mb-4">{t('wellness.habitsIntro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HABIT_KEYS.map((key, index) => (
            <Card key={key} padding="md" className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-lavender font-semibold" aria-hidden="true">{index + 1}</span>
              <div>
                <h3 className="font-semibold">{t(`wellness.habits.${key}.title`)}</h3>
                <p className="text-sm text-gray-600 mt-1">{t(`wellness.habits.${key}.body`)}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="routines-title">
        <h2 id="routines-title" className="text-xl font-semibold mb-2">{t('wellness.routinesTitle')}</h2>
        <p className="text-sm text-gray-600 mb-4">{t('wellness.routinesIntro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ROUTINE_KEYS.map((key) => (
            <Card key={key} padding="md">
              <h3 className="font-semibold">{t(`wellness.routines.${key}.title`)}</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc pl-5">
                {[0, 1, 2].map((item) => <li key={item}>{t(`wellness.routines.${key}.steps.${item}`)}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="overwhelmed-title">
        <h2 id="overwhelmed-title" className="text-xl font-semibold mb-2">{t('wellness.overwhelmedTitle')}</h2>
        <p className="text-sm text-gray-600 mb-4">{t('wellness.overwhelmedIntro')}</p>
        <div className="space-y-3">
          {OVERWHELMED_KEYS.map((key) => (
            <Card key={key} padding="md">
              <h3 className="font-semibold">{t(`wellness.overwhelmed.${key}.title`)}</h3>
              <p className="text-sm text-gray-600 mt-1">{t(`wellness.overwhelmed.${key}.body`)}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="prompts-title">
        <h2 id="prompts-title" className="text-xl font-semibold mb-2">{t('wellness.promptsTitle')}</h2>
        <p className="text-sm text-gray-600 mb-4">{t('wellness.promptsIntro')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROMPT_KEYS.map((key) => (
            <blockquote key={key} className="rounded-card border border-gray-200 bg-white p-4 text-sm text-gray-700">
              {t(`wellness.prompts.${key}`)}
            </blockquote>
          ))}
        </div>
      </section>
      </div>}

      <section aria-labelledby="wellness-video-title" className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-brand-slate">
            <PlayCircle className="h-5 w-5" aria-hidden="true" />
            <h2 id="wellness-video-title" className="text-xl font-semibold">{video.heading}</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">{video.intro}</p>
        </div>
        <Card padding="none" className="overflow-hidden">
          <div className="aspect-video bg-gray-100">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${video.id}`}
              title={video.title}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-brand-slate-dark">{video.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{video.source}</p>
            <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <p className="max-w-xl text-xs text-gray-500">{video.notice}</p>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-slate hover:underline"
              >
                {video.open}<ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Card>
      </section>

      <Card padding="md" className="bg-brand-lavender/30">
        <h2 className="font-semibold">{t('wellness.rememberTitle')}</h2>
        <p className="text-sm text-gray-700 mt-2">{t('wellness.rememberBody')}</p>
        <p className="text-sm text-gray-700">{t('safety.notice')}</p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button asChild><Link to="/relax">{t('relax.title')}</Link></Button>
          <Button variant="outline" asChild><Link to="/get-help">{t('support.title')}</Link></Button>
        </div>
      </Card>
    </div>
  )
}
