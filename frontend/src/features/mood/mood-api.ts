import { api } from '@/lib/api'
import type { MoodEntry, MoodEntryInput } from '@/types'

export const moodApi = {
  keys: {
    list: () => ['moods'],
    summary: (period: string) => ['moods', 'summary', period],
  },
  list: (params?: { from?: string; to?: string }) =>
    api.get<MoodEntry[]>(`/moods${params ? '?' + new URLSearchParams(params as any).toString() : ''}`),
  create: (body: MoodEntryInput) => api.post<MoodEntry>('/moods', body),
  update: (id: string, body: Partial<MoodEntryInput>) => api.patch<MoodEntry>(`/moods/${id}`, body),
  remove: (id: string) => api.del<void>(`/moods/${id}`),
  summary: (period = 'week') => api.get<{ period: string; entries: MoodEntry[] }>(`/moods/summary?period=${period}`),
}
