-- Ensure metadata column type is compatible across PostgreSQL and H2.
ALTER TABLE audit_events ALTER COLUMN metadata TYPE VARCHAR(4000);
