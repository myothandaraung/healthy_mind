import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { moodApi } from './mood-api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { MoodButton } from '@/components/ui/mood-button'
import { Badge } from '@/components/ui/badge'
import { formatLocal, relativeFromNow } from '@/lib/date'
import { useTranslation } from '@/i18n'
import { useAuth } from '@/features/auth'
import type { MoodEntry } from '@/types'

function toDateTimeLocal(iso: string): string {
  const date = new Date(iso)
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

function localDateTimeToIso(value: string): string {
  return new Date(value).toISOString()
}

export default function MoodPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [moodLevel, setMoodLevel] = useState<number | null>(null)
  const [emotionTags, setEmotionTags] = useState('')
  const [note, setNote] = useState('')
  const [occurredAt, setOccurredAt] = useState(() => toDateTimeLocal(new Date().toISOString()))
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [status, setStatus] = useState('')

  const { data: moods, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: moodApi.keys.list(),
    queryFn: () => moodApi.list(),
    enabled: !!user,
  })

  const createMutation = useMutation({
    mutationFn: moodApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: moodApi.keys.list() })
      queryClient.invalidateQueries({ queryKey: moodApi.keys.summary('week') })
      setMoodLevel(null)
      setEmotionTags('')
      setNote('')
      setOccurredAt(toDateTimeLocal(new Date().toISOString()))
      setSubmitting(false)
      setStatus(t('mood.saved'))
    },
    onError: () => setSubmitting(false),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Parameters<typeof moodApi.update>[1] }) => moodApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: moodApi.keys.list() })
      queryClient.invalidateQueries({ queryKey: moodApi.keys.summary('week') })
      resetForm()
      setStatus(t('mood.saved'))
    },
    onError: () => setSubmitting(false),
  })

  const removeMutation = useMutation({
    mutationFn: moodApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: moodApi.keys.list() })
      queryClient.invalidateQueries({ queryKey: moodApi.keys.summary('week') })
      setStatus(t('common.success'))
    },
  })

  const resetForm = () => {
    setEditingId(null)
    setMoodLevel(null)
    setEmotionTags('')
    setNote('')
    setOccurredAt(toDateTimeLocal(new Date().toISOString()))
    setSubmitting(false)
  }

  const editEntry = (entry: MoodEntry) => {
    setEditingId(entry.id)
    setMoodLevel(entry.mood_level)
    setEmotionTags(entry.emotion_tags.join(', '))
    setNote(entry.note ?? '')
    setOccurredAt(toDateTimeLocal(entry.occurred_at))
    setStatus('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!moodLevel) return
    setSubmitting(true)
    const body = {
      mood_level: moodLevel,
      emotion_tags: emotionTags.split(',').map((tag) => tag.trim()).filter(Boolean),
      note: note || null,
      occurred_at: localDateTimeToIso(occurredAt),
    }
    if (editingId) updateMutation.mutate({ id: editingId, body })
    else createMutation.mutate(body)
  }

  const LEVELS = [
    { value: 1, key: 'mood.levels.1' },
    { value: 2, key: 'mood.levels.2' },
    { value: 3, key: 'mood.levels.3' },
    { value: 4, key: 'mood.levels.4' },
    { value: 5, key: 'mood.levels.5' },
  ]

  if (isLoading) return <div className="py-10 text-center">{t('common.loading')}</div>
  if (error) return <div className="py-10 text-center text-red-600">{t('errors.network')}</div>

  const entries = moods ?? []

  const exportMoodHistory = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `mindcare-moods-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
      <Card>
        <h2 className="text-xl font-semibold mb-2">{t('mood.title')}</h2>
        <p className="text-gray-600 mb-6">{t('mood.subtitle')}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {LEVELS.map((l) => (
              <MoodButton
                key={l.value}
                value={l.value}
                label={t(l.key)}
                selected={moodLevel === l.value}
                onSelect={setMoodLevel}
                ariaLabel={t(l.key)}
              />
            ))}
          </div>
          <Input
            label={t('mood.emotions')}
            placeholder={t('mood.emotionsPlaceholder')}
            value={emotionTags}
            onChange={(e) => setEmotionTags(e.target.value)}
          />
          <Textarea
            label={t('mood.note')}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            helper={t('mood.privateNote')}
          />
          <label className="text-sm font-medium text-brand-slate-dark">{t('common.required')}</label>
          <input
            type="datetime-local"
            required
            value={occurredAt}
            onChange={(e) => setOccurredAt(e.target.value)}
            className="block min-h-12 w-full rounded-button border border-[#d6e0dc] bg-[#fdfdfb] px-4 py-3 text-sm focus:border-brand-slate focus:outline-none focus:ring-4 focus:ring-brand-sage/20"
          />
          <Button type="submit" className="w-full" disabled={submitting || !moodLevel}>
            {submitting ? t('common.loading') : editingId ? t('common.save') : t('mood.save')}
          </Button>
          {editingId && <Button type="button" variant="ghost" className="w-full" onClick={resetForm}>{t('common.cancel')}</Button>}
        </form>
        {status && <p className="text-sm text-green-700 mt-3" role="status">{status}</p>}
        {(createMutation.isError || updateMutation.isError || removeMutation.isError) && (
          <p className="text-sm text-red-600 mt-3" role="alert">
            {t('errors.validation')}
          </p>
        )}
      </Card>

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold">{t('mood.history')}</h2>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="ghost" disabled={isFetching} onClick={() => refetch()}>{isFetching ? t('common.loading') : t('mood.refresh')}</Button>
            <Button size="sm" variant="outline" disabled={!entries.length} onClick={exportMoodHistory}>{t('mood.export')}</Button>
          </div>
        </div>
        {entries.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{t('mood.empty')}</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {entries.map((entry) => (
              <li key={entry.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="font-medium">{formatLocal(entry.occurred_at, 'UTC', 'PPP p')}</span>
                  <p className="text-sm text-gray-600">{relativeFromNow(entry.occurred_at)}</p>
                  {entry.note && <p className="text-sm text-gray-700 mt-1 break-words">{entry.note}</p>}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default">{t(LEVELS.find((l) => l.value === entry.mood_level)?.key ?? String(entry.mood_level))}</Badge>
                  {entry.emotion_tags.length > 0 && (
                    <span className="text-xs text-gray-500 truncate max-w-xs">{entry.emotion_tags.join(', ')}</span>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => editEntry(entry)}>{t('common.edit')}</Button>
                  <Button size="sm" variant="danger" disabled={removeMutation.isPending} onClick={() => window.confirm(t('mood.confirmDelete')) && removeMutation.mutate(entry.id)}>{t('common.delete')}</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
