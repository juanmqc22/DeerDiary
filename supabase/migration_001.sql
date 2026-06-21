-- Migration 001: fix column names and add missing columns

-- Add event_time to calendar_events
ALTER TABLE calendar_events ADD COLUMN IF NOT EXISTS event_time text;

-- Remove the old sample savings_goals data (user will add their own)
DELETE FROM savings_goals;
