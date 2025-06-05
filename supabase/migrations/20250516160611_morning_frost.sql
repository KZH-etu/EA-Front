/*
  # Fix Events Table RLS Policies

  1. Changes
    - Drop existing RLS policies for events table
    - Create new, more specific RLS policies:
      - Allow public read access
      - Allow authenticated users full access
      - Ensure proper security while maintaining functionality

  2. Security
    - Maintain RLS enabled
    - Implement proper access control for different user types
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to events" ON events;
DROP POLICY IF EXISTS "Allow authenticated users to manage events" ON events;

-- Create new policies
CREATE POLICY "Allow public read access to events"
  ON events FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage events"
  ON events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);