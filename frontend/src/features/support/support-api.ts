import { api } from '@/lib/api'
import type { SupportResource } from '@/types'

export const supportApi = {
  keys: {
    list: (country?: string, locale?: string) => ['support', country, locale],
  },
  list: (country = 'JP', locale = 'ja') =>
    api.get<SupportResource[]>(`/support-resources?country=${country}&locale=${locale}`),
}
