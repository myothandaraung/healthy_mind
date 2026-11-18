import { createBrowserRouter } from 'react-router-dom'
import Shell from '@/components/layout/shell'
import { HomePage } from '@/features/home'
import { LoginPage } from '@/features/auth'
import { RegisterPage } from '@/features/auth'
import { ForgotPasswordPage } from '@/features/auth'
import { DashboardPage } from '@/features/dashboard'
import { MoodPage } from '@/features/mood'
import { JournalPage } from '@/features/journal'
import { RelaxPage } from '@/features/relax'
import { SupportPage } from '@/features/support'
import { SettingsPage } from '@/features/settings'
import { WellnessPage } from '@/features/wellness'
import { GentleGoalsPage } from '@/features/goals'
import { ProgressPage } from '@/features/progress'
import { MorePage } from '@/features/more'
import { LanguagePage } from '@/features/language'
import { ManifestationPage } from '@/features/manifestation'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'mood', element: <MoodPage /> },
      { path: 'journal', element: <JournalPage /> },
      { path: 'relax', element: <RelaxPage /> },
      { path: 'get-help', element: <SupportPage /> },
      { path: 'wellness', element: <WellnessPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'goals', element: <GentleGoalsPage /> },
      { path: 'progress', element: <ProgressPage /> },
      { path: 'more', element: <MorePage /> },
      { path: 'language', element: <LanguagePage /> },
      { path: 'manifestation', element: <ManifestationPage /> },
    ],
  },
])
