import { useState, useEffect } from "react";
import { Input, InputLabel, Textarea } from "./Input";
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import LoadingScreen from "./LoadingScreen";
import Success from "./Success";

const AlaCarteItem = ({ itemId, itemName, dishName, hideEditModal, hideAddModal }) => {
  console.log(dishName);
  const [lactose_free, setLactoseFree] = useState("");
  const [gluten_free, setGlutenFree] = useState("");
  const [nut_free, setNutFree] = useState("");
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
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      setDishType(dishName);
    } else {
      setTitle("");
      setDescription("");
      setLactoseFree("");
      setGlutenFree("");
      setNutFree("");
      setPrice("");
      setChicken("");
      setStarter("");
      setTandoor("");
      setVegetarian("");
      setVegan("");
      setLamb("");
      setDishType(dishName);
      setDishType(dishName);
      setIsFormDirty(true);
    }
    setIsSuccess(false);
  }, [itemId, dishName, hideEditModal, hideAddModal]);

  useEffect(() => {
    if (itemId) {
      const isDirty = [
        title !== itemName.title,
        description !== itemName.description,
        lactose_free !== itemName.lactose_free,
        gluten_free !== itemName.gluten_free,
        nut_free !== itemName.nut_free,
        price !== itemName.price,
        chicken_dish !== itemName.chicken_dish,
        starter !== itemName.starter,
        tandoor_dish !== itemName.tandoor_dish,
        lamb_dish !== itemName.lamb_dish,
        veg_dish !== itemName.veg_dish,
        vegan !== itemName.vegan,
      ].some(Boolean);
      setIsFormDirty(isDirty);
    }
  }, [
    title,
    description,
    lactose_free,
    gluten_free,
    nut_free,
    price,
    chicken_dish,
    starter,
    tandoor_dish,
    lamb_dish,
    veg_dish,
    vegan,
  ]);

  const isFormEmpty = () => {
    return (
      !title.trim() ||
      !description.trim() ||
      lactose_free === "" ||
      gluten_free === "" ||
      nut_free === "" ||
      dishType === ""
    );
  };

  const isSubmitDisabled = () => {
    return !isFormDirty || isFormEmpty();
  };

  const handleDishTypeChange = (selectedDishType) => {
    setDishType(selectedDishType);
    setChicken(selectedDishType === "Chicken");
    setStarter(selectedDishType === "Starters");
    setTandoor(selectedDishType === "Tandoor");
    setVegetarian(selectedDishType === "Vegetarian");
    setVegan(selectedDishType === "Vegan");
    setLamb(selectedDishType === "Lamb");
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
      setIsSuccess(true);
    }
  };

  return loading ? (
    <LoadingScreen />
  ) : (  isSuccess ? 
    (<Success itemId={itemId} description={title} />) 
    : (
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
              className="w-full bg-gray-100 rounded-md border border-[#e0e0e0] py-3 px-1 text-sm sm:text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              <option value="">--Select--</option>
              <option value="Chicken">Chicken</option>
              <option value="Lamb">Lamb</option>
              <option value="Starters">Starter</option>
              <option value="Tandoor">Tandoor</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>
          <div className="flex-col justify-between">
            <div className="sm:w-1/3">
              <div className="mb-5">
                <label className="mb-3 block text-sm sm:text-base font-medium text-left">
                  Gluten Free
                </label>
                <select
                  value={gluten_free}
                  onChange={(e) => setGlutenFree(e.target.value === "true")}
                  className="w-full bg-gray-100 rounded-md border border-[#e0e0e0] py-3 px-1 text-sm sm:text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="">--Select--</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>

            <div className="sm:w-1/3">
              <div className="mb-5">
                <label className="mb-3 block text-sm sm:text-base font-medium text-left">
                  Lactose Free
                </label>
                <select
                  value={lactose_free}
                  onChange={(e) => setLactoseFree(e.target.value === "true")}
                  className="w-full bg-gray-100 rounded-md border border-[#e0e0e0]  py-3 px-1 text-sm sm:text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="">--Select--</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>

            <div className="sm:w-1/3">
              <div className="mb-5">
                <label className="mb-3 block text-sm sm:text-base font-medium text-left">
                  Nut Free
                </label>
                <select
                  value={nut_free}
                  onChange={(e) => setNutFree(e.target.value === "true")}
                  className="w-full bg-gray-100 rounded-md border border-[#e0e0e0]  py-3 px-1 text-sm sm:text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="">--Select--</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className={`w-42 p-4 rounded-xl text-white text-sm sm:text-base font-bold border-blue-600 ${
                isSubmitDisabled()
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600"
              }`}
              disabled={isSubmitDisabled()}
            >
              {itemId === undefined ? "Add Menu" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
    )
  );
};

export default AlaCarteItem;
