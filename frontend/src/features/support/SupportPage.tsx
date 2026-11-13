import { useState } from 'react'
import { supportApi } from './support-api'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useTranslation } from '@/i18n'

const COUNTRIES = [
  { code: 'JP', label: 'Japan', locales: ['ja', 'en'] },
  { code: 'MM', label: 'Myanmar', locales: ['my', 'en'] },
  { code: 'US', label: 'United States', locales: ['en'] },
  { code: 'GB', label: 'United Kingdom', locales: ['en'] },
]

export default function SupportPage() {
  const { t } = useTranslation()
  const [country, setCountry] = useState('JP')
  const [locale, setLocale] = useState('ja')
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await supportApi.list(country, locale)
      setResources(data)
    } catch {
      setError(t('errors.network'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-semibold">{t('support.title')}</h1>
      <p className="text-gray-600">{t('support.subtitle')}</p>

      <Card padding="md">
        <p className="text-sm text-gray-600 mb-4">{t('safety.notice')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Label>{t('support.country')}</Label>
          <select
            value={country}
            onChange={(e) => { setCountry(e.target.value); setLocale(COUNTRIES.find((c) => c.code === e.target.value)?.locales[0] || 'en'); load() }}
            className="block w-full border border-gray-300 rounded-button bg-white px-3 py-2 text-sm"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
          <Label>{t('common.language')}</Label>
          <select
            value={locale}
            onChange={(e) => { setLocale(e.target.value); load() }}
            className="block w-full border border-gray-300 rounded-button bg-white px-3 py-2 text-sm"
          >
            {COUNTRIES.find((c) => c.code === country)?.locales.map((l) => (
              <option key={l} value={l}>{l.toUpperCase()}</option>
            ))}
          </select>
          <div className="flex items-end">
            <Button onClick={load} disabled={loading} className="w-full">
              {loading ? t('common.loading') : t('support.refresh')}
            </Button>
          </div>
        </div>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      </Card>

      <Card padding="md">
        <h2 className="text-lg font-semibold mb-4">{t('support.emergency')}</h2>
        {resources.length === 0 ? (
          <p className="text-gray-500">{t('support.empty')}</p>
        ) : (
          <div className="space-y-3">
            {resources.map((r) => (
              <div key={r.id} className="p-3 rounded-button border border-gray-200 bg-white flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.resource_type}</div>
                  {r.phone && <div className="text-sm">{r.phone}</div>}
                </div>
                <div className="flex gap-2">
                  {r.contact_url && (
                    <a href={r.contact_url} target="_blank" rel="noopener" className="text-xs text-brand-slate hover:underline">
                      {t('support.visitWebsite')}
                    </a>
                  )}
                  {r.phone && (
                    <a href={`tel:${r.phone}`} className="text-xs text-brand-slate hover:underline">
                      {t('support.callNow')}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-gray-500 mt-4">{t('support.disclaimer')}</p>
      </Card>
    </div>
  )
}
