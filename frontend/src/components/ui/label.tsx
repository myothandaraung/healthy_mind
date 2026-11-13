import * as React from 'react'
import { cn } from '@/lib/utils'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label
      className={cn('text-sm font-medium text-brand-slate-dark', required && 'after:content-[" *"] after:text-red-500', className)}
      {...props}
    >
      {children}
    </label>
  )
}
