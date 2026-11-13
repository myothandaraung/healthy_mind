import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth-provider'
import { authApi } from '../auth-api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useTranslation } from '@/i18n'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { login } = useAuth()
  const [form, setForm] = useState({
    email: '',
    password: '',
    display_name: '',
    locale: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })
  const [error, setError] = useState('')
  const [ageConfirmed, setAgeConfirmed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!ageConfirmed) {
      setError('You must confirm you are 18 or older.')
      return
    }
    try {
      const data = await authApi.register({
        email: form.email,
        password: form.password,
        display_name: form.display_name || undefined,
        locale: form.locale,
        timezone: form.timezone,
      })
      if (data.access_token) {
        login(data.access_token, { id: data.user.id, email: data.user.email, name: data.user.name })
      }
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.message ?? t('errors.unknown'))
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-2">{t('auth.register')}</h2>
      <p className="text-sm text-gray-600 mb-6">{t('safety.notice')}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label={t('auth.email')} type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label={t('auth.password')} type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Input label={t('auth.displayName')} value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} />
        <div className="flex items-center gap-2">
          <input id="age" type="checkbox" checked={ageConfirmed} onChange={(e) => setAgeConfirmed(e.target.checked)} required />
          <Label htmlFor="age" className="text-sm">{t('auth.ageConfirm')}</Label>
        </div>
        <p className="text-xs text-gray-500">{t('common.optional')} - {t('common.language')} / {t('common.timezone')} set in Settings.</p>
        <Button type="submit" className="w-full">{t('auth.createAccount')}</Button>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <p className="text-sm text-center text-gray-600 mt-4">
          {t('auth.alreadyHaveAccount')} <a href="/login" className="text-brand-slate hover:underline font-medium">{t('auth.login')}</a>
        </p>
      </form>
    </Card>
  )
}
