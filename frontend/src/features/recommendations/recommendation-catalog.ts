import type { Locale } from '@/i18n'

export type RecommendationCategory = 'book' | 'podcast' | 'video'

export interface Recommendation {
  id: string
  category: RecommendationCategory
  locale: Locale
  title: string
  creator: string
  description: string
  url: string
}

export const recommendationCatalog: Recommendation[] = [
  {
    id: 'en-who-stress-guide', category: 'book', locale: 'en',
    title: 'Doing What Matters in Times of Stress', creator: 'World Health Organization',
    description: 'A free illustrated guide with practical skills for grounding, difficult thoughts, values, emotions, and self-kindness.',
    url: 'https://www.who.int/publications/i/item/9789240003927',
  },
  {
    id: 'en-cci-self-compassion', category: 'book', locale: 'en',
    title: 'Building Self-Compassion', creator: 'Centre for Clinical Interventions',
    description: 'A free, structured workbook for understanding self-criticism and practising a kinder response to yourself.',
    url: 'https://www.cci.health.wa.gov.au/resources/looking-after-yourself/self-compassion',
  },
  {
    id: 'en-speaking-of-psychology', category: 'podcast', locale: 'en',
    title: 'Speaking of Psychology', creator: 'American Psychological Association',
    description: 'Conversations with psychologists about current research and its relevance to everyday life.',
    url: 'https://www.apa.org/news/podcasts',
  },
  {
    id: 'en-lets-talk-mental-health', category: 'podcast', locale: 'en',
    title: "Let's Talk: Mental Health", creator: 'Mental Health Foundation',
    description: 'Accessible conversations with people and experts about experiences that affect how we think and feel.',
    url: 'https://www.mentalhealth.org.uk/explore-mental-health/podcasts',
  },
  {
    id: 'en-who-mental-health-video', category: 'video', locale: 'en',
    title: "Let's Talk Mental Health", creator: 'World Health Organization',
    description: 'A public-health conversation introducing mental health, support, and common questions.',
    url: 'https://www.youtube.com/watch?v=JrZqCEu2V4Y',
  },
  {
    id: 'en-nimh-videos', category: 'video', locale: 'en',
    title: 'Mental Health Videos', creator: 'National Institute of Mental Health',
    description: 'Educational videos about mental-health research, signs, symptoms, and finding appropriate support.',
    url: 'https://www.youtube.com/channel/UCkv4SxLREmIKoUYzabJX4dQ',
  },

  {
    id: 'ja-who-stress-guide', category: 'book', locale: 'ja',
    title: 'ストレスを感じたら やるべきこと', creator: '世界保健機関（WHO）',
    description: '困難な状況でストレスに対処するための、無料のイラスト付き実践ガイドです。',
    url: 'https://www.who.int/publications/i/item/9789240003927',
  },
  {
    id: 'ja-kokoro-information', category: 'book', locale: 'ja',
    title: 'こころの情報サイト：ストレスとセルフケア', creator: '国立精神・神経医療研究センター',
    description: 'こころの健康、ストレス、セルフケア、相談や受診について正確に学べる公的なガイドです。',
    url: 'https://kokoro.ncnp.go.jp/',
  },
  {
    id: 'ja-bakusui-radio', category: 'podcast', locale: 'ja',
    title: 'バク睡らぢお', creator: '国立精神・神経医療研究センター 認知行動療法センター',
    description: '医師、心理士、睡眠専門家、研究者が睡眠とメンタルヘルスについて語る番組です。',
    url: 'https://podcasts.apple.com/jp/podcast/%E3%83%90%E3%82%AF%E7%9D%A1%E3%82%89%E3%81%A2%E3%81%8A/id1633006971',
  },
  {
    id: 'ja-psychoro', category: 'podcast', locale: 'ja',
    title: 'Psychoroな時間', creator: '一般社団法人Psychoro / FM鳥取',
    description: '公認心理師・臨床心理士が、身近なメンタルヘルスの話題を科学的知見に基づいて紹介します。',
    url: 'https://podcasts.apple.com/jp/podcast/psychoro%E3%81%AA%E6%99%82%E9%96%93/id1663131185',
  },
  {
    id: 'ja-kokoro-no-mimi', category: 'video', locale: 'ja',
    title: '動画で学ぶ「メンタルヘルス教室」', creator: '厚生労働省「こころの耳」',
    description: '専門家がストレス対策やセルフケアをわかりやすく解説する短い動画シリーズです。',
    url: 'https://kokoro.mhlw.go.jp/video/',
  },
  {
    id: 'ja-iwaki-kokoro', category: 'video', locale: 'ja',
    title: 'こころの健康チャンネル', creator: 'いわき市',
    description: '心の健康について、地域の公的機関が身近なテーマから解説する動画集です。',
    url: 'https://www.city.iwaki.lg.jp/www/contents/1694066009413/index.html',
  },

  {
    id: 'my-who-stress-guide', category: 'book', locale: 'my',
    title: 'စိတ်ဖိစီးမှုကြုံတဲ့အခါ လုပ်သင့်တာတွေ လုပ်ကြမယ်', creator: 'ကမ္ဘာ့ကျန်းမာရေးအဖွဲ့ (WHO Myanmar)',
    description: 'စိတ်ဖိစီးမှုကို ကိုင်တွယ်ရာတွင် အသုံးချနိုင်သည့် လေ့ကျင့်ခန်းများပါဝင်သော အခမဲ့ ပုံပြလမ်းညွှန်။',
    url: 'https://www.who.int/myanmar/activities/doing-what-matters-in-times-of-stress-in-myanmar-language',
  },
  {
    id: 'my-who-mental-health-materials', category: 'book', locale: 'my',
    title: 'စိတ်ကျန်းမာရေး အသိပညာပေး လမ်းညွှန်များ', creator: 'ကမ္ဘာ့ကျန်းမာရေးအဖွဲ့ (WHO Myanmar)',
    description: 'အိပ်မပျော်ခြင်း၊ စိတ်ဒဏ်ရာနှင့် အရေးပေါ်အခြေအနေများအတွက် မြန်မာဘာသာ အချက်အလက်နှင့် လမ်းညွှန်များ။',
    url: 'https://www.who.int/myanmar/emergencies/mental-health-rcce-materials',
  },
  {
    id: 'my-who-audio-exercises', category: 'podcast', locale: 'my',
    title: 'Doing What Matters အသံလေ့ကျင့်ခန်းများ', creator: 'ကမ္ဘာ့ကျန်းမာရေးအဖွဲ့ (WHO Myanmar)',
    description: 'အာရုံတည်ငြိမ်ခြင်း၊ မိမိကိုယ်ကို ကြင်နာခြင်းနှင့် ခက်ခဲသောအတွေးများမှ ခွာထွက်ခြင်းဆိုင်ရာ အသံလမ်းညွှန်များ။',
    url: 'https://www.who.int/myanmar/activities/doing-what-matters-in-times-of-stress-in-myanmar-language',
  },
  {
    id: 'my-mhpss-audio', category: 'podcast', locale: 'my',
    title: 'စိတ်ကျန်းမာရေး အသံအရင်းအမြစ်များ', creator: 'MHPSS Working Group Myanmar',
    description: 'စိုးရိမ်ပူပန်မှုနှင့် စိတ်ဖိစီးမှုကို ကိုင်တွယ်ရန် မြန်မာဘာသာဖြင့် နားထောင်နိုင်သော အသံဖိုင်များ။',
    url: 'https://www.mhpssmyanmar.org/my/videos',
  },
  {
    id: 'my-seit-ahara', category: 'video', locale: 'my',
    title: 'စိတ်အာဟာရ (Seit Ahara)', creator: 'Seit Ahara Myanmar Mental Health',
    description: 'ကျွမ်းကျင်သူများနှင့် ဆွေးနွေးထားသော စိတ်ဒဏ်ရာ၊ အရှက်တရားနှင့် အကူအညီရှာဖွေခြင်းဆိုင်ရာ မြန်မာဘာသာ အစီအစဉ်။',
    url: 'https://www.seitahara.org/en',
  },
  {
    id: 'my-mhpss-videos', category: 'video', locale: 'my',
    title: 'စိတ်ကျန်းမာရေးနှင့် လူမှုစိတ်ပိုင်းဆိုင်ရာ ဗီဒီယိုများ', creator: 'MHPSS Working Group Myanmar',
    description: 'စိတ်ဖိစီးမှု၊ စိုးရိမ်ပူပန်မှုနှင့် အကူအညီရယူခြင်းအကြောင်း မြန်မာဘာသာ အသိပညာပေး ဗီဒီယိုများ။',
    url: 'https://www.mhpssmyanmar.org/my/videos',
  },
]

export function recommendationsForLocale(locale: string): Recommendation[] {
  const supportedLocale: Locale = locale === 'ja' || locale === 'my' ? locale : 'en'
  return recommendationCatalog.filter((recommendation) => recommendation.locale === supportedLocale)
}
