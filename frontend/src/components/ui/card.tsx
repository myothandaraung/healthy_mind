import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ className, padding = 'md', children, ...props }: CardProps) {
  const paddingClasses: Record<string, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  return (
    <div
      className={cn(
        'rounded-card border border-white/90 bg-white/80 shadow-[0_1px_2px_rgba(16,43,39,0.04),0_16px_40px_-28px_rgba(16,43,39,0.35)] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 hover:border-brand-sage/45 hover:shadow-[0_1px_2px_rgba(16,43,39,0.04),0_22px_55px_-30px_rgba(16,43,39,0.4)]',
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
