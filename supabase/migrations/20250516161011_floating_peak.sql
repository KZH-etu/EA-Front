/*
  # Update Books Table RLS Policies

  1. Changes
    - Remove existing broad policies
    - Add specific policies for admin and public access
    
  2. Security
    - Admins can perform all operations
    - Public users can only read
    - Authenticated non-admin users can only read
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to manage books" ON books;
DROP POLICY IF EXISTS "Allow public read access to books" ON books;

-- Create new policies
CREATE POLICY "Enable read access for all users" ON books
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable all access for admin users" ON books
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');