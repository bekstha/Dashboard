import React, { useState, useEffect } from "react";
import { Input, InputLabel, Textarea } from "./Input";
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import LoadingScreen from "./LoadingScreen";

const AlaCarteItem = ({ itemId, itemName }) => {
  const [lactose_free, setLactoseFree] = useState(true);
  const [gluten_free, setGlutenFree] = useState(true);
  const [nut_free, setNutFree] = useState(true);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [dishType, setDishType] = useState("");
  const [chicken_dish, setChicken] = useState("");
  const [starter, setStarter] = useState("");
  const [tandoor_dish, setTandoor] = useState("");
  const [lamb_dish, setLamb] = useState("");
  const [veg_dish, setVegetarian] = useState("");
  const [vegan, setVegan] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemId) {
      setTitle(itemName.title);
      setDescription(itemName.description);
      setLactoseFree(itemName.lactose_free);
      setGlutenFree(itemName.gluten_free);
      setNutFree(itemName.nut_free);
      setPrice(itemName.price);
      setChicken(itemName.chicken_dish);
      setStarter(itemName.starter);
      setTandoor(itemName.tandoor_dish);
      setVegetarian(itemName.veg_dish);
      setVegan(itemName.vegan);
      setLamb(itemName.lamb_dish);
    }
  }, [itemId]);

  const handleDishTypeChange = (selectedDishType) => {
    console.log(selectedDishType);
    setChicken(selectedDishType === "chicken_dish");
    setStarter(selectedDishType === "starter");
    setTandoor(selectedDishType === "tandoor_dish");
    setVegetarian(selectedDishType === "veg_dish");
    setVegan(selectedDishType === "vegan");
    setLamb(selectedDishType === "lamb_dish");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const alaCarteCollection = collection(db, "A_La_Carte");

      if (itemId) {
        const alaCarteDocRef = doc(alaCarteCollection, itemId);
        await updateDoc(alaCarteDocRef, {
          title,
          description,
          price,
          lactose_free,
          nut_free,
          gluten_free,
          starter,
          chicken_dish,
          tandoor_dish,
          veg_dish,
          vegan,
          lamb_dish,
        });
      } else {
        await addDoc(alaCarteCollection, {
          title,
          description,
          price,
          lactose_free,
          nut_free,
          gluten_free,
          starter,
          chicken_dish,
          tandoor_dish,
          veg_dish,
          vegan,
          lamb_dish,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
      window.location.href = "./AlaCarte";
    }
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="flex-col p-5 bg-slate-200 rounded-lg">
      <div className="flex-col justify-between">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <InputLabel label="Title" />
            <Input
              type="text"
              className=""
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
          <div className="mb-5">
            <InputLabel label="Price" />
            <Input
              type="number"
              className=""
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <InputLabel label="Dish Type" />
            <select
              value={dishType}
              onChange={(e) => {
                const selectedDishType = e.target.value;
                setDishType(selectedDishType);
                handleDishTypeChange(selectedDishType);
              }}
              className="w-full bg-gray-100 rounded-md border border-[#e0e0e0] py-3 px-1 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              <option value="chicken_dish">Chicken</option>
              <option value="lamb_dish">Lamb</option>
              <option value="starter">Starter</option>
              <option value="tandoor_dish">Tandoor</option>
              <option value="veg_dish">Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
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
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="w-42 p-4 rounded-xl text-white font-bold border-blue-600 bg-blue-600"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlaCarteItem;
