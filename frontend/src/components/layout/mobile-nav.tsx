import { NavLink } from 'react-router-dom'
import { Flower2, HeartHandshake, Home, ListChecks, Menu, NotebookPen } from 'lucide-react'
import { useTranslation } from '@/i18n'

const ITEMS = [
  { to: '/dashboard', key: 'app.mobile.home', icon: Home },
  { to: '/mood', key: 'app.mobile.mood', icon: Flower2 },
  { to: '/journal', key: 'app.mobile.journal', icon: NotebookPen },
  { to: '/goals', key: 'app.mobile.goals', icon: ListChecks },
]

export default function MobileNav() {
  const { t } = useTranslation()
  return (
    <nav className="fixed bottom-[max(.75rem,env(safe-area-inset-bottom))] left-2 right-2 z-40 rounded-[22px] border border-[#dce6e2] bg-white/94 p-1.5 text-brand-slate-dark shadow-[0_18px_45px_-18px_rgba(24,51,47,0.38)] backdrop-blur-2xl sm:left-3 sm:right-3 sm:p-2 lg:hidden">
      <div className="flex">
        {ITEMS.map((item) => <NavLink key={item.key} to={item.to} className={({ isActive }) => `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-button px-0.5 py-2 text-[10px] transition-colors sm:px-1 sm:text-[11px] ${isActive ? 'bg-[#e7f0ec] font-semibold text-brand-slate' : 'text-gray-500 hover:bg-[#f0f4f2] hover:text-brand-slate'}`}><item.icon size={19} /><span className="max-w-full truncate">{t(item.key)}</span></NavLink>)}
        <NavLink to="/get-help" className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-button px-0.5 py-2 text-[10px] text-[#a24e59] hover:bg-[#fff2f1] sm:px-1 sm:text-[11px]"><HeartHandshake size={19} /><span className="max-w-full truncate">{t('app.mobile.getHelp')}</span></NavLink>
        <NavLink to="/more" className={({ isActive }) => `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-button px-0.5 py-2 text-[10px] sm:px-1 sm:text-[11px] ${isActive ? 'bg-[#e7f0ec] font-semibold text-brand-slate' : 'text-gray-500 hover:bg-[#f0f4f2] hover:text-brand-slate'}`}><Menu size={19} /><span className="max-w-full truncate">{t('app.mobile.more')}</span></NavLink>
      </div>
    </nav>
  )
}
