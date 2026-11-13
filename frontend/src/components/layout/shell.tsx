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
  const showBackButton = location.pathname !== '/'
  const goBack = () => {
    if (location.key === 'default') navigate('/')
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
          <main className="flex-1 pb-28 md:pb-10 md:pl-64 overflow-x-auto">
            {backButton}
            <Outlet />
          </main>
          <MobileNav />
        </>
      ) : (
        <main className="flex-1 min-h-0">
          {backButton}
          <Outlet />
        </main>
      )}
    </div>
  )
}
