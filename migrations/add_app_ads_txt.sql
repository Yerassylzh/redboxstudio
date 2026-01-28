-- Migration: Add app_ads_txt column to games table
-- Run this in your Supabase SQL Editor to apply the database changes

ALTER TABLE public.games ADD COLUMN IF NOT EXISTS app_ads_txt text null;

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'games' AND column_name = 'app_ads_txt';
