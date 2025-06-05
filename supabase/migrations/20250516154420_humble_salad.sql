/*
  # Initial Schema Setup

  1. New Tables
    - `sermons`
      - `id` (uuid, primary key)
      - `title` (text)
      - `preacher` (text)
      - `date` (timestamptz)
      - `views` (integer)
      - `created_at` (timestamptz)
      
    - `books`
      - `id` (uuid, primary key)
      - `title` (text)
      - `author` (text)
      - `description` (text)
      - `created_at` (timestamptz)
      
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `date` (timestamptz)
      - `location` (text)
      - `description` (text)
      - `created_at` (timestamptz)
      
    - `subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create sermons table
CREATE TABLE IF NOT EXISTS sermons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  preacher text NOT NULL,
  date timestamptz NOT NULL,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date timestamptz NOT NULL,
  location text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to sermons"
  ON sermons FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage sermons"
  ON sermons FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to books"
  ON books FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage books"
  ON books FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to events"
  ON events FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage events"
  ON events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage subscribers"
  ON subscribers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);