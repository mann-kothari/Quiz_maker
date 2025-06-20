import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDXsyq7UDVisKk_pTy5f3QLskg-gnvfgso",
  authDomain: "quizmaker-db0fe.firebaseapp.com",
  projectId: "quizmaker-db0fe",
  storageBucket: "quizmaker-db0fe.firebasestorage.app",
  messagingSenderId: "943089720109",
  appId: "1:943089720109:web:9899117fb37b6fe34991a4",
  measurementId: "G-0B46WWYZEQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error("Google Login Failed:", err);
    }
  };
  const logout = async () => signOut(auth);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
