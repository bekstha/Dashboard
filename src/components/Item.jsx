import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Input, InputLabel, Textarea } from './Input';

const Item = () => {
    const [categoryName, setCategoryName] = useState("");
    const [subCategoryName, setSubCategoryName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    return (
        <div className='flex-col p-5'>
        <div className='flex justify-between text-2xl mb-5 font-medium'>
            <span>Item 1</span>
            <div className='flex gap-7'>
                <FaEdit />
                <RiDeleteBinLine />
            </div>
        </div>
        <div className=''>
            <form className='flex-col justify-between'>
                <div className="mb-5">
                    <InputLabel label="Category" />
                    <Input
                        type="text"
                        className="categoryName"
                        placeholder="category Name"
                        value={categoryName}
                        onChange={e =>setCategoryName(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <InputLabel label="Sub-Category" />
                    <Input
                        type="text"
                        className="subCategoryName"
                        placeholder="Sub Category Name"
                        value={subCategoryName}
                        onChange={e =>setSubCategoryName(e.target.value)}
                    />
                </div>
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
            </form>
        </div>
    </div>
  )
}

export default Item