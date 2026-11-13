import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'muted'
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants: Record<string, string> = {
    default: 'bg-brand-lavender text-brand-slate-dark',
    secondary: 'bg-gray-100 text-gray-700',
    muted: 'bg-gray-200 text-gray-600',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-white/60 px-3 py-1 text-xs font-semibold shadow-sm',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
