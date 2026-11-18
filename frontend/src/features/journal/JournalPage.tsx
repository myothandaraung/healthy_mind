import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { journalApi } from './journal-api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatLocal } from '@/lib/date'
import { useTranslation } from '@/i18n'
import { CalendarPlus, Check, Clipboard, Download, Eraser, ListPlus, Sparkles, X } from 'lucide-react'

export default function JournalPage() {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState(false)
  const wordCount = body.trim() ? body.trim().split(/\s+/u).length : 0

  const appendToBody = (text: string) => {
    setCopied(false)
    setBody((current) => current ? `${current.trimEnd()}\n\n${text}` : text)
  }

  const copyEntry = async () => {
    await navigator.clipboard.writeText(body)
    setCopied(true)
  }

  const downloadEntry = () => {
    const content = title.trim() ? `${title.trim()}\n\n${body}` : body
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${title.trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'mindcare-journal'}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const closeEditor = () => {
    if (submitting) return
    setOpen(false)
    setEditingId(null)
  }

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeEditor()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, submitting])

  const { data: entries, isLoading, error } = useQuery({
    queryKey: journalApi.keys.list(),
    queryFn: journalApi.list,
  })

  const createMutation = useMutation({
    mutationFn: journalApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: journalApi.keys.list() })
      setOpen(false)
      setTitle('')
      setBody('')
      setTags('')
      setEditingId(null)
      setSubmitting(false)
    },
    onError: () => setSubmitting(false),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Parameters<typeof journalApi.update>[1] }) => journalApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: journalApi.keys.list() })
      setOpen(false)
      setEditingId(null)
      setTitle('')
      setBody('')
      setTags('')
      setSubmitting(false)
    },
    onError: () => setSubmitting(false),
  })

  const removeMutation = useMutation({
    mutationFn: journalApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: journalApi.keys.list() }),
  })

  if (isLoading) return <div className="py-10 text-center">{t('common.loading')}</div>
  if (error) return <div className="py-10 text-center text-red-600">{t('errors.network')}</div>

  const filteredEntries = (entries ?? []).filter((entry) => {
    const needle = search.trim().toLowerCase()
    return !needle || entry.title?.toLowerCase().includes(needle) || entry.body.toLowerCase().includes(needle) || entry.tags.some((tag) => tag.toLowerCase().includes(needle))
  })

  const editEntry = (entry: NonNullable<typeof entries>[number]) => {
    setEditingId(entry.id)
    setTitle(entry.title ?? '')
    setBody(entry.body)
    setTags(entry.tags.join(', '))
    setOpen(true)
  }

  const exportEntries = () => {
    const blob = new Blob([JSON.stringify(entries ?? [], null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `mindcare-journal-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">{t('journal.title')}</h2>
        <div className="flex flex-wrap gap-2"><Button variant="outline" onClick={exportEntries}>{t('settings.export')}</Button><Button onClick={() => { setEditingId(null); setTitle(''); setBody(''); setTags(''); setOpen(true) }}>{t('journal.newEntry')}</Button></div>
      </div>
      <p className="text-gray-600">{t('journal.subtitle')}</p>
      <Input label={t('journal.search')} value={search} onChange={(e) => setSearch(e.target.value)} />

      {entries?.length === 0 ? (
        <p className="text-gray-500 text-center py-10">{t('journal.empty')}</p>
      ) : (
        <div className="space-y-3">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} padding="sm" className="group cursor-pointer hover:border-brand-lavender/50 transition-colors" onClick={() => editEntry(entry)}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium truncate w-full">{entry.title ?? t('journal.editor')}</h3>
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); if (window.confirm(t('journal.confirmDelete'))) removeMutation.mutate(entry.id) }}>
                  {t('common.delete')}
                </Button>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">{entry.body}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <span>{formatLocal(entry.created_at, 'UTC', 'PPp')}</span>
                {entry.tags?.length && (
                  <span>{entry.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {open && (
        <div
          className="journal-editor-backdrop fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-slate-dark/40 px-2 pb-2 pt-6 backdrop-blur-sm sm:px-4 sm:pb-4 sm:pt-8"
          onMouseDown={(event) => { if (event.target === event.currentTarget) closeEditor() }}
        >
          <Card
            className="journal-editor-panel flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden p-0 shadow-[0_24px_70px_-28px_rgba(16,43,39,.65)] sm:max-h-[calc(100dvh-3rem)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="journal-editor-title"
          >
            <div className="journal-editor-header flex items-center justify-between border-b border-brand-sage/25 px-4 py-3 sm:px-5">
              <div>
                <h3 id="journal-editor-title" className="text-lg font-semibold">{t('journal.editor')}</h3>
                <p className="mt-0.5 text-xs text-gray-600">{t('journal.subtitle')}</p>
              </div>
              <button type="button" onClick={closeEditor} disabled={submitting} aria-label={t('common.cancel')} className="grid h-9 w-9 place-items-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-brand-slate disabled:opacity-50">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <form className="flex min-h-0 flex-1 flex-col" onSubmit={(e) => { e.preventDefault(); setSubmitting(true); const payload = { title: title || null, body, tags: tags.split(',').map((t) => t.trim()).filter(Boolean) }; editingId ? updateMutation.mutate({ id: editingId, body: payload }) : createMutation.mutate(payload) }}>
              <div className="journal-editor-content min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
                <Input autoFocus label={t('journal.titleLabel')} value={title} onChange={(e) => setTitle(e.target.value)} />
                <div>
                  <div className="mb-2 flex flex-wrap gap-1.5" aria-label={t('journal.writingTools')}>
                    <Button className="min-h-9 px-2.5" type="button" variant="outline" size="sm" onClick={() => appendToBody(t('journal.promptText'))}>
                      <Sparkles className="mr-1.5 h-4 w-4" aria-hidden="true" />{t('journal.addPrompt')}
                    </Button>
                    <Button className="min-h-9 px-2.5" type="button" variant="outline" size="sm" onClick={() => appendToBody(t('journal.checkInTemplate'))}>
                      <ListPlus className="mr-1.5 h-4 w-4" aria-hidden="true" />{t('journal.addTemplate')}
                    </Button>
                    <Button className="min-h-9 px-2.5" type="button" variant="outline" size="sm" onClick={() => appendToBody(new Intl.DateTimeFormat(i18n.resolvedLanguage, { dateStyle: 'long', timeStyle: 'short' }).format(new Date()))}>
                      <CalendarPlus className="mr-1.5 h-4 w-4" aria-hidden="true" />{t('journal.addDate')}
                    </Button>
                    <Button className="min-h-9 px-2.5" type="button" variant="ghost" size="sm" disabled={!body} onClick={copyEntry}>
                      {copied ? <Check className="mr-1.5 h-4 w-4" aria-hidden="true" /> : <Clipboard className="mr-1.5 h-4 w-4" aria-hidden="true" />}{copied ? t('journal.copied') : t('journal.copy')}
                    </Button>
                    <Button className="min-h-9 px-2.5" type="button" variant="ghost" size="sm" disabled={!body} onClick={downloadEntry}>
                      <Download className="mr-1.5 h-4 w-4" aria-hidden="true" />{t('journal.download')}
                    </Button>
                    <Button className="min-h-9 px-2.5" type="button" variant="ghost" size="sm" disabled={!body} onClick={() => { if (window.confirm(t('journal.clearConfirm'))) setBody('') }}>
                      <Eraser className="mr-1.5 h-4 w-4" aria-hidden="true" />{t('journal.clear')}
                    </Button>
                  </div>
                  <Textarea className="min-h-[210px] sm:min-h-[270px]" label={t('journal.bodyLabel')} value={body} onChange={(e) => { setBody(e.target.value); setCopied(false) }} required />
                  <p className="mt-2 text-right text-xs text-gray-500" aria-live="polite">{t('journal.counts', { words: wordCount, characters: body.length })}</p>
                </div>
                <Input label={t('journal.tagsLabel')} placeholder={t('journal.tagsPlaceholder')} value={tags} onChange={(e) => setTags(e.target.value)} />
                {(createMutation.isError || updateMutation.isError) && <p className="text-sm text-red-600" role="alert">{t('errors.validation')}</p>}
              </div>
              <div className="journal-editor-footer flex justify-end gap-2 border-t border-brand-sage/25 bg-white/80 px-4 py-3 sm:px-5">
                <Button type="button" variant="ghost" disabled={submitting} onClick={closeEditor}>{t('common.cancel')}</Button>
                <Button type="submit" disabled={submitting || !body.trim()}>{submitting ? t('common.loading') : t('journal.save')}</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
