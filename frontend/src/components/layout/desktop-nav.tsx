import { NavLink } from 'react-router-dom'
import { BookHeart, Flower2, HeartHandshake, LayoutDashboard, ListChecks, LogOut, NotebookPen, Settings2, Sparkles } from 'lucide-react'
import { useAuth } from '@/features/auth'
import { useTranslation } from '@/i18n'

const ITEMS = [
  { to: '/dashboard', key: 'app.nav.dashboard', icon: LayoutDashboard },
  { to: '/mood', key: 'app.nav.mood', icon: Flower2 },
  { to: '/journal', key: 'app.nav.journal', icon: NotebookPen },
  { to: '/goals', key: 'app.nav.goals', icon: ListChecks },
  { to: '/relax', key: 'app.nav.relax', icon: Sparkles },
  { to: '/wellness', key: 'app.nav.learn', icon: BookHeart },
  { to: '/settings', key: 'app.nav.settings', icon: Settings2 },
]

export default function DesktopNav() {
  const { t } = useTranslation()
  const { logout } = useAuth()
  return (
    <nav className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col overflow-hidden border-r border-[#dce6e2] bg-[#fbfcfa]/95 text-brand-slate-dark shadow-[12px_0_40px_-34px_rgba(24,51,47,0.45)] backdrop-blur-xl lg:flex">
      <div className="border-b border-[#e4ebe8] p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-slate text-white shadow-sm"><HeartHandshake size={22} /></span>
          <div><h2 className="text-xl font-bold tracking-tight">MindCare</h2><p className="max-w-36 truncate text-xs text-gray-500">{t('app.tagline')}</p></div>
        </div>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-4">
        {ITEMS.map((item) => <NavLink key={item.key} to={item.to} className={({ isActive }) => `flex items-center gap-3 rounded-button px-4 py-3 text-sm transition-all ${isActive ? 'bg-[#e7f0ec] font-semibold text-brand-slate shadow-sm ring-1 ring-brand-sage/20' : 'text-gray-600 hover:bg-[#f0f4f2] hover:text-brand-slate-dark'}`}><item.icon size={18} />{t(item.key)}</NavLink>)}
      </div>
      <div className="border-t border-[#e4ebe8] p-4">
        <NavLink to="/get-help" className="mb-2 flex items-center gap-3 rounded-button border border-[#efcfd1] bg-[#fff2f1] px-4 py-3 text-sm font-semibold text-[#8b4650] hover:bg-[#fce7e6]"><HeartHandshake size={18} />{t('app.nav.getHelp')}</NavLink>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-button px-4 py-3 text-sm text-gray-500 hover:bg-[#f0f4f2] hover:text-brand-slate-dark"><LogOut size={18} />{t('auth.signOut')}</button>
      </div>
    </nav>
  )
}
