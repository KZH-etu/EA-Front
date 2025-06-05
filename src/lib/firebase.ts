// Mock auth functions for development
export const signIn = async (email: string, password: string) => {
  // Mock credentials check
  if (email === 'admin@example.com' && password === 'admin123') {
    sessionStorage.setItem('isAuthenticated', 'true');
    return { data: { user: { email } }, error: null };
  }
  return { data: null, error: new Error('Invalid credentials') };
};

export const signOut = async () => {
  sessionStorage.removeItem('isAuthenticated');
  return { error: null };
};

export const getCurrentUser = () => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? { email: 'admin@example.com' } : null;
};