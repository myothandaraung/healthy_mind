import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helper?: string
}

export function Input({ className, label, error, helper, id, ...props }: InputProps) {
  const inputId = id || React.useId()
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-brand-slate-dark">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'block min-h-12 w-full rounded-button border border-[#d6e0dc] bg-[#fdfdfb] px-4 py-3 text-sm text-brand-slate-dark shadow-[0_1px_2px_rgba(24,51,47,0.04)] transition placeholder:text-gray-400 hover:border-brand-sage focus:border-brand-slate focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-sage/20 disabled:bg-gray-100 disabled:text-gray-500',
          error && 'border-red-500 focus:ring-red-500',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-600" role="alert" aria-live="polite">
          {error}
        </p>
      )}
      {helper && !error && <p className="text-xs text-gray-500">{helper}</p>}
    </div>
  )
}
