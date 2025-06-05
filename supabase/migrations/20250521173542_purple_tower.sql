/*
  # About Content Management Schema

  1. New Tables
    - `about_sections`
      - `id` (uuid, primary key)
      - `entity` (text) - 'assemblee', 'branham', or 'frank'
      - `title` (text)
      - `short_description` (text)
      - `main_image` (text)
      - `order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `about_details`
      - `id` (uuid, primary key)
      - `section_id` (uuid, foreign key)
      - `title` (text)
      - `content` (text)
      - `image` (text)
      - `order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for public read access
    - Add policies for admin management
*/

-- Create about_sections table
CREATE TABLE IF NOT EXISTS about_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity text NOT NULL CHECK (entity IN ('assemblee', 'branham', 'frank')),
  title text NOT NULL,
  short_description text NOT NULL,
  main_image text,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create about_details table
CREATE TABLE IF NOT EXISTS about_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES about_sections(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  image text,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE about_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_details ENABLE ROW LEVEL SECURITY;

-- Create policies for about_sections
CREATE POLICY "Allow public read access to about_sections"
  ON about_sections FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin users to manage about_sections"
  ON about_sections FOR ALL
  TO authenticated
  USING (check_if_admin())
  WITH CHECK (check_if_admin());

-- Create policies for about_details
CREATE POLICY "Allow public read access to about_details"
  ON about_details FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin users to manage about_details"
  ON about_details FOR ALL
  TO authenticated
  USING (check_if_admin())
  WITH CHECK (check_if_admin());

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_about_sections_updated_at
  BEFORE UPDATE ON about_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_details_updated_at
  BEFORE UPDATE ON about_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();