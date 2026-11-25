import { NavLink } from 'react-router-dom'
import { BarChart3, BookHeart, Flower2, HeartHandshake, Languages, LayoutDashboard, Library, ListChecks, LogOut, NotebookPen, Settings2, Sparkles, WandSparkles } from 'lucide-react'
import { useAuth } from '@/features/auth'
import { useTranslation } from '@/i18n'

const ITEMS = [
  { to: '/dashboard', key: 'app.nav.dashboard', icon: LayoutDashboard },
  { to: '/mood', key: 'app.nav.mood', icon: Flower2 },
  { to: '/journal', key: 'app.nav.journal', icon: NotebookPen },
  { to: '/goals', key: 'app.nav.goals', icon: ListChecks },
  { to: '/relax', key: 'app.nav.relax', icon: Sparkles },
  { to: '/manifestation', key: 'app.nav.manifestation', icon: WandSparkles },
  { to: '/wellness', key: 'app.nav.learn', icon: BookHeart },
  { to: '/recommendations', key: 'recommendations.title', icon: Library },
  { to: '/progress', key: 'app.nav.progress', icon: BarChart3 },
  { to: '/language', key: 'app.nav.language', icon: Languages },
  { to: '/settings', key: 'app.nav.settings', icon: Settings2 },
]

export default function DesktopNav() {
  const { t } = useTranslation()
  const { logout } = useAuth()
  return (
    <nav className="desktop-sidebar fixed inset-y-0 left-0 z-20 hidden w-64 flex-col overflow-hidden text-brand-slate-dark lg:flex">
      <div className="desktop-sidebar__brand border-b p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-slate text-white shadow-sm"><HeartHandshake size={22} /></span>
          <div><h2 className="text-xl font-bold tracking-tight">MindCare</h2><p className="max-w-36 truncate text-xs text-gray-500">{t('app.tagline')}</p></div>
        </div>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-4">
        {ITEMS.map((item) => <NavLink key={item.key} to={item.to} className={({ isActive }) => `desktop-sidebar__link flex items-center gap-3 rounded-button px-4 py-3 text-sm transition-all ${isActive ? 'is-active font-semibold text-brand-slate' : 'text-gray-600'}`}><item.icon size={18} />{t(item.key)}</NavLink>)}
      </div>
      <div className="desktop-sidebar__footer border-t p-4">
        <NavLink to="/get-help" className="mb-2 flex items-center gap-3 rounded-button border border-[#efcfd1] bg-[#fff2f1] px-4 py-3 text-sm font-semibold text-[#8b4650] hover:bg-[#fce7e6]"><HeartHandshake size={18} />{t('app.nav.getHelp')}</NavLink>
        <button onClick={logout} className="desktop-sidebar__link flex w-full items-center gap-3 rounded-button px-4 py-3 text-sm text-gray-500"><LogOut size={18} />{t('auth.logout')}</button>
      </div>
    </nav>
  )
}
