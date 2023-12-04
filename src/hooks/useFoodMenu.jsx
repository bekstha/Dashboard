import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, deleteDoc, doc, onSnapshot, query, setDoc, addDoc } from "firebase/firestore";

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

  const updateLunch = async (lunchId, newData) => {
    try {
      const lunchRef = doc(db, "LunchMenu", lunchId);
      await setDoc(lunchRef, newData, { merge: true });
      console.log("Lunch updated successfully!");
    } catch (error) {
      console.error("Error updating Lunch:", error);
      throw error;
    }
  };

  const addLunch = async (day, description, lactose_free, nut_free, gluten_free) => {
    try {
      await addDoc(collection(db, "LunchMenu"), {
        day,
        description,
        lactose_free,
        nut_free,
        gluten_free,
      });
      console.log("Lunch added successfully!");
    } catch (error) {
      console.error("Error adding Lunch:", error);
      throw error;
    }
  };


  return { lunchItem, deleteLunch, updateLunch, addLunch };
}

export default useFoodMenu;