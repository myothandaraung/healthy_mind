import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ className, padding = 'md', children, ...props }: CardProps) {
  const paddingClasses: Record<string, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  }
  return (
    <div
      className={cn(
        'rounded-card border border-[#e1e8e4] bg-white/92 shadow-[0_1px_2px_rgba(24,51,47,0.04),0_12px_32px_-24px_rgba(24,51,47,0.3)] backdrop-blur-xl transition-[box-shadow,border-color] duration-300 hover:border-[#cbdcd5] hover:shadow-[0_1px_2px_rgba(24,51,47,0.04),0_18px_40px_-26px_rgba(24,51,47,0.35)]',
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
