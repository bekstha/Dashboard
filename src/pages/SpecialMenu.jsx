import React, { useState } from 'react'
import { Input, InputLabel } from '../components/Input';
import LoadingScreen from '../components/LoadingScreen';
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { IoAddCircleOutline } from 'react-icons/io5';
import Button from "../components/Button";
import Modal from 'antd/es/modal/Modal';
import SpecialMenuItem from '../components/SpecialMenuItem';
import useSpecialMenu from '../hooks/useSpecialMenu';

const SpecialMenu = ({}) => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const showAddModal = () => setIsAddOpen(true);
    const hideAddModal = () => setIsAddOpen(false);

    const showEditModel = (item) => {
        setIsEditOpen(true);
        setSelectedItem(item);
      };
    
      const hideEditModal = () => {
        setIsEditOpen(false);
        setSelectedItem(null);
      };

    const { specialMenu } = useSpecialMenu();

    return(
        <div className='flex justify-center'>
            <div className='border w-full m-5 p-3 bg-slate-100'>
                <div className="xl:flex hidden gap-10 justify-between">
                    <button 
                    onClick={() => showAddModal()}
                    className="xl:flex border hidden h-fit items-center gap-4 text-xl hover:shadow-2xl p-2 bg-white rounded-lg">
                    <IoAddCircleOutline />
                    Add special menu
                    </button>
                    <Modal
                        open={isAddOpen}
                        onOk={hideAddModal}
                        onCancel={hideAddModal}
                        title="Add Item"
                        width={700}
                        footer={() => (
                        <Button
                            size="small"
                            outlined
                            color="orange"
                            className="!text-black flex-1 border-gray-600"
                            onClick={hideAddModal}
                            >
                            Cancel
                            </Button>
                        )}
                    >
                        <SpecialMenuItem />
                    </Modal>
                </div>
                {specialMenu.map((item, index) => (
                    <div 
                        key={index} 
                        className="w-full bg-white p-2 mb-5 mt-5 shadow-md rounded-lg cursor-pointer"
                    >
                        <p onClick={() => showEditModel(item)} className="text-medium italic tracking-wide p-3">{item.title} {item.day}</p>
                        <Modal
                        open={isEditOpen}
                        onOk={hideEditModal}
                        onCancel={hideEditModal}
                        title="Edit Item"
                        width={700}
                        footer={() => (
                            <Button
                                size="small"
                                outlined
                                className="!text-black flex-1 border-gray-600"
                                onClick={hideEditModal}
                            >
                                Cancel
                            </Button>
                        )}
                        >
                        {selectedItem && (
                            <div>
                            <SpecialMenuItem itemId={selectedItem.id} itemName={selectedItem} />
                            </div>
                        )}
                    </Modal>
                </div>
                ))}
            </div>
        </div>
    )
};

export default SpecialMenu