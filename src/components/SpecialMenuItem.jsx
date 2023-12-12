import { useEffect, useState } from "react";
import { Input, InputLabel } from "./Input";
import LoadingScreen from "./LoadingScreen";
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Success from "./Success";

const SpecialMenuItem = ({ itemId, itemName, hideEditModal, hideAddModal }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();
  const [price, setPrice] = useState([]);
  const [starters, setStarters] = useState([]);
  const [lightbites, setLightbites] = useState([]);
  const [maincourse, setMaincourse] = useState([]);
  const [desserts, setDessert] = useState([]);
  const [beverage, setBeverages] = useState([]);
  const [message, setMessage] = useState("");
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (itemId) {
      setTitle(itemName.title);
      setStartDay(itemName.start_date);
      setEndDay(itemName.end_date);
      setPrice(itemName.price);
      setStarters(itemName.starters);
      setLightbites(itemName.lightbites);
      setMaincourse(itemName.maincourse);
      setDessert(itemName.desserts);
      setBeverages(itemName.beverage);
      setMessage(itemName.message);
    } else {
      setTitle("");
      setStartDay("");
      setEndDay("");
      setPrice("");
      setStarters("");
      setLightbites("");
      setMaincourse("");
      setDessert("");
      setBeverages("");
      setMessage("");
      setIsFormDirty(true);
    }
    setIsSuccess(false);
  }, [itemId, hideEditModal, hideAddModal]);

  useEffect(() => {
    if (itemId) {
      const isDirty = [
        title !== itemName.title,
        startDay !== itemName.start_date,
        endDay !== itemName.end_date,
        !arraysEqual(price, itemName.price),
        !arraysEqual(starters, itemName.starters),
        !arraysEqual(lightbites, itemName.lightbites),
        !arraysEqual(maincourse, itemName.maincourse),
        !arraysEqual(desserts, itemName.desserts),
        !arraysEqual(beverage, itemName.beverage),
        message !== itemName.message,
      ].some(Boolean);
      setIsFormDirty(isDirty);
    }
  }, [
    title,
    startDay,
    endDay,
    price,
    starters,
    lightbites,
    maincourse,
    desserts,
    beverage,
    message,
  ]);

  function arraysEqual(arr1, arr2) {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])
    );
  }

  const isFormEmpty = () => {
    return (
      !title ||
      !startDay ||
      !endDay ||
      !price ||
      !beverage ||
      !starters ||
      !lightbites ||
      !maincourse ||
      !desserts ||
      !message
    );
  };

  const isSubmitDisabled = () => {
    return !isFormDirty || isFormEmpty();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const specialMenucollection = collection(db, "SpecialMenu");

      if (itemId) {
        const specialMenuRef = doc(specialMenucollection, itemId);
        await updateDoc(specialMenuRef, {
          beverage,
          start_date: startDay,
          end_date: endDay,
          price,
          desserts,
          lightbites,
          maincourse,
          starters,
          title,
          message,
        });
      } else {
        await addDoc(specialMenucollection, {
          beverage,
          start_date: startDay,
          end_date: endDay,
          price,
          desserts,
          lightbites,
          maincourse,
          starters,
          title,
          message,
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
  ) : ( isSuccess ? 
    (<Success itemId={itemId} description={title} />) 
    : (
    <div className="flex-col p-5 bg-slate-200 rounded-lg p-5 m-4">
      <div className="flex-col justify-between">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <InputLabel label="Title" />
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <InputLabel label="Day (Start - End)" />
            <div className="flex">
              <Input
                type="date"
                placeholder="Day"
                value={startDay}
                onChange={(e) => setStartDay(e.target.value)}
              />
              <Input
                type="date"
                placeholder="Day"
                value={endDay}
                onChange={(e) => setEndDay(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-5">
            <InputLabel label="Price" />
            <Input
              type="text"
              placeholder="Normalli, lapset(6-12), lapset(3-5)"
              value={price}
              onChange={(e) => {
                const input = e.target.value;
                const inputArray = input.split(",");
                setPrice(inputArray);
              }}
            />
          </div>

          <div className="mb-5">
            <InputLabel label="Starters" />
            <Input
              type="text"
              className=""
              placeholder="Starters"
              value={starters}
              onChange={(e) => {
                const input = e.target.value;
                const inputArray = input.split(",");
                setStarters(inputArray);
              }}
            />
          </div>

          <div className="mb-5">
            <InputLabel label="Light Bites" />
            <Input
              type="text"
              className=""
              placeholder="Light Bites"
              value={lightbites}
              onChange={(e) => {
                const input = e.target.value;
                const inputArray = input.split(",");
                setLightbites(inputArray);
              }}
            />
          </div>

          <div className="mb-5">
            <InputLabel label="Main course" />
            <Input
              type="text"
              className=""
              placeholder="Main course"
              value={maincourse}
              onChange={(e) => {
                const input = e.target.value;
                const inputArray = input.split(",");
                setMaincourse(inputArray);
              }}
            />
          </div>

          <div className="mb-5">
            <InputLabel label="Dessert" />
            <Input
              type="text"
              className=""
              placeholder="Dessert"
              value={desserts}
              onChange={(e) => {
                const input = e.target.value;
                const inputArray = input.split(",");
                setDessert(inputArray);
              }}
            />
          </div>
          <div className="mb-5">
            <InputLabel label="Beverages" />
            <Input
              type="text"
              className=""
              placeholder="Beverages"
              value={beverage}
              onChange={(e) => {
                const input = e.target.value;
                const inputArray = input.split(",");
                setBeverages(inputArray);
              }}
            />
          </div>

          <div className="mb-5">
            <InputLabel label="Message" />
            <Input
              type="text"
              className=""
              placeholder="Special Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className={`w-42 p-4 rounded-xl text-white font-bold border-blue-600 ${
                isSubmitDisabled()
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600"
              }`}
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

export default SpecialMenuItem;
