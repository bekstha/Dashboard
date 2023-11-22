import React from "react";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import useAlacarteMenu from "../hooks/useAlaCarteMenu";
import CardHeader from "../components/CardHeader";
import { Modal } from "antd";
import Button from "../components/Button";
import AlaCarteItem from "../components/AlacarteItem";

const ALaCarte = () => {
  const [itemName, setItemName] = useState("");
  const [selectedButton, setSelectedButton] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { starters, chickenDish, lambDish, vegDish, tandoorDish, veganFood } = useAlacarteMenu();

  const Category = ({item, id}) => {
    return(
        <div
            onClick={() => handleItemClick(item, id)}
            className={`cursor-pointer rounded-md font-bold text-medium p-2 border border-black ${selectedButton === id ? 'bg-green-500 text-white' : ''}`}>
            {item}
        </div>
    )
  };

  const DishItems = ({dishName, index}) => {

    const handleItemClick = () => {
      showEditModal(dishName);
    };

    return (
        <React.Fragment key={index}>
            <div onClick={handleItemClick} className="bg-white p-3 mt-5 shadow-md rounded-lg cursor-pointer">
                <CardHeader dish={dishName.title} price={dishName.price + `\u20AC`} />
                <hr className="border-orange-500" />
                <p className="text-sm italic tracking-wide mt-2 mb-2"> 
                  {dishName.description}
                </p>
            </div>
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
                  <AlaCarteItem itemId={selectedItem.id} />
                </div>
              )}
              </Modal>
        </React.Fragment>
    )
  };

  const handleItemClick = (item, id) => {
    // Handle the card click event here
    setSelectedButton(id);
    setItemName(item);
  };

  const showEditModal = (item) => {
    console.log(item)
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
      
      <div className='border w-full m-5 bg-gray-200'>

        <div className='flex-col justify-center '>
          <div className='flex justify-between m-5 p-2'>
            <div className="flex justify-between gap-10">
              <div
                onClick={() => handleItemClick("Starters", 1)}
                className={`cursor-pointer font-bold italic rounded-md text-medium p-2 border border-black ${selectedButton === 1 ? 'bg-green-500 text-white animate-wiggle' : ''}`}>
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
              className="flex items-center gap-4 text-xl hover:shadow-2xl p-2 bg-white rounded-lg">
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
            starters.map((starter, index) => (
            <DishItems dishName={starter} key={index} />
          ))}

          {itemName === "Vegetarian" &&
              vegDish.map((veg, index) => (
              <DishItems dishName={veg} key={index} />
          ))}

          {itemName === "Lamb" &&
              lambDish.map((lamb, index) => (
                  <DishItems dishName={lamb} key={index} />
          ))}

          {itemName === "Chicken" &&
              chickenDish.map((chicken, index) => (
                <DishItems dishName={chicken} key={index} />
          ))}

          {itemName === "Tandoor" &&
              tandoorDish.map((tandoor, index) => (
                <DishItems dishName={tandoor} key={index} />
          ))}

          {itemName === "Vegan" &&
              veganFood.map((veganfood, index) => (
                  <DishItems dishName={veganfood} key={index} />
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ALaCarte