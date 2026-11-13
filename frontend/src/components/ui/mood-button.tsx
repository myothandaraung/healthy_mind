import { cn } from '@/lib/utils'

export interface MoodButtonProps {
  value: number
  label: string
  selected: boolean
  onSelect: (value: number) => void
  ariaLabel?: string
}

export function MoodButton({ value, label, selected, onSelect, ariaLabel }: MoodButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={selected}
      aria-label={ariaLabel || label}
      className={cn(
        'flex flex-col items-center justify-center rounded-button border px-3 py-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-slate',
        selected
          ? 'bg-brand-slate text-white border-brand-slate'
          : 'bg-white text-brand-slate-dark border-gray-300 hover:bg-gray-50',
      )}
    >
      {label}
    </button>
  )
}
