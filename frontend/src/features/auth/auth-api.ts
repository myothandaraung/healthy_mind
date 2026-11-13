import { api } from '@/lib/api'

export const authApi = {
  register: (body: { email: string; password: string; display_name?: string; locale?: string; timezone?: string }) =>
    api.post<{ access_token: string; user: { id: string; email: string; name?: string } }>('/auth/register', body),
  login: (body: { email: string; password: string }) => api.post<{ access_token: string; user: { id: string; email: string; name?: string } }>('/auth/login', body),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (body: { email: string }) => api.post('/auth/forgot-password', body),
  me: () => api.get<{ user_id: string; display_name?: string; locale: string; timezone: string }>('/me'),
  updateMe: (body: { display_name?: string; locale?: string; timezone?: string }) =>
    api.patch('/me', body),
  preferences: () => api.get('/me/preferences'),
  updatePreferences: (body: { reminders_enabled?: boolean; notification_time?: string; hide_streaks?: boolean }) =>
    api.patch('/me/preferences', body),
  deleteAccount: () => api.del('/me'),
  requestExport: () => api.post('/me/data-exports'),
}
