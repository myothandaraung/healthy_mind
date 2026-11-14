import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth-provider'
import { authApi } from '../auth-api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useTranslation } from '@/i18n'

export default function LoginPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const data = await authApi.login({ email, password })
      login(data.access_token, { id: data.user.id, email: data.user.email, name: data.user.name })
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.message ?? t('errors.unknown'))
    }
  }

  return (
    <Card padding="lg" className="mx-auto w-full max-w-md border-[#dce6e2] bg-white/95 sm:p-10">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-slate">MindCare</p>
        <h2 className="text-3xl font-semibold">{t('auth.login')}</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">{t('auth.welcome')}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label={t('auth.email')} type="email" required onChange={(e) => setEmail(e.target.value)} />
        <Input label={t('auth.password')} type="password" required onChange={(e) => setPassword(e.target.value)} />
        <p className="text-right text-sm">
          <a href="/forgot-password" className="text-brand-slate hover:underline">
            {t('auth.forgotPassword')}
          </a>
        </p>
        <Button type="submit" className="w-full">{t('auth.login')}</Button>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <p className="text-sm text-center text-gray-600 mt-4">
          {t('auth.needAccount')} <a href="/register" className="text-brand-slate hover:underline font-medium">{t('auth.createAccount')}</a>
        </p>
      </form>
    </Card>
  )
}
