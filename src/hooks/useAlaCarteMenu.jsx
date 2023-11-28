import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, deleteDoc, doc, query, onSnapshot } from "firebase/firestore";

function useAlacarteMenu() {
  const [alaCarte, setAlaCarte] = useState([]);

  useEffect(() => {
    const q = query(collection(db,"A_La_Carte"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let alacarteArr = [];
      querySnapshot.forEach((doc) => {
        alacarteArr.push({ ...doc.data(), id: doc.id });
      });
      setAlaCarte(alacarteArr);
    });
    return () => unsubscribe();
    
  }, []);

  const deleteAlaCarte = async (itemId) => {
    try {
      await deleteDoc(doc(db, "A_La_Carte", itemId));
    } catch (error) {
      console.error("Error deleting Lunch Item:", error);
      throw error;
    }
  };

  return { alaCarte, deleteAlaCarte };
}

export default useAlacarteMenu;