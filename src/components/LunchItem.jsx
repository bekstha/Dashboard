import React, { useState, useEffect  } from 'react'
import { Input, InputLabel, Textarea } from './Input';
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import LoadingScreen from './LoadingScreen';
import useFoodMenu from '../hooks/useFoodMenu';

const Item = ({itemId, itemName}) => {
    const [lactose_free, setLactoseFree] = useState(true);
    const [gluten_free, setGlutenFree] = useState(true);
    const [nut_free, setNutFree] = useState(true);
    const [day, setDay] = useState([]);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (itemId) {
            setDay(itemName.day);
            setDescription(itemName.description);
            setLactoseFree(itemName.lactose_free);
            setGlutenFree(itemName.gluten_free);
            setNutFree(itemName.nut_free);
          }
    }, [itemId]);

    const handleDayChange = (e) => {
        const inputValue = e.target.value;
        // Assuming the input value is a comma-separated string, you can convert it to an array
        const daysArray = inputValue.split(',').map(day => day.trim());
        setDay(daysArray);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true)
            const lunchMenuCollection = collection(db, "LunchMenu");

            if(itemId) {
                const lunchMenuRef = doc(lunchMenuCollection, itemId);

                await updateDoc(lunchMenuRef, {
                    day,
                    description,
                    lactose_free,
                    nut_free,
                    gluten_free
                });
            } else {
                await addDoc(lunchMenuCollection, {
                    day,
                    description,
                    lactose_free,
                    nut_free,
                    gluten_free
                });
            }

        } catch (error) {
          console.error("Error submitting form:", error);

        } finally {
            setLoading(false)
        }
    };

    return loading ? (
        <LoadingScreen />
        ) : (
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
                    <div className="flex justify-center mt-10">
                    <button
                        type="submit"
                        className="w-42 p-4 rounded-xl text-white font-bold border-blue-600 bg-blue-600">
                        Save changes
                    </button>
                    </div>
                </form>

            </div>
        </div>
    )
};

export default Item