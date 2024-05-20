import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';

export const AuthContext = createContext(); 
 //creating an authentication context an an authentication provider to give child components access to the provided authentication data.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
