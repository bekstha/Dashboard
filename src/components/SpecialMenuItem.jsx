import React, { useEffect, useState } from 'react'
import { Input, InputLabel } from './Input';
import LoadingScreen from './LoadingScreen';
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const SpecialMenuItem = ({itemId, itemName}) => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [day, setDay] = useState();
    const [price, setPrice] = useState([]);
    const [starters, setStarters] = useState([]);
    const [lightbites, setLightbites] = useState([]);
    const [maincourse, setMaincourse] = useState([]);
    const [desserts, setDessert] = useState([]);
    const [beverage, setBeverages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(itemId) {
            setTitle(itemName.title);
            setDay(itemName.day);
            setPrice(itemName.price);
            setStarters(itemName.starters);
            setLightbites(itemName.lightbites);
            setMaincourse(itemName.maincourse);
            setDessert(itemName.desserts);
            setBeverages(itemName.beverage);
            setMessage(itemName.message);
        }
    }, [itemId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true)
            const specialMenucollection = collection(db, "SpecialMenu");
    
            if(itemId) {
                const specialMenuRef = doc(specialMenucollection, itemId);
                await updateDoc(specialMenuRef, {
                    beverage,
                    day,
                    price,
                    desserts,
                    lightbites,
                    maincourse,
                    starters,
                    title,
                    message
                });
    

            } else {
                await addDoc(specialMenucollection, {
                    beverage,
                    day,
                    price,
                    desserts,
                    lightbites,
                    maincourse,
                    starters,
                    title,
                    message
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
        <div className='flex-col p-5 bg-slate-200 rounded-lg p-5 m-4'>
            
            <div className='flex-col justify-between'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <InputLabel label="Title" />
                        <Input
                            type="text"
                            className=""
                            placeholder="Title"
                            value={title}
                            onChange={e =>setTitle(e.target.value)}
                        />
                    </div>
    
                    <div className="mb-5">
                        <InputLabel label="Day" />
                        <Input
                            type="date"
                            className=""
                            placeholder="Day"
                            value={day}
                            onChange={e =>setDay(e.target.value)}
                        />
                    </div>
    
                    <div className="mb-5">
                        <InputLabel label="Price" />
                        <Input
                            type="text"
                            className=""
                            placeholder="Price(normalli, lapset(6-12), lapset(3-5))"
                            value={price}
                            onChange={e => {
                                const input = e.target.value;
                                const inputArray = input.split(',');
                                setPrice(inputArray)
                            }}
                        />
                    </div>
    
                    <div className="mb-5">
                        <InputLabel label="Alkuruoka" />
                        <Input
                            type="text"
                            className=""
                            placeholder="Alkuruoka"
                            value={starters}
                            onChange={e => {
                                const input = e.target.value;
                                const inputArray = input.split(',');
                                setStarters(inputArray)
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
                            onChange={e => {
                              const input = e.target.value;
                              const inputArray = input.split(',');
                              setLightbites(inputArray)
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
                            onChange={e => {
                              const input = e.target.value;
                              const inputArray = input.split(',');
                              setMaincourse(inputArray)
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
                            onChange={e => {
                              const input = e.target.value;
                              const inputArray = input.split(',');
                              setDessert(inputArray)
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
                            onChange={e => {
                              const input = e.target.value;
                              const inputArray = input.split(',');
                              setBeverages(inputArray)
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
                            onChange={e => setMessage(e.target.value)}
                        />
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
}

export default SpecialMenuItem