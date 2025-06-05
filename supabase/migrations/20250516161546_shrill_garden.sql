/*
  # Create admin role and policies

  1. New Functions
    - check_if_admin: Checks if the user has admin role
  
  2. Security
    - Create admin role check function
    - Update RLS policies to use admin role check
*/

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.check_if_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (
    SELECT EXISTS (
      SELECT 1
      FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update books table policies
DROP POLICY IF EXISTS "Enable all access for admin users" ON books;
CREATE POLICY "Enable all access for admin users" ON books
  FOR ALL
  TO authenticated
  USING (check_if_admin())
  WITH CHECK (check_if_admin());

-- Update events table policies
DROP POLICY IF EXISTS "Allow authenticated users to manage events" ON events;
CREATE POLICY "Allow authenticated users to manage events" ON events
  FOR ALL
  TO authenticated
  USING (check_if_admin())
  WITH CHECK (check_if_admin());

-- Update sermons table policies
DROP POLICY IF EXISTS "Allow authenticated users to manage sermons" ON sermons;
CREATE POLICY "Allow authenticated users to manage sermons" ON sermons
  FOR ALL
  TO authenticated
  USING (check_if_admin())
  WITH CHECK (check_if_admin());

-- Update subscribers table policies
DROP POLICY IF EXISTS "Allow authenticated users to manage subscribers" ON subscribers;
CREATE POLICY "Allow authenticated users to manage subscribers" ON subscribers
  FOR ALL
  TO authenticated
  USING (check_if_admin())
  WITH CHECK (check_if_admin());