import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const useOpeningHours = () => {
  const [openingHours, setOpeningHours] = useState([]);
  const openingHoursRef = collection(db, "OpeningHours");

  useEffect(() => {
    const getOpeningHours = async () => {
      try {
        const data = await getDocs(openingHoursRef);
        const filteredData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOpeningHours(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getOpeningHours();
  }, []);

  return {
    openingHours,
    setOpeningHours,
  };
};

export default useOpeningHours;
