import { useState, useEffect } from "react";
import { Input, InputLabel, Textarea } from "./Input";
import LoadingScreen from "./LoadingScreen";
import { Checkbox } from "antd";
import useFoodMenu from "../hooks/useFoodMenu";

const Item = ({ itemId, itemName, dayName }) => {
  console.log(dayName)
  const [lactose_free, setLactoseFree] = useState();
  const [gluten_free, setGlutenFree] = useState();
  const [nut_free, setNutFree] = useState();
  const [day, setDay] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const { updateLunch, addLunch } = useFoodMenu()

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
      setDay(dayName)
      setIsFormDirty(true)
    }
  }, [itemId, dayName]);

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
    return !day.length || !description.trim() || lactose_free === undefined || gluten_free === undefined || nut_free === undefined ;
  };

  const isSubmitDisabled = () => {
    return !isFormDirty || isFormEmpty();
  };

  const handleDayChange = (e) => {
    const inputValue = e.target.value;
    // Assuming the input value is a comma-separated string, convert it to an array
    const daysArray = inputValue.split(",").map((day) => day.trim());
    setDay(daysArray);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const newData = {
        day, description, lactose_free, nut_free, gluten_free,
      };

      if (itemId) {
        await updateLunch(itemId, newData)
      } else {
        await addLunch(day, description, lactose_free, nut_free, gluten_free);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
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
              className={`w-36 p-4 rounded-xl text-white text-base sm:text-lg border-blue-600 ${
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
  );
};

export default Item;
