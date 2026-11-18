import { useEffect, useState } from 'react'
import { Check, Eye, Focus, Footprints, Plus, Sparkles, Trash2 } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

type Action = { id: string; text: string; done: boolean }
const STORAGE_KEY = 'mindcare.manifestation'

export default function ManifestationPage() {
  const { t } = useTranslation()
  const [intention, setIntention] = useState('')
  const [visualization, setVisualization] = useState('')
  const [actionText, setActionText] = useState('')
  const [actions, setActions] = useState<Action[]>([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    try {
      const value = JSON.parse(stored) as { intention?: string; visualization?: string; actions?: Action[] }
      setIntention(value.intention ?? '')
      setVisualization(value.visualization ?? '')
      setActions(Array.isArray(value.actions) ? value.actions : [])
    } catch { /* Ignore invalid local data. */ }
  }, [])

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ intention, visualization, actions }))
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }

  const addAction = () => {
    const text = actionText.trim()
    if (!text || actions.length >= 5) return
    setActions((current) => [...current, { id: crypto.randomUUID(), text, done: false }])
    setActionText('')
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 sm:py-9">
      <header className="manifestation-hero overflow-hidden rounded-[28px] border border-[#d6e4de] p-6 sm:p-9">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-sage/30 bg-white/65 px-3 py-1.5 text-xs font-semibold text-brand-slate backdrop-blur"><Sparkles className="h-3.5 w-3.5" />{t('manifestation.eyebrow')}</span>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{t('manifestation.title')}</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">{t('manifestation.subtitle')}</p>
        </div>
      </header>

      <Card className="border-amber-200/60 bg-amber-50/65"><p className="text-sm leading-6 text-gray-700">{t('manifestation.realityNote')}</p></Card>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="mb-5 flex items-start gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e7f0ec] text-brand-slate"><Focus className="h-5 w-5" /></span><div><p className="text-xs font-semibold uppercase tracking-wider text-brand-slate">{t('manifestation.step', { count: 1 })}</p><h2 className="mt-1 text-lg font-semibold">{t('manifestation.intentionTitle')}</h2></div></div>
          <Textarea value={intention} onChange={(event) => setIntention(event.target.value)} label={t('manifestation.intentionLabel')} placeholder={t('manifestation.intentionPlaceholder')} className="min-h-36" />
          <p className="mt-3 text-xs leading-5 text-gray-500">{t('manifestation.intentionHelp')}</p>
        </Card>
        <Card>
          <div className="mb-5 flex items-start gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#eeeaf5] text-brand-slate"><Eye className="h-5 w-5" /></span><div><p className="text-xs font-semibold uppercase tracking-wider text-brand-slate">{t('manifestation.step', { count: 2 })}</p><h2 className="mt-1 text-lg font-semibold">{t('manifestation.visualizeTitle')}</h2></div></div>
          <Textarea value={visualization} onChange={(event) => setVisualization(event.target.value)} label={t('manifestation.visualizeLabel')} placeholder={t('manifestation.visualizePlaceholder')} className="min-h-36" />
          <p className="mt-3 text-xs leading-5 text-gray-500">{t('manifestation.visualizeHelp')}</p>
        </Card>
      </section>

      <Card>
        <div className="mb-5 flex items-start gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f5eddc] text-brand-slate"><Footprints className="h-5 w-5" /></span><div><p className="text-xs font-semibold uppercase tracking-wider text-brand-slate">{t('manifestation.step', { count: 3 })}</p><h2 className="mt-1 text-lg font-semibold">{t('manifestation.actionTitle')}</h2><p className="mt-1 text-sm text-gray-600">{t('manifestation.actionHelp')}</p></div></div>
        <div className="flex flex-col gap-2 sm:flex-row"><Input value={actionText} onChange={(event) => setActionText(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') addAction() }} placeholder={t('manifestation.actionPlaceholder')} className="flex-1" /><Button type="button" onClick={addAction} disabled={!actionText.trim() || actions.length >= 5}><Plus className="mr-2 h-4 w-4" />{t('manifestation.addAction')}</Button></div>
        <div className="mt-4 space-y-2">
          {actions.length === 0 ? <p className="rounded-button bg-[#f8faf8] p-4 text-center text-sm text-gray-500">{t('manifestation.noActions')}</p> : actions.map((action) => <div key={action.id} className="flex items-center gap-3 rounded-button border border-[#e1e8e4] bg-[#fdfdfb] p-3"><button type="button" onClick={() => setActions((current) => current.map((item) => item.id === action.id ? { ...item, done: !item.done } : item))} className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${action.done ? 'border-brand-slate bg-brand-slate text-white' : 'border-brand-sage text-transparent'}`} aria-label={t('manifestation.toggleAction')}><Check className="h-4 w-4" /></button><span className={`min-w-0 flex-1 break-words text-sm ${action.done ? 'text-gray-500 line-through' : ''}`}>{action.text}</span><button type="button" onClick={() => setActions((current) => current.filter((item) => item.id !== action.id))} className="grid h-9 w-9 place-items-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600" aria-label={t('manifestation.removeAction')}><Trash2 className="h-4 w-4" /></button></div>)}
        </div>
      </Card>

      <div className="flex flex-col items-center justify-between gap-3 rounded-card border border-[#e1e8e4] bg-white/70 p-4 sm:flex-row"><p className="text-sm text-gray-600">{saved ? t('manifestation.saved') : t('manifestation.privateNote')}</p><Button type="button" onClick={save}>{t('manifestation.save')}</Button></div>
    </div>
  )
}
