import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { setAccessToken } from '@/lib/api'

const TOKEN_STORAGE_KEY = 'mindcare.access_token'

export interface AuthState {
  user: { id: string; email?: string; name?: string } | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (token: string, user: { id: string; email?: string; name?: string }) => void
  logout: () => void
  setToken: (token: string | null) => void
}

const AuthContext = createContext<AuthState | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY))
  const [user, setUser] = useState<{ id: string; email?: string; name?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setAccessToken(token)
    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token)
    else localStorage.removeItem(TOKEN_STORAGE_KEY)
    if (token) {
      // decode JWT payload to get user id without a server round-trip
      try {
        const payload = JSON.parse(atob(token.split('.')[1] ?? ''))
        setUser({ id: payload.sub ?? payload.user_id ?? '', email: payload.email, name: payload.name })
      } catch {
        setUser(null)
      }
    }
    setIsLoading(false)
  }, [token])

  const login = useCallback((t: string, u: { id: string; email?: string; name?: string }) => {
    setTokenState(t)
    setAccessToken(t)
    localStorage.setItem(TOKEN_STORAGE_KEY, t)
    setUser(u)
  }, [])

  const logout = useCallback(() => {
    setTokenState(null)
    setAccessToken(null)
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    setUser(null)
  }, [])

  const setToken = useCallback((t: string | null) => {
    setTokenState(t)
    setAccessToken(t)
    if (t) localStorage.setItem(TOKEN_STORAGE_KEY, t)
    else localStorage.removeItem(TOKEN_STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        logout,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
