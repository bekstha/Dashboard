import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function useFoodMenu() {
  const [lunchItem, setLunchItem] = useState([]);

  const lunchMenuRef = collection(db, "LunchMenu");

  useEffect(() => {
    getLunchList();
  }, []);

  const getLunchList = async () => {
    try {
      const food = await getDocs(lunchMenuRef);
      const filteredFood = food.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLunchItem(filteredFood)

    } catch (error) {
      console.error(error);
    }
  };

  return { lunchItem };
}

export default useFoodMenu;