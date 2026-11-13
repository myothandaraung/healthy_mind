import { api } from '@/lib/api'
import type { JournalEntry, JournalEntryInput } from '@/types'

export const journalApi = {
  keys: {
    list: () => ['journals'],
    detail: (id: string) => ['journals', id],
  },
  list: () => api.get<JournalEntry[]>('/journals'),
  create: (body: JournalEntryInput) => api.post<JournalEntry>('/journals', body),
  get: (id: string) => api.get<JournalEntry>(`/journals/${id}`),
  update: (id: string, body: Partial<JournalEntryInput>) => api.patch<JournalEntry>(`/journals/${id}`, body),
  remove: (id: string) => api.del<void>(`/journals/${id}`),
}
