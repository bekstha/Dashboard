import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";

function useFoodMenu() {
  const [lunchItem, setLunchItem] = useState([]);

  useEffect(() => {
    const q = query(collection(db,"LunchMenu"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let lunchArr = [];
      querySnapshot.forEach((doc) => {
        lunchArr.push({ ...doc.data(), id: doc.id });
      });
      setLunchItem(lunchArr);
    });
    return () => unsubscribe();
  }, []);

  const deleteLunch = async (lunchId) => {
    try {
      await deleteDoc(doc(db, "LunchMenu", lunchId));
    } catch (error) {
      console.error("Error deleting Lunch Item:", error);
      throw error;
    }
  };


  return { lunchItem, deleteLunch };
}

export default useFoodMenu;