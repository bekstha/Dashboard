import { useEffect, useState } from "react";
import { Modal } from "antd";
import useFoodMenu from "../hooks/useFoodMenu";
import { IoAddCircleOutline } from "react-icons/io5";
import Item from "../components/LunchItem";
import Button from "../components/Button";

const LunchMenu = () => {
  const [day, setDay] = useState("");
  const [selectedButton, setSelectedButton] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { lunchItem } = useFoodMenu();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredMenu = lunchItem.filter(item => item.days.includes(day));
  console.log("isOpen " + isOpen)

  const showModal = (item) => {
    setIsOpen(true);
    setSelectedItem(item);
  };

  const hideModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  const showAddModal = () => setIsAddOpen(true);
  const hideAddModal = () => setIsAddOpen(false);

  const handleDayClick = (name, id) => {
    // Handle the card click event here
    setSelectedButton(id)
    setDay(name)
  };

  useEffect(() => {
    handleDayClick("Maanantai", 1)
  }, []);

  const Category = ({item, id}) => {
    return(
      <div className="">
          <button
              onClick={() => handleDayClick(item, id)}
              type="button"
              className={`rounded-md font-bold text-medium p-2 border border-black ${selectedButton === id ? 'bg-green-500 text-white' : ''}`}>
              {item}
          </button>
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      
      <div className='border w-full m-5 bg-gray-200'>

        <div className='flex-col justify-center '>
          <div className='flex justify-between m-5 p-2'>
            <div className="flex justify-between gap-10">
            <button
                onClick={() => handleDayClick("Maanantai", 1)}
                type="button"
                className={`font-bold italic rounded-md text-medium p-2 border border-black ${selectedButton === 1 ? 'bg-green-500 text-white animate-wiggle' : ''}`}>
                  Maanantai
              </button>
              <Category id="2" item="Tiistai" />
              <Category id="3" item="Keskiviikko" />
              <Category id="4" item="Torstai" />
              <Category id="5" item="Perjantai" />
            </div>
            <button 
              onClick={() => showAddModal()}
              className="flex items-center gap-4 text-xl shadow-2xl p-2 bg-white">
              <IoAddCircleOutline />
               Add new menu
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
                <Item />
              </Modal>
          </div>
          <div className='m-5 rounded-lg p-3 '>
          <hr className="border-orange-500" />
          {filteredMenu.map((item, index) => (
            <div 
              key={index} 
              className="w-full bg-white p-2 mb-5 mt-5 shadow-md rounded-lg"
            >
              <button onClick={() => showModal(item)} className="text-medium italic tracking-wide p-3">{item.description}</button>
              <Modal
                open={isOpen}
                onOk={hideModal}
                onCancel={hideModal}
                title="Edit Item"
                width={700}
                footer={() => (
                  <Button
                      size="small"
                      outlined
                      className="!text-black flex-1 border-gray-600"
                      onClick={hideModal}
                    >
                      Cancel
                    </Button>
                )}
              >
              {selectedItem && (
                <div>
                  <Item itemId={selectedItem.id} />
                </div>
              )}
              </Modal>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LunchMenu