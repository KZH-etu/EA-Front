/*
  # Update Books Schema

  1. New Columns
    - `category` (text): 'book' or 'brochure'
    - `year` (integer): publication year
    - `language` (text): book language
    - `cover_url` (text): URL to cover image
    - `pdf_url` (text): URL to PDF file
    - `tags` (text[]): array of tags

  2. Security
    - Maintain existing RLS policies
    - Add validation for new fields
*/

-- Add new columns to books table
ALTER TABLE books 
  ADD COLUMN category text NOT NULL DEFAULT 'book' CHECK (category IN ('book', 'brochure')),
  ADD COLUMN year integer,
  ADD COLUMN language text NOT NULL DEFAULT 'fr',
  ADD COLUMN cover_url text,
  ADD COLUMN pdf_url text,
  ADD COLUMN tags text[] DEFAULT '{}';

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on tags table
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Create policies for tags
CREATE POLICY "Allow public read access to tags"
  ON tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin users to manage tags"
  ON tags FOR ALL
  TO authenticated
  USING (check_if_admin())
  WITH CHECK (check_if_admin());