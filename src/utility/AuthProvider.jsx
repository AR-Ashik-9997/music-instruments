import React, { createContext, useEffect, useState } from "react";
import app from "./firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (profile) => {    
    return updateProfile(auth.currentUser, profile);
  };
  const signInGoogle = (provider) => {  
    setLoading(true); 
    return signInWithPopup(auth, provider);
  };
  const signInGithub=(provider)=>{
    setLoading(true); 
    return signInWithPopup(auth, provider);
  }
  const SignInForm = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const Logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    signUp,
    updateUserProfile,
    signInGoogle,
    Logout,
    SignInForm,
    loading,
    signInGithub
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;