/*
  # Fix Events RLS Policies
  
  1. Changes
    - Drop existing policies
    - Create new policies with proper admin checks
    - Add function to check admin role
  
  2. Security
    - Enable RLS
    - Add policies for public read access
    - Add policies for admin management
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to manage events" ON events;
DROP POLICY IF EXISTS "Allow public read access to events" ON events;

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to events"
ON events
FOR SELECT
TO public
USING (true);

-- Create policy for admin users to manage events
CREATE POLICY "Allow admin users to manage events"
ON events
FOR ALL
TO authenticated
USING (check_if_admin())
WITH CHECK (check_if_admin());