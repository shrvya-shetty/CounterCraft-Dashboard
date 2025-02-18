import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { auth, provider } from './firebaseConfig';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate here

interface AuthContextType {
  user: any;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate here

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setError(null); // Clear any previous errors when auth state changes
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      // Configure provider settings
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      const result = await signInWithPopup(auth, provider);
      console.log('Sign in successful:', result.user);
      setError(null);

      // Redirect to the dashboard after successful sign-in
      navigate('/dashboard'); // Ensure '/dashboard' is the correct route
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      setError(error.message);
      throw error; // Rethrow to handle in UI component if needed
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      setError(null);
      navigate('/'); // Redirect to home page after log out (optional)
    } catch (error: any) {
      console.error("Error logging out:", error);
      setError(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logOut, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
