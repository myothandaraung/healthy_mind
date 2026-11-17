const API_BASE = import.meta.env.VITE_API_BASE ?? '/api/v1'

let accessToken: string | null = null
let pendingRequests = 0
const loadingListeners = new Set<(isLoading: boolean) => void>()

function updatePendingRequests(change: number) {
  pendingRequests = Math.max(0, pendingRequests + change)
  const isLoading = pendingRequests > 0
  loadingListeners.forEach((listener) => listener(isLoading))
}

export function subscribeToApiLoading(listener: (isLoading: boolean) => void) {
  loadingListeners.add(listener)
  listener(pendingRequests > 0)
  return () => {
    loadingListeners.delete(listener)
  }
}

export function setAccessToken(token: string | null) {
  accessToken = token
}

export function getAccessToken(): string | null {
  return accessToken
}

class ApiError extends Error {
  readonly status: number
  readonly code: string
  constructor(status: number, code: string, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

async function request<T>(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string>),
  }
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`

  updatePendingRequests(1)
  try {
    const res = await fetch(`${API_BASE}${input}`, {
      ...init,
      headers,
      credentials: 'include',
    })

    if (!res.ok) {
      let code = 'unknown'
      let message = 'Request failed'
      try {
        const body = (await res.json()) as { code?: string; message?: string }
        code = body.code ?? code
        message = body.message ?? message
      } catch {}
      throw new ApiError(res.status, code, message)
    }

    if (res.status === 204) return undefined as T
    return await res.json()
  } finally {
    updatePendingRequests(-1)
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}

export { ApiError }

export const queryKeys = {
  me: ['me'],
  preferences: ['preferences'],
  moods: (from?: string, to?: string) => ['moods', from, to],
  moodSummary: (period: string) => ['moods', 'summary', period],
  journals: ['journals'],
  journal: (id: string) => ['journals', id],
  activities: ['activities'],
  support: (country?: string, locale?: string) => ['support', country, locale],
} as const
