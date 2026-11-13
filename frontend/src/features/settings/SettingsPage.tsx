import { useEffect, useState } from 'react'
import { useTranslation } from '@/i18n'
import i18n from '@/i18n'
import { useAuth } from '@/features/auth'
import { authApi } from '@/features/auth/auth-api'
import { LOCALES, LOCALE_NATIVE_LABELS } from '@/i18n'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function SettingsPage() {
  const { t } = useTranslation()
  const { logout } = useAuth()
  const [locale, setLocale] = useState('en')
  const [reminders, setReminders] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([authApi.me(), authApi.preferences()])
      .then(([profile, preferences]: any[]) => {
        setLocale(profile.locale ?? 'en')
        setReminders(Boolean(preferences.reminders_enabled))
      })
      .catch(() => setError(t('errors.network')))
  }, [t])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')
    try {
      await authApi.updateMe({ locale })
      await authApi.updatePreferences({ reminders_enabled: reminders })
      await i18n.changeLanguage(locale)
      setMessage(t('common.save'))
    } catch {
      setError(t('errors.network'))
    } finally {
      setSaving(false)
    }
  }

  const requestExport = async () => {
    setMessage('')
    setError('')
    try {
      await authApi.requestExport()
      setMessage(t('settings.exportDesc'))
    } catch {
      setError(t('errors.network'))
    }
  }

  const requestDeletion = async () => {
    if (!window.confirm(t('settings.deleteDesc'))) return
    setMessage('')
    setError('')
    try {
      await authApi.deleteAccount()
      logout()
    } catch {
      setError(t('errors.network'))
    }
  }

  return (
    <div className="max-w-md mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-semibold">{t('settings.title')}</h1>
      <form onSubmit={handleSave} className="space-y-6">
        <Card padding="md">
          <h2 className="text-lg font-semibold mb-4">{t('settings.profile')}</h2>
          <div className="mb-4">
            <label className="text-sm font-medium text-brand-slate-dark">{t('settings.language')}</label>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className="block w-full border border-gray-300 rounded-button bg-white px-3 py-2 text-sm"
            >
              {LOCALES.map((l) => (
                <option key={l} value={l}>
                  {LOCALE_NATIVE_LABELS[l as keyof typeof LOCALE_NATIVE_LABELS]}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-gray-500">{t('settings.timezoneHelp')}</p>
        </Card>

        <Card padding="md">
          <h2 className="text-lg font-semibold mb-4">{t('settings.reminders')}</h2>
          <div className="flex items-center gap-2">
            <input id="reminders" type="checkbox" checked={reminders} onChange={(e) => setReminders(e.target.checked)} />
            <label htmlFor="reminders" className="text-sm text-brand-slate-dark">{t('settings.remindersDesc')}</label>
          </div>
          <p className="text-xs text-gray-500">{t('settings.remindersOff')}</p>
        </Card>

        <Card padding="md">
          <h2 className="text-lg font-semibold mb-4">{t('settings.privacy')}</h2>
          <Button type="button" variant="outline" className="w-full" onClick={requestExport}>
            {t('settings.export')}
          </Button>
          <p className="text-xs text-gray-500">{t('settings.exportDesc')}</p>
          <Button type="button" variant="danger" className="w-full mt-3" onClick={requestDeletion}>
            {t('settings.delete')}
          </Button>
          <p className="text-xs text-gray-500">{t('settings.deleteDesc')}</p>
        </Card>

        <div className="flex items-center gap-2 pt-4">
          <input id="consent" type="checkbox" checked={true} readOnly />
          <label htmlFor="consent" className="text-sm">{t('settings.consent')}</label>
        </div>
        <Button type="submit" className="w-full" disabled={saving}>
          {saving ? t('common.loading') : t('common.save')}
        </Button>
        {message && <p className="text-sm text-green-700" role="status">{message}</p>}
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      </form>

      <Button variant="ghost" className="w-full text-red-600" onClick={logout}>
        {t('auth.signOut')}
      </Button>
    </div>
  )
}
