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
      'inline-flex min-h-11 items-center justify-center rounded-button font-semibold tracking-[-0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-slate focus-visible:ring-offset-2 focus-visible:ring-offset-brand-offwhite disabled:pointer-events-none disabled:opacity-50 active:translate-y-px'
    const variants: Record<string, string> = {
      primary: 'border border-[#1f5a52] bg-brand-slate text-white shadow-[0_8px_20px_-12px_rgba(39,104,95,0.8)] hover:-translate-y-0.5 hover:bg-[#205a52] hover:shadow-[0_12px_24px_-14px_rgba(39,104,95,0.9)]',
      secondary: 'border border-[#d8d3e7] bg-brand-lavender/75 text-[#494361] hover:bg-brand-lavender',
      ghost: 'text-brand-slate hover:bg-[#e9f1ed]',
      danger: 'border border-[#9e4651] bg-[#ad5360] text-white shadow-sm hover:bg-[#984450]',
      outline: 'border border-[#cbd9d4] bg-white/85 text-brand-slate shadow-[0_1px_2px_rgba(24,51,47,0.05)] hover:border-brand-sage hover:bg-[#f7fbf9]',
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
