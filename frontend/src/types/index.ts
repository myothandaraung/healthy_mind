export interface MoodEntry {
  id: string
  user_id: string
  mood_level: number
  emotion_tags: string[]
  note: string | null
  occurred_at: string
  created_at: string
  updated_at: string
}

export interface MoodEntryInput {
  mood_level: number
  emotion_tags?: string[]
  note?: string | null
  occurred_at: string
}

export interface JournalEntry {
  id: string
  user_id: string
  title: string | null
  body: string
  tags: string[]
  created_at: string
  updated_at: string
}

export interface JournalEntryInput {
  title?: string | null
  body: string
  tags?: string[]
}

export interface UserProfile {
  user_id: string
  display_name: string | null
  locale: string
  timezone: string
  created_at: string
  updated_at: string
}

export interface UserPreference {
  user_id: string
  reminders_enabled: boolean
  notification_time: string | null
  hide_streaks: boolean
  updated_at: string
}

export interface Activity {
  id: string
  type: string
  title_key: string
  duration_seconds: number
  instructions: string
  is_published: boolean
}

export interface SupportResource {
  id: string
  country_code: string
  locale: string
  resource_type: string
  name: string
  contact_url: string | null
  phone: string | null
  verified_at: string | null
}

export interface ApiError {
  code: string
  message: string
  field?: string
}
