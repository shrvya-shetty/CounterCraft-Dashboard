// User.tsx
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const User = () => {
  const { signIn, user, logOut, error } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn();
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <div>
        <h2>Welcome, {user.displayName}</h2>
        <button 
          onClick={logOut}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Log Out'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Please Sign In</h2>
      <button 
        onClick={handleSignIn}
        disabled={isLoading}
      >
        {isLoading ? 'Connecting...' : 'Sign in with Google'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default User;