import { QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { queryClient } from '@/lib/query-client'
import { AuthProvider } from '@/features/auth'
import { ThemeProvider } from '@/features/theme/theme-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  )
}
