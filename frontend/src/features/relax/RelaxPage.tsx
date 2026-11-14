import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from '@/i18n'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const PHASES = ['inhale', 'hold', 'exhale', 'hold'] as const

export default function RelaxPage() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'breathing' | 'grounding'>('breathing')
  const [pace, setPace] = useState(5) // seconds per full breath cycle segment
  const [running, setRunning] = useState(false)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(pace)
  const [groundingDone, setGroundingDone] = useState<string[]>([])
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (!running) return
    const update = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      setPhaseIndex(Math.floor(elapsed / pace) % PHASES.length)
      setTimeLeft(Math.max(1, Math.ceil(pace - (elapsed % pace))))
    }
    update()
    const timer = window.setInterval(update, 100)
    return () => window.clearInterval(timer)
  }, [running, pace])

  const toggle = useCallback(() => {
    setRunning((r) => {
      if (!r) startTimeRef.current = Date.now()
      return !r
    })
  }, [])

  const stop = useCallback(() => {
    setRunning(false)
    setPhaseIndex(0)
    setTimeLeft(pace)
    startTimeRef.current = 0
  }, [pace])

  const phase = PHASES[phaseIndex % PHASES.length]
  const groundingComplete = groundingDone.length === 5

  const phaseProgress = running ? (pace - timeLeft) / pace : 0
  const scale = running
    ? (phase === 'inhale' ? 1 + phaseProgress * 0.6 : phase === 'exhale' ? 1.6 - phaseProgress * 0.6 : phaseIndex === 1 ? 1.6 : 1)
    : 1

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-6 sm:px-6">
      <h2 className="text-xl font-semibold">{t('relax.title')}</h2>
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        <Button
          variant={tab === 'breathing' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setTab('breathing')}
        >
          {t('relax.breathing')}
        </Button>
        <Button
          variant={tab === 'grounding' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setTab('grounding')}
        >
          {t('relax.grounding')}
        </Button>
      </div>

      {tab === 'breathing' ? (
        <Card className="p-6 text-center">
          <p className="text-sm text-gray-600 mb-6">{t('relax.safetyNote')}</p>
          <div className="relative w-48 h-48 mx-auto mb-6">
            <div
              className="absolute inset-0 flex items-center justify-center animate-pulse"
              style={{ opacity: 0.15 }}
            >
              <div className="w-full h-full rounded-full border-2 border-brand-slate" />
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
              style={{
                transform: `scale(${scale})`,
                opacity: running ? 0.6 : 0.3,
              }}
            >
              <div className="w-32 h-32 rounded-full bg-brand-lavender/60 backdrop-blur-sm" />
            </div>
          </div>
          <div className="text-4xl font-mono font-bold mb-2">{timeLeft}</div>
          <div className="text-sm text-brand-slate-dark capitalize">{phase}</div>
          <div className="flex gap-2 justify-center mt-6">
            <Button onClick={toggle} className="flex-1" disabled={!running ? false : false}>
              {running ? t('relax.pause') : t('relax.start')}
            </Button>
            <Button variant="danger" onClick={stop} size="sm">{t('relax.stop')}</Button>
          </div>
          <div className="mt-6">
            <Label>{t('relax.pace')}</Label>
            <Input type="number" min="2" max="12" value={pace} onChange={(e) => setPace(Math.max(2, Math.min(12, Number(e.target.value) || 2)))} />
            <div className="mt-3 flex flex-wrap justify-center gap-2" aria-label={t('relax.pacePresets')}>
              {[3, 5, 7].map((seconds) => (
                <Button key={seconds} type="button" size="sm" variant={pace === seconds ? 'primary' : 'outline'} onClick={() => { setPace(seconds); setRunning(false); setPhaseIndex(0); setTimeLeft(seconds); startTimeRef.current = 0 }}>
                  {t('relax.seconds', { count: seconds })}
                </Button>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">{t('relax.safetyNote').slice(0, 40)}…</p>
        </Card>
      ) : (
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-4">{t('relax.safetyNote')}</p>
          <ol className="space-y-4 text-sm">
            {['1', '2', '3', '4', '5'].map((n) => (
              <li key={n} className={`flex items-start gap-3 p-3 rounded-button border transition-colors ${groundingDone.includes(n) ? 'border-brand-sage bg-brand-sage/20' : 'border-gray-200 bg-white'}`}>
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-brand-slate"
                  checked={groundingDone.includes(n)}
                  onChange={() => setGroundingDone((current) => current.includes(n) ? current.filter((item) => item !== n) : [...current, n])}
                  aria-label={t('relax.markStep', { step: n })}
                />
                <Badge>{n}</Badge>
                <p className="text-gray-700">{t(`relax.steps.${n}` as any)}</p>
              </li>
            ))}
          </ol>
          {groundingComplete && <p className="mt-4 rounded-button bg-brand-sage/20 p-3 text-sm font-medium text-brand-slate" role="status">{t('relax.groundingComplete')}</p>}
          <div className="mt-6 flex gap-2">
            <Button variant="outline" onClick={() => setTab('breathing')}>{t('relax.breathing')}</Button>
            <Button variant="ghost" disabled={!groundingDone.length} onClick={() => setGroundingDone([])}>{t('relax.resetGrounding')}</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
