import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/features/theme/theme-context'
import { cn } from '@/lib/utils'

export default function ThemeToggle({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isNight = theme === 'night'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isNight ? 'day' : 'night'} mode`}
      aria-pressed={isNight}
      className={cn('theme-toggle', compact && 'theme-toggle--compact', className)}
    >
      {!compact && <span className="theme-toggle__label">{isNight ? 'Night' : 'Day'}</span>}
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb">{isNight ? <Moon size={13} /> : <Sun size={13} />}</span>
      </span>
    </button>
  )
}
