import React from "react";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import useAlacarteMenu from "../hooks/useAlaCarteMenu";
import CardHeader from "../components/CardHeader";
import { Modal } from "antd";
import Button from "../components/Button";
import AlaCarteItem from "../components/AlacarteItem";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const ALaCarte = () => {
  const [itemName, setItemName] = useState("");
  const [selectedButton, setSelectedButton] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [openLeft, setOpenLeft] = useState(false)
  const [screenSize, setScreenSize] = useState();
  const { starters, chickenDish, lambDish, vegDish, tandoorDish, veganFood, alaCarte } = useAlacarteMenu();

  const Category = ({item, id}) => {
    return(
        <div
            onClick={() => handleItemClick(item, id)}
            className={`cursor-pointer rounded-md xl:mb-0 mb-5 font-bold h-fit text-medium p-2 border border-black ${selectedButton === id ? 'bg-green-500 text-white' : ''}`}>
            {item}
        </div>
    )
  };

  const DishItems = ({dishName, index}) => {
    const handleItemClick = () => {
      showEditModal(dishName);
    }
    return (
      <React.Fragment key={index}>
          <div 
            className="sm:flex justify-between items-center gap-10 w-full bg-white p-3 mt-5 shadow-md rounded-lg"
          >
              <div className="sm:w-5/6">
                <CardHeader dish={dishName.title} price={dishName.price + `\u20AC`} />
                <hr className="border-orange-500" />
                <p className="text-sm italic tracking-wide mt-2 mb-2"> 
                  {dishName.description}
                </p>
              </div>
              <div className="flex justify-items-center">
                  <button
                    className="bg-orange-300 hover:bg-orange-400 px-3 py-1 h-8 rounded-md text-xs"
                    onClick={handleItemClick} 
                  >
                    Edit
                  </button>
                  <button
                    className="ml-2 bg-red-300 hover:bg-red-400 px-3 py-1 h-8 rounded-md text-xs"
                    onClick={() => console.log("Edit clicked")}
                  >
                    Delete
                  </button>
              </div>
          </div>
      </React.Fragment>
    )
  };

  const toggleDrawer = () => {setOpenLeft(!openLeft)}

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if(screenSize >= 1280){
      setOpenLeft(false)
    }
  }, [screenSize])


  const handleItemClick = (item, id) => {
    // Handle the card click event
    setSelectedButton(id);
    setItemName(item);
  };

  const showEditModal = (item) => {
    setIsEditOpen(true);
    setSelectedItem(item);
  };

  const hideEditModal = () => {
    setIsEditOpen(false);
    setSelectedItem(null);
  };

  const showAddModal = () => setIsAddOpen(true);
  const hideAddModal = () => setIsAddOpen(false);

  useEffect(() => {
    handleItemClick("Starters", 1)
  }, []);

  return (
    <div className="flex justify-center">
      <div className='relative border w-full m-5 bg-slate-100'>
      {openLeft && (
          <div className="absolute bg-slate-300 items-center w-48 h-full rounded-lg">
            <IconButton className="absolute" variant="text" color="blue-gray" onClick={toggleDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6 absolute left-44 bg-white rounded-lg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
            <div className="flex-col p-5">
              <div
                onClick={() => handleItemClick("Starters", 1)}
                className={`cursor-pointer rounded-md font-bold text-medium h-fit mb-5 p-2 border border-black ${selectedButton === 1 ? 'bg-green-500 text-white' : ''}`}>
                  Starters
              </div>
              <Category id="2" item="Vegetarian" />
              <Category id="3" item="Lamb" />
              <Category id="4" item="Chicken" />
              <Category id="5" item="Tandoor" />
              <Category id="6" item="Vegan" />
              <Category id="7" item="Drinks" />
            </div>
            <button 
              onClick={() => showAddModal()}
              className="xl:flex hidden items-center gap-4 text-xl shadow-2xl p-1 bg-white">
              <IoAddCircleOutline />
               Add new menu
            </button>
          </div>
        )}

        <div className='flex-col justify-center '>
          <div className='flex justify-between m-5 p-2'>
          <button
              onClick={toggleDrawer}
              type="button"
              className="xl:hidden text-xl rounded-full p-2 hover:bg-light-gray"
            >
              <span
                className="rounded-full h-2 w-2"
              />
              <MenuIcon />
            </button>
            <div className="xl:flex hidden gap-8">
              <div
                onClick={() => handleItemClick("Starters", 1)}
                className={`cursor-pointer font-bold italic rounded-md h-fit text-medium p-2 border border-black ${selectedButton === 1 ? 'bg-green-500 text-white animate-wiggle' : ''}`}>
                  Starters
              </div>
              <Category id="2" item="Vegetarian" />
              <Category id="3" item="Lamb" />
              <Category id="4" item="Chicken" />
              <Category id="5" item="Tandoor" />
              <Category id="6" item="Vegan" />
              <Category id="7" item="Drinks" />
            </div>
            <button 
              onClick={() => showAddModal()}
              className="xl:flex hidden items-center gap-4 text-xl hover:shadow-2xl p-2 bg-white rounded-lg">
                <IoAddCircleOutline />
               Add new Item
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
                <AlaCarteItem />
              </Modal>
          </div>
          <div className='m-5 rounded-lg p-3 '>
            {itemName === "Starters" &&
              alaCarte.filter((item) => item.starter === true).map((starter, index) => (
              <DishItems dishName={starter} key={index} />
            ))}

            {itemName === "Vegetarian" &&
                alaCarte.filter((item) => item.veg_dish === true).map((veg, index) => (
                <DishItems dishName={veg} key={index} />
            ))}

            {itemName === "Lamb" &&
                alaCarte.filter((item) => item.lamb_dish === true).map((lamb, index) => (
                    <DishItems dishName={lamb} key={index} />
            ))}

            {itemName === "Chicken" &&
                alaCarte.filter((item) => item.chicken_dish === true).map((chicken, index) => (
                  <DishItems dishName={chicken} key={index} />
            ))}

            {itemName === "Tandoor" &&
                alaCarte.filter((item) => item.tandoor_dish === true).map((tandoor, index) => (
                  <DishItems dishName={tandoor} key={index} />
            ))}

            {itemName === "Vegan" &&
                alaCarte.filter((item) => item.vegan === true).map((veganfood, index) => (
                    <DishItems dishName={veganfood} key={index} />
            ))}
            
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
                <AlaCarteItem itemId={selectedItem.id} itemName={selectedItem} />
              </div>
            )}
          </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ALaCarte