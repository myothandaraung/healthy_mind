import { NavLink } from 'react-router-dom'
import { Flower2, HeartHandshake, Home, Menu, NotebookPen, Sparkles } from 'lucide-react'
import { useTranslation } from '@/i18n'

const ITEMS = [
  { to: '/dashboard', key: 'app.mobile.home', icon: Home },
  { to: '/mood', key: 'app.mobile.mood', icon: Flower2 },
  { to: '/journal', key: 'app.mobile.journal', icon: NotebookPen },
  { to: '/relax', key: 'app.mobile.relax', icon: Sparkles },
]

export default function MobileNav() {
  const { t } = useTranslation()
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 rounded-[20px] border border-white/15 bg-[#102b27]/94 p-2 text-white shadow-[0_20px_50px_-16px_rgba(16,43,39,0.7)] backdrop-blur-2xl md:hidden">
      <div className="flex">
        {ITEMS.map((item) => <NavLink key={item.key} to={item.to} className={({ isActive }) => `flex flex-1 flex-col items-center justify-center gap-1 rounded-button px-1 py-2 text-[11px] transition-colors ${isActive ? 'bg-white font-semibold text-brand-slate-dark' : 'text-white/55 hover:bg-white/10 hover:text-white'}`}><item.icon size={19} />{t(item.key)}</NavLink>)}
        <NavLink to="/get-help" className="flex flex-1 flex-col items-center justify-center gap-1 rounded-button px-1 py-2 text-[11px] text-[#ffb8bf] hover:bg-white/10"><HeartHandshake size={19} />{t('app.mobile.getHelp')}</NavLink>
        <NavLink to="/settings" className="flex flex-1 flex-col items-center justify-center gap-1 rounded-button px-1 py-2 text-[11px] text-white/55 hover:bg-white/10 hover:text-white"><Menu size={19} />{t('app.mobile.more')}</NavLink>
      </div>
    </nav>
  )
}
