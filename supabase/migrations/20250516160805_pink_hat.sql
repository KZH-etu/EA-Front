/*
  # Fix Events Table RLS Policies

  1. Security Changes
    - Drop existing RLS policies
    - Add new policies for:
      - Public read access to all events
      - Full CRUD access for authenticated users
    
  2. Changes
    - Ensures proper access control while maintaining security
    - Fixes 401 authorization errors for event management
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to manage events" ON events;
DROP POLICY IF EXISTS "Allow public read access to events" ON events;

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Allow public read access to events"
ON events
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow authenticated users to manage events"
ON events
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);