import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import DesktopNav from './desktop-nav'
import MobileNav from './mobile-nav'
import { useTranslation } from '@/i18n'
import { ArrowLeft } from 'lucide-react'

const PUBLIC_PATHS = ['/login', '/register', '/forgot-password', '/get-help', '/relax', '/wellness']

export default function Shell() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isAuthenticated, isLoading } = useAuth()
  const isPublic = PUBLIC_PATHS.includes(location.pathname) || location.pathname === '/'

  if (isLoading) return <div className="py-10 text-center">{t('common.loading')}</div>
  if (!isPublic && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  const showAppNavigation = isAuthenticated && !['/', '/login', '/register', '/forgot-password'].includes(location.pathname)
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname)
  const showBackButton = location.pathname !== '/'
  const goBack = () => {
    if (location.pathname === '/login' || location.key === 'default') navigate('/')
    else navigate(-1)
  }

  const backButton = showBackButton ? (
    <div className="px-4 pt-4 max-w-6xl mx-auto w-full">
      <button
        type="button"
        onClick={goBack}
        className="inline-flex min-h-11 items-center gap-2 rounded-button px-3 py-2 text-sm font-medium text-brand-slate hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-slate"
        aria-label={t('common.back')}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span>{t('common.back')}</span>
      </button>
    </div>
  ) : null

  return (
    <div className="flex flex-col min-h-screen text-brand-slate-dark">
      {showAppNavigation ? (
        <>
          <DesktopNav />
          <main className="min-w-0 flex-1 overflow-x-hidden pb-28 lg:pb-10 lg:pl-64">
            {backButton}
            <Outlet />
          </main>
          <MobileNav />
        </>
      ) : (
        <main className="min-h-0 flex-1">
          {backButton}
          {isAuthPage ? (
            <div className="mx-auto grid min-h-[calc(100vh-92px)] max-w-6xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,.9fr)_minmax(420px,.7fr)] lg:py-12">
              <section className="hidden max-w-xl lg:block" aria-hidden="true">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-sage/35 bg-white/70 px-4 py-2 text-sm font-medium text-brand-slate shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-brand-slate" /> MindCare
                </div>
                <h1 className="text-5xl font-semibold leading-[1.08]">{t('app.tagline')}</h1>
                <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">{t('safety.notice')}</p>
                <div className="mt-10 h-2 w-32 rounded-full bg-gradient-to-r from-brand-sage to-brand-lavender" />
              </section>
              <Outlet />
            </div>
          ) : <Outlet />}
        </main>
      )}
    </div>
  )
}
