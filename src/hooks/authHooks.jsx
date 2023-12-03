import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the authenticated email exists in the "Admin" collection
      const adminCollection = collection(db, "Admin");
      const adminQuery = query(adminCollection, where("email", "==", email));
      const adminSnapshot = await getDocs(adminQuery);

      if (adminSnapshot.docs.length > 0) {
        // Email exists in the "Admin" collection
        setLoading(false);
        return { admin: true, user };
      } else {
        // Email does not exist in the "Admin" collection
        setLoading(false);
        return { admin: false, user };
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  const signOutUser = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error("signOut error:", error.message);
      setError(error.message);
      throw error;
    }
  };

  return { loading, error, signIn, signOut: signOutUser };
};

export default useSignIn;
