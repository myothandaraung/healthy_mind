import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, children, asChild, ...props }, ref) => {
    const base =
      'inline-flex min-h-11 items-center justify-center rounded-button font-semibold tracking-[-0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-slate focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]'
    const variants: Record<string, string> = {
      primary: 'bg-gradient-to-br from-[#2a8174] to-[#1d6359] text-white shadow-[0_10px_24px_-12px_rgba(35,107,96,0.65)] hover:-translate-y-0.5 hover:brightness-105',
      secondary: 'bg-brand-lavender/80 text-[#393463] hover:bg-brand-lavender',
      ghost: 'text-brand-slate hover:bg-brand-sage/15',
      danger: 'bg-[#b34f5a] text-white shadow-sm hover:bg-[#963e49]',
      outline: 'border border-brand-slate/20 bg-white/70 text-brand-slate shadow-sm hover:border-brand-slate/40 hover:bg-white',
    }
    const sizes: Record<string, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    }
    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement & {
        props: Record<string, unknown>
      }
      return React.cloneElement(child, {
        className: cn(
          base,
          variants[variant],
          sizes[size],
          (child.props.className as string | undefined),
        ),
        disabled,
        ...props,
      })
    }
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
