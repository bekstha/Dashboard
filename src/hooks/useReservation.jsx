import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";

const useReservation = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Reservations"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let reservationArr = [];
      querySnapshot.forEach((doc) => {
        reservationArr.push({ ...doc.data(), id: doc.id });
      });
      setReservations(reservationArr);
    });
    return () => unsubscribe();
  }, []);
  const deleteReservation = async (id) => {
    try {
      await deleteDoc(doc(db, "Reservations", id));
    } catch (error) {
      console.error("Error deleting Reservation:", error);
      throw error;
    }
  };

  return { reservations, deleteReservation };
};

export default useReservation;
