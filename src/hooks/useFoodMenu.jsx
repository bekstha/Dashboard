import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, deleteDoc, doc, onSnapshot, query, setDoc, addDoc } from "firebase/firestore";
import { message } from "antd";

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
      message.success("Lunch deleted successfully!");
    } catch (error) {
      message.error( error);
      throw error;
    }
  };

  const updateLunch = async (lunchId, newData) => {
    try {
      const lunchRef = doc(db, "LunchMenu", lunchId);
      await setDoc(lunchRef, newData, { merge: true });
      message.success("Lunch updated successfully!");
    } catch (error) {
      message.error(error);
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
      message.success("Lunch added successfully!");
    } catch (error) {
      message.error(error);
      throw error;
    }
  };


  return { lunchItem, deleteLunch, updateLunch, addLunch };
}

export default useFoodMenu;