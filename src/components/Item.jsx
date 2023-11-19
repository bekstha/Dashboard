import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Input, InputLabel, Textarea } from './Input';
import { db } from "..";
import { addDoc, collection } from "firebase/firestore";

const Item = () => {
    const [lactoseFree, setLactoseFree] = useState(true);
    const [glutenFree, setGlutenFree] = useState(true);
    const [nutFree, setNutFree] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const lunchMenuCollection = collection(db, "LunchMenu");
          const lunchMenuRef = await addDoc(lunchMenuCollection, {

          });

        } catch (error) {
          console.error("Error submitting form:", error);
        }
    };

    return (
        <div className='flex-col p-5'>
        <div className='flex justify-between text-2xl mb-5 font-medium'>
            <span>Item 1</span>
            <div className='flex gap-7'>
                <FaEdit />
                <RiDeleteBinLine />
            </div>
        </div>
        <div className='flex-col justify-between'>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <InputLabel label="Title" />
                    <Input
                        type="text"
                        className="title"
                        placeholder="Title"
                        value={title}
                        onChange={e =>setTitle(e.target.value)}
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
                <div className="mb-5">
                    <InputLabel label="Price" />
                    <Input
                        type="number"
                        className="price"
                        placeholder="Price"
                        value={price}
                        onChange={e =>setPrice(e.target.value)}
                    />
                </div>
                <div className='flex-col justify-between'>
                    <div className="flex gap-10 mb-5">
                        <InputLabel label="Gluten Free" />
                        <div className='flex gap-10'>
                            <div className="flex items-center">
                                <input
                                type="radio"
                                className="h-5 w-5"
                                value="true"
                                checked = {glutenFree === true}
                                onChange={e => setGlutenFree(e.target.value === 'true')}
                                />
                                <label className="pl-3 text-base font-medium text-black">
                                Yes
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                type="radio"
                                className="h-5 w-5"
                                value="false"
                                checked = {glutenFree === false}
                                onChange={e => setGlutenFree(e.target.value === 'true')}
                                />
                                <label className="pl-3 text-base font-medium text-black ">
                                No
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-10">
                        <InputLabel label="Lactose Free" />
                        <div className='flex gap-10 mb-5'>
                            <div className="flex items-center">
                                <input
                                type="radio"
                                className="h-5 w-5"
                                value="true"
                                checked = {lactoseFree === true}
                                onChange={e => setLactoseFree(e.target.value === 'true')}
                                />
                                <label className="pl-3 text-base font-medium text-black">
                                Yes
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                type="radio"
                                className="h-5 w-5"
                                value="false"
                                checked = {lactoseFree === false}
                                onChange={e => setLactoseFree(e.target.value === 'true')}
                                />
                                <label className="pl-3 text-base font-medium text-black ">
                                No
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-10">
                        <InputLabel label="Nut Free" />
                        <div className='flex gap-10'>
                        <div className="flex items-center">
                            <input
                            type="radio"
                            className="h-5 w-5"
                            value="true"
                            checked = {nutFree === true}
                            onChange={e => setNutFree(e.target.value === "true")}
                            />
                            <label className="pl-3 text-base font-medium text-black">
                            Yes
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                            type="radio"
                            className="h-5 w-5"
                            value="false"
                            checked = {nutFree === false}
                            onChange={e => setNutFree(e.target.value === "true")}
                            />
                            <label className="pl-3 text-base font-medium text-black ">
                            No
                            </label>
                        </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Item