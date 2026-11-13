import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns'

export function toLocal(utcIso: string): Date {
  return parseISO(utcIso)
}

export function formatLocal(utcIso: string, _timezone: string, fmt = 'PPP p'): string {
  return format(parseISO(utcIso), fmt)
}

export function relativeFromNow(utcIso: string): string {
  const d = parseISO(utcIso)
  if (!isValid(d)) return ''
  return formatDistanceToNow(d, { addSuffix: true })
}
