-- MindCare MVP schema (V1)
-- Compatible with PostgreSQL and H2 (for tests).

CREATE TABLE user_profiles (
  user_id uuid PRIMARY KEY,
  display_name text,
  locale varchar(10) NOT NULL DEFAULT 'en',
  timezone varchar(64) NOT NULL DEFAULT 'UTC',
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE user_preferences (
  user_id uuid PRIMARY KEY REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  reminders_enabled boolean NOT NULL DEFAULT false,
  notification_time varchar(8),
  hide_streaks boolean NOT NULL DEFAULT false,
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE mood_entries (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  mood_level smallint NOT NULL CHECK (mood_level BETWEEN 1 AND 5),
  emotion_tags varchar(1000) NOT NULL DEFAULT '[]',
  note text,
  occurred_at timestamp NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE INDEX idx_mood_entries_user_occurred ON mood_entries(user_id, occurred_at DESC);

CREATE TABLE journal_entries (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  title varchar(255),
  body text NOT NULL,
  tags varchar(1000) NOT NULL DEFAULT '[]',
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE INDEX idx_journal_entries_user_created ON journal_entries(user_id, created_at DESC);

CREATE TABLE wellness_activities (
  id uuid PRIMARY KEY,
  type varchar(50) NOT NULL,
  title_key varchar(100) NOT NULL,
  duration_seconds integer NOT NULL,
  instructions text NOT NULL,
  is_published boolean NOT NULL DEFAULT true
);

INSERT INTO wellness_activities (id, type, title_key, duration_seconds, instructions, is_published) VALUES
  ('11111111-1111-1111-1111-111111111111', 'breathing', 'relax.breathing', 300,
   'Breathe in for 4 seconds, hold for 2, exhale for 6. Repeat at your own pace. Stop if uncomfortable.', true),
  ('22222222-2222-2222-2222-222222222222', 'grounding', 'relax.grounding', 180,
   'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.', true),
  ('33333333-3333-3333-3333-333333333333', 'mindfulness', 'relax.mindfulness', 240,
   'Sit comfortably, notice your breath, and gently return attention when it wanders.', true);

CREATE TABLE professional_resources (
  id uuid PRIMARY KEY,
  country_code varchar(2) NOT NULL,
  locale varchar(10) NOT NULL,
  resource_type varchar(50) NOT NULL,
  name varchar(255) NOT NULL,
  contact_url varchar(500),
  phone varchar(50),
  verified_at timestamp,
  status varchar(20) NOT NULL DEFAULT 'active'
);

INSERT INTO professional_resources (id, country_code, locale, resource_type, name, contact_url, phone, verified_at, status) VALUES
  ('44444444-4444-4444-4444-444444444441', 'JP', 'ja', 'emergency', 'Ambulance / Fire / Police', null, '119', now(), 'active'),
  ('44444444-4444-4444-4444-444444444442', 'JP', 'en', 'emergency', 'Ambulance / Fire / Police', null, '119', now(), 'active'),
  ('44444444-4444-4444-4444-444444444443', 'US', 'en', 'emergency', 'Emergency Services', null, '911', now(), 'active'),
  ('44444444-4444-4444-4444-444444444444', 'GB', 'en', 'emergency', 'Emergency Services', null, '999', now(), 'active');

CREATE TABLE audit_events (
  id uuid PRIMARY KEY,
  actor_id uuid REFERENCES user_profiles(user_id) ON DELETE SET NULL,
  action varchar(100) NOT NULL,
  entity_type varchar(50) NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  metadata varchar(4000)
);

CREATE TABLE data_export_requests (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  status varchar(30) NOT NULL DEFAULT 'requested',
  created_at timestamp NOT NULL DEFAULT now(),
  completed_at timestamp,
  expires_at timestamp
);

CREATE TABLE account_deletion_requests (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  status varchar(30) NOT NULL DEFAULT 'requested',
  requested_at timestamp NOT NULL DEFAULT now(),
  completed_at timestamp
);


