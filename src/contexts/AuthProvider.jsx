import { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase/BaseConfig';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const AuthContext = createContext();
const provider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Successfully signed out');
      })
      .catch((error) => {
        console.log('Error signing out', error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authValue = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    handleGoogleSignIn,
    handleGoogleSignOut,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
