import React, { useState, useEffect } from "react";
import { Input, InputLabel, Textarea } from "./Input";
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import LoadingScreen from "./LoadingScreen";
import { Checkbox, message } from "antd";

const Item = ({ itemId, itemName }) => {
  const [lactose_free, setLactoseFree] = useState(null);
  const [gluten_free, setGlutenFree] = useState(null);
  const [nut_free, setNutFree] = useState(null);
  const [day, setDay] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const plainOptions = [
    "Maanantai",
    "Tiistai",
    "Keskiviikko",
    "Torstai",
    "Perjantai",
  ];

  useEffect(() => {
    if (itemId) {
      setDay(itemName.day);
      setDescription(itemName.description);
      setLactoseFree(itemName.lactose_free);
      setGlutenFree(itemName.gluten_free);
      setNutFree(itemName.nut_free);
    } else {
      setIsFormDirty(true)
    }
  }, [itemId]);

  useEffect(() => {
    // Check if any of the form fields are different from their initial values
    if (itemId) {
      const isDirty =
        day !== itemName.day || 
        description !== itemName.description || 
        lactose_free !== itemName.lactose_free ||
        gluten_free !== itemName.gluten_free ||
        nut_free !== itemName.nut_free;
        setIsFormDirty(isDirty);
    }
  }, [day, description, lactose_free, gluten_free, nut_free, isFormDirty]);

  const isFormEmpty = () => {
    return !day.length || !description.trim() || lactose_free === null || gluten_free === null || nut_free === null ;
  };

  const isSubmitDisabled = () => {
    return !isFormDirty || isFormEmpty();
  };

  const handleDayChange = (e) => {
    const inputValue = e.target.value;
    // Assuming the input value is a comma-separated string, you can convert it to an array
    const daysArray = inputValue.split(",").map((day) => day.trim());
    setDay(daysArray);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const lunchMenuCollection = collection(db, "LunchMenu");

      if (itemId) {
        const lunchMenuRef = doc(lunchMenuCollection, itemId);

        await updateDoc(lunchMenuRef, {
          day,
          description,
          lactose_free,
          nut_free,
          gluten_free,
        });
      } else {
        await addDoc(lunchMenuCollection, {
          day,
          description,
          lactose_free,
          nut_free,
          gluten_free,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(true);
      window.location.href = "./LunchMenu";
    }
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="flex-col p-5 bg-slate-200 rounded-lg">
      <div className="flex-col justify-between">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <InputLabel label="Choose Day(s)" />
            <Checkbox.Group
              className="pb-3"
              options={plainOptions}
              value={day}
              onChange={(checkedDays) => setDay(checkedDays)}
            />
            <Input
              type="text"
              className=""
              placeholder="Day"
              value={day}
              onChange={handleDayChange}
            />
          </div>
          <div className="mb-5">
            <InputLabel label="Description" />
            <Textarea
              type="text"
              className=""
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex-col justify-between">
            <div className="sm:w-1/3">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-left">
                  Gluten Free
                </label>
                <select
                  value={gluten_free}
                  onChange={(e) => setGlutenFree(e.target.value === "true")}
                  className="w-full bg-gray-100 rounded-md border border-[#e0e0e0] py-3 px-1 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="">Select</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>

            <div className="sm:w-1/3">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-left">
                  Lactose Free
                </label>
                <select
                  value={lactose_free}
                  onChange={(e) => setLactoseFree(e.target.value === "true")}
                  className="w-full bg-gray-100 rounded-md border border-[#e0e0e0]  py-3 px-1 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="">Select</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>

            <div className="sm:w-1/3">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-left">
                  Nut Free
                </label>
                <select
                  value={nut_free}
                  onChange={(e) => setNutFree(e.target.value === "true")}
                  className="w-full bg-gray-100 rounded-md border border-[#e0e0e0]  py-3 px-1 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="">Select</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className={`w-42 p-4 rounded-xl text-white font-bold border-blue-600 ${
                isSubmitDisabled()
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600"
              }`}
              disabled={isSubmitDisabled()}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Item;
