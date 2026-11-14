import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useAuth } from '@/features/auth'
import { useTranslation } from '@/i18n'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type GentleGoal = { id: string; text: string; completed: boolean }

export default function GentleGoalsPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const storageKey = `mindcare-gentle-goals:${user?.id}`
  const today = new Date().toISOString().slice(0, 10)
  const [goalText, setGoalText] = useState('')
  const [goals, setGoals] = useState<GentleGoal[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null') as { date?: string; goals?: GentleGoal[] } | null
      if (!saved?.goals) return []
      return saved.date === today ? saved.goals : saved.goals.map((goal) => ({ ...goal, completed: false }))
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ date: today, goals }))
  }, [goals, storageKey, today])

  const addGoal = (event: React.FormEvent) => {
    event.preventDefault()
    const text = goalText.trim()
    if (!text || goals.length >= 5) return
    setGoals((current) => [...current, { id: crypto.randomUUID(), text, completed: false }])
    setGoalText('')
  }

  const completedCount = goals.filter((goal) => goal.completed).length

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <header>
        <p className="text-sm font-medium text-brand-slate">{t('dashboard.goalsSub')}</p>
        <h1 className="mt-1 text-3xl font-semibold">{t('dashboard.goals')}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">{t('dashboard.goalsIntro')}</p>
      </header>

      <Card padding="lg">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div><h2 className="text-lg font-semibold">{t('dashboard.todayGoals')}</h2><p className="mt-1 text-sm text-gray-600">{t('dashboard.goalsLimit')}</p></div>
          <span className="rounded-full bg-[#e7f0ec] px-3 py-1 text-xs font-semibold text-brand-slate">{t('dashboard.goalsProgress', { completed: completedCount, total: goals.length })}</span>
        </div>

        <form onSubmit={addGoal} className="flex flex-col gap-2 sm:flex-row">
          <Input className="flex-1" aria-label={t('dashboard.goalPlaceholder')} placeholder={t('dashboard.goalPlaceholder')} value={goalText} maxLength={80} onChange={(event) => setGoalText(event.target.value)} />
          <Button type="submit" disabled={!goalText.trim() || goals.length >= 5}><Plus className="mr-1.5 h-4 w-4" aria-hidden="true" />{t('dashboard.addGoal')}</Button>
        </form>

        {goals.length === 0 ? <p className="py-10 text-center text-sm text-gray-500">{t('dashboard.goalsEmpty')}</p> : (
          <ul className="mt-5 space-y-3">
            {goals.map((goal) => (
              <li key={goal.id} className="flex items-center gap-3 rounded-button border border-[#e1e8e4] bg-[#fdfdfb] p-3 sm:p-4">
                <input type="checkbox" className="h-5 w-5 shrink-0 accent-brand-slate" checked={goal.completed} onChange={() => setGoals((current) => current.map((item) => item.id === goal.id ? { ...item, completed: !item.completed } : item))} aria-label={goal.text} />
                <span className={`min-w-0 flex-1 break-words text-sm ${goal.completed ? 'text-gray-400 line-through' : 'text-brand-slate-dark'}`}>{goal.text}</span>
                <button type="button" onClick={() => setGoals((current) => current.filter((item) => item.id !== goal.id))} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600" aria-label={t('dashboard.removeGoal')}><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
              </li>
            ))}
          </ul>
        )}

        {goals.some((goal) => goal.completed) && <div className="mt-4 flex justify-end"><Button type="button" size="sm" variant="ghost" onClick={() => setGoals((current) => current.filter((goal) => !goal.completed))}>{t('dashboard.clearCompleted')}</Button></div>}
      </Card>
    </div>
  )
}
