-- Migration: Add visibility column to projects table
-- Run this in Supabase SQL Editor if you already ran schema.sql

-- Add visibility column if it doesn't exist
alter table projects add column if not exists visibility text not null default 'public';
