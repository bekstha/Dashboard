import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import useOpeningHours from "../hooks/useOpeningHours";
import OpeningHoursCard from "../components/OpeningHoursCard";
import LoadingScreen from "../components/LoadingScreen";

const Openings = () => {
  const { openingHours } = useOpeningHours();
  const [localOpeningHours, setLocalOpeningHours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if contact data is loaded
    if (openingHours.length > 0) {
      setLoading(false);
    }
  }, [openingHours]);

  useEffect(() => {
    // Populate localOpeningHours with the initial data from Firebase
    setLocalOpeningHours(openingHours);
  }, [openingHours]);
  const handleTimeChange = (id, field, value) => {
    setLocalOpeningHours((prevOpeningHours) =>
      prevOpeningHours.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleOpenChange = (id, isOpen) => {
    setLocalOpeningHours((prevOpeningHours) =>
      prevOpeningHours.map((item) =>
        item.id === id ? { ...item, open: isOpen } : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isFormDataUnchanged()) {
        await Promise.all(
          localOpeningHours.map(async (item) => {
            const openingHoursDocRef = doc(db, "OpeningHours", item.id);
            await updateDoc(openingHoursDocRef, {
              open: item.open,
              opens: item.opens,
              closes: item.closes,
            });
            console.log("Document updated successfully!");
          })
        );
        console.log("Changes saved successfully!");
      } else {
        console.log("No changes to save.");
      }
    } catch (error) {
      console.error("Error updating documents:", error);
    }
  };

  const isFormDataUnchanged = () => {
    return JSON.stringify(localOpeningHours) === JSON.stringify(openingHours);
  };
  

  return loading ? (
    <LoadingScreen />
  ) : (
    <form onSubmit={handleSubmit} className="bg-slate-100 p-5 rounded-xl text-blue-950 mt-20 md:mt-5">
      {localOpeningHours.map((item) => (
        <OpeningHoursCard
          key={item.id}
          header={item.id}
          openingHour={item.opens}
          closingHour={item.closes}
          open={item.open}
          onOpenChange={(isOpen) => handleOpenChange(item.id, isOpen)}
          onTimeChange={(field, value) =>
            handleTimeChange(item.id, field, value)
          }
        />
      ))}
      <div className="flex justify-center mt-10">
        <button
          type="submit"
          className={`w-48 p-5 rounded-xl text-white ${
            isFormDataUnchanged() ? "bg-gray-500" : "bg-blue-950"
          }`}
          disabled={isFormDataUnchanged()}
        >
          Save changes
        </button>
      </div>
    </form>
  );
};

export default Openings;
