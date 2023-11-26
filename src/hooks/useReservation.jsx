import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const useReservation = () => {
  const [reservations, setReservations] = useState([]);
  const reservationInfo = collection(db, "Reservations");

  useEffect(() => {
    const getReservation = async () => {
      try {
        const data = await getDocs(reservationInfo);
        const filteredData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getReservation();
  }, []);

  return { reservations, setReservations };
};

export default useReservation;
