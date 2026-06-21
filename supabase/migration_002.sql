-- Migration 002: shared projects for the couple tab

CREATE TABLE IF NOT EXISTS shared_projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  who text NOT NULL DEFAULT 'BJ',
  outcome text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE shared_tasks ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES shared_projects(id) ON DELETE CASCADE;
