import { useState } from "react";
import { Modal } from "antd";
import useFoodMenu from "../hooks/useFoodMenu";
import Item from "../components/Item";
import Button from "../components/Button";

const LunchMenu = () => {
  const [day, setDay] = useState("");
  const [selectedButton, setSelectedButton] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { lunchItem } = useFoodMenu();
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const d = new Date();
  let today = weekday[d.getDay()];

  const filteredMenu = lunchItem.filter(item => item.days.includes(day));

  const showModal = (item) => {
    setIsOpen(true);
    setSelectedItem(item);
  };

  const hideModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  const handleDayClick = (name, id) => {
    // Handle the card click event here
    setSelectedButton(id)
    setDay(name)
  };

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
            <Category id="1" item="Maanantai" />
            <Category id="2" item="Tiistai" />
            <Category id="3" item="Keskiviikko" />
            <Category id="4" item="Torstai" />
            <Category id="5" item="Perjantai" />
          </div>
          <div className='m-5 rounded-lg p-3 '>
          <hr className="border-orange-500" />
          {filteredMenu.map((item, index) => (
            <div 
              key={index} 
              className="w-full bg-slate-100 p-2 mb-5 mt-5 shadow-md rounded-lg"
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
                      size="large"
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