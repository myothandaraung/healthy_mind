import { NavLink } from 'react-router-dom'
import { BookHeart, Flower2, HeartHandshake, LayoutDashboard, LogOut, NotebookPen, Settings2, Sparkles } from 'lucide-react'
import { useAuth } from '@/features/auth'
import { useTranslation } from '@/i18n'

const ITEMS = [
  { to: '/dashboard', key: 'app.nav.dashboard', icon: LayoutDashboard },
  { to: '/mood', key: 'app.nav.mood', icon: Flower2 },
  { to: '/journal', key: 'app.nav.journal', icon: NotebookPen },
  { to: '/relax', key: 'app.nav.relax', icon: Sparkles },
  { to: '/wellness', key: 'app.nav.learn', icon: BookHeart },
  { to: '/settings', key: 'app.nav.settings', icon: Settings2 },
]

export default function DesktopNav() {
  const { t } = useTranslation()
  const { logout } = useAuth()
  return (
    <nav className="hidden md:flex fixed inset-y-0 left-0 z-20 w-64 flex-col overflow-hidden border-r border-white/10 bg-[linear-gradient(165deg,#123c36_0%,#102b27_58%,#172c32_100%)] text-white shadow-[16px_0_50px_-35px_rgba(16,43,39,0.8)]">
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/12 text-[#b8e2d4] ring-1 ring-white/15"><HeartHandshake size={22} /></span>
          <div><h2 className="text-xl font-bold tracking-tight">MindCare</h2><p className="max-w-36 truncate text-xs text-white/55">{t('app.tagline')}</p></div>
        </div>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-4">
        {ITEMS.map((item) => <NavLink key={item.key} to={item.to} className={({ isActive }) => `flex items-center gap-3 rounded-button px-4 py-3 text-sm transition-all ${isActive ? 'bg-white font-semibold text-brand-slate-dark shadow-lg' : 'text-white/65 hover:bg-white/10 hover:text-white'}`}><item.icon size={18} />{t(item.key)}</NavLink>)}
      </div>
      <div className="border-t border-white/10 p-4">
        <NavLink to="/get-help" className="mb-2 flex items-center gap-3 rounded-button bg-[#ffd9dc]/95 px-4 py-3 text-sm font-semibold text-[#7e3540] hover:bg-white"><HeartHandshake size={18} />{t('app.nav.getHelp')}</NavLink>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-button px-4 py-3 text-sm text-white/60 hover:bg-white/10 hover:text-white"><LogOut size={18} />{t('auth.signOut')}</button>
      </div>
    </nav>
  )
}
