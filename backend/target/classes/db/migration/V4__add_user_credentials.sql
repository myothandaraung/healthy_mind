CREATE TABLE user_credentials (
  user_id uuid PRIMARY KEY REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  email varchar(320) NOT NULL,
  password_hash varchar(100) NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_user_credentials_email
  ON user_credentials (email);
