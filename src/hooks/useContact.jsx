import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const useContact = () => {
  const [contact, setContact] = useState([]);
  const contactInfo = collection(db, "ContactInformation");

  useEffect(() => {
    const getContact = async () => {
      try {
        const data = await getDocs(contactInfo);
        const filteredData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContact(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getContact();
  }, []);

  return { contact, setContact };
};

export default useContact;
