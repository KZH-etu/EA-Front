/*
  # Fix Events Table RLS Policies

  1. Security Changes
    - Enable RLS on events table
    - Add policy for public read access
    - Add policy for authenticated users to manage events
*/

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to events" ON events;
DROP POLICY IF EXISTS "Allow authenticated users to manage events" ON events;

-- Create policy for public read access
CREATE POLICY "Allow public read access to events"
ON events
FOR SELECT
TO public
USING (true);

-- Create policy for authenticated users to manage events
CREATE POLICY "Allow authenticated users to manage events"
ON events
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);