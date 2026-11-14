import { useState } from 'react'
import { authApi } from '../auth-api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useTranslation } from '@/i18n'

export default function ForgotPasswordPage() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await authApi.forgotPassword({ email })
      setSent(true)
    } catch (err: any) {
      setError(err?.message ?? t('errors.unknown'))
    }
  }

  if (sent) {
    return (
      <Card padding="lg" className="mx-auto w-full max-w-md border-[#dce6e2] bg-white/95 text-center sm:p-10">
        <h2 className="text-2xl font-semibold mb-2">{t('common.success')}</h2>
        <p className="text-sm text-gray-600 mb-6">{t('auth.recoverySent')}</p>
        <Button asChild>
          <a href="/login">{t('auth.login')}</a>
        </Button>
      </Card>
    )
  }

  return (
    <Card padding="lg" className="mx-auto w-full max-w-md border-[#dce6e2] bg-white/95 sm:p-10">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-slate">MindCare</p>
        <h2 className="text-3xl font-semibold">{t('auth.forgotPassword')}</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">{t('auth.recoveryIntro')}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label={t('auth.email')} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" className="w-full">{t('auth.sendRecovery')}</Button>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      </form>
    </Card>
  )
}
