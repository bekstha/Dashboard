import { collection, deleteDoc, doc, query, onSnapshot } from 'firebase/firestore';
import { db } from "../config/firebase";
import { useEffect, useState } from 'react';

export const useSpecialMenu = () => {
    const [specialMenu, setSpecialMenu] = useState([]);

    useEffect(() => {
      const q = query(collection(db,"SpecialMenu"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let specialArr = [];
        querySnapshot.forEach((doc) => {
          specialArr.push({ ...doc.data(), id: doc.id });
        });
        setSpecialMenu(specialArr);
      });
      return () => unsubscribe();
    }, []);

    const deleteSpecial = async (id) => {
      try {
        await deleteDoc(doc(db, "SpecialMenu", id));
      } catch (error) {
        console.error("Error deleting dish Item:", error);
        throw error;
      }
    };

  return { specialMenu, deleteSpecial }
};

export default useSpecialMenu
