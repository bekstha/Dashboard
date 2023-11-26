import { collection, getDocs } from 'firebase/firestore';
import { db } from "../config/firebase";
import React, { useEffect, useState } from 'react';

export const useSpecialMenu = () => {
    const [specialMenu, setSpecialMenu] = useState([]);
    const specialMenuRef = collection(db, "SpecialMenu");

    useEffect(() => {
        getSpecialMenu();
    }, []);
    
      const getSpecialMenu = async () => {
        try {
          const food = await getDocs(specialMenuRef);
          const filteredFood = food.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setSpecialMenu(filteredFood)
    
        } catch (error) {
          console.error(error);
        }
      };
  return { specialMenu }
};

export default useSpecialMenu
