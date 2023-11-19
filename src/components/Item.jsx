import React, { useState, useEffect  } from 'react'
import { Input, InputLabel, Textarea } from './Input';
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import useFoodMenu from "../hooks/useFoodMenu";

const Item = ({itemId}) => {
    console.log(itemId)
    const [lactose_free, setLactoseFree] = useState(true);
    const [gluten_free, setGlutenFree] = useState(true);
    const [nut_free, setNutFree] = useState(true);
    const [day, setDay] = useState([]);
    const [description, setDescription] = useState("");
    const { lunchItem } = useFoodMenu();

    useEffect(() => {
        const filteredItem = lunchItem.find(item => item.id === itemId);
        if (filteredItem) {
            setDay(filteredItem.days);
            setDescription(filteredItem.description);
            setLactoseFree(filteredItem.lactose_free);
            setGlutenFree(filteredItem.gluten_free);
            setNutFree(filteredItem.nut_free);
          }
        console.log("items " + lactose_free)
    }, [itemId, lunchItem]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const lunchMenuCollection = collection(db, "LunchMenu");
          const lunchMenuRef = await addDoc(lunchMenuCollection, {
            day,
            description,
            lactose_Free,
            nut_Free,
            gluten_Free

          });

        } catch (error) {
          console.error("Error submitting form:", error);
        }
    };

    return (
        <div className='flex-col p-5 bg-slate-200 rounded-lg'>
            <div className='flex justify-between text-2xl mb-5 font-medium'>
                <span>Item</span>
            </div>
            
            <div className='flex-col justify-between'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <InputLabel label="Day(s)" />
                        <Input
                            type="text"
                            className="Day"
                            placeholder="Day"
                            value={day}
                            onChange={e =>setDay(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <InputLabel label="Description" />
                        <Textarea
                            type="text"
                            className="description"
                            placeholder="Description"
                            value={description}
                            onChange={e =>setDescription(e.target.value)}
                        />
                    </div>
                    <div className='flex-col justify-between'>
                        <div className="sm:w-1/3">
                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium text-left">
                                Gluten Free
                                </label>
                                <select
                                value={gluten_free}
                                onChange={e => setGlutenFree(e.target.value === 'true')}
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
                                Lactose Free
                                </label>
                                <select
                                value={lactose_free}
                                onChange={e => setLactoseFree(e.target.value === 'true')}
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
                                onChange={e => setNutFree(e.target.value === 'true')}
                                className="w-full bg-gray-100 rounded-md border border-[#e0e0e0]  py-3 px-1 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                >
                                <option value="true">True</option>
                                <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="flex justify-center mt-10">
                    <button
                        type="submit"
                        className="w-42 p-4 rounded-xl text-white font-bold bg-gray-500">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Item