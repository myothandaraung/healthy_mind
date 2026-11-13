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
    <Card className="w-full max-w-md mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-2">{t('auth.login')}</h2>
      <p className="text-sm text-gray-600 mb-6">{t('auth.welcome')}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
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
