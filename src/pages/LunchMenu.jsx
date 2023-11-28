import { useEffect, useState } from "react";
import { Modal } from "antd";
import useFoodMenu from "../hooks/useFoodMenu";
import { IoAddCircleOutline } from "react-icons/io5";
import Item from "../components/LunchItem";
import Button from "../components/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material"

const LunchMenu = () => {
  const [day, setDay] = useState("");
  const [selectedButton, setSelectedButton] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { lunchItem, deleteLunch } = useFoodMenu();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [openLeft, setOpenLeft] = useState(false)
  const [screenSize, setScreenSize] = useState();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const filteredMenu = lunchItem.filter(item => item.days.includes(day));

  const toggleDrawer = () => {setOpenLeft(!openLeft)};
  const hideDeleteModal = () => setIsDeleteModalVisible(false);

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
    setSelectedButton(id)
    setDay(name)
  };

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

  useEffect(() => {
    handleDayClick("Maanantai", 1)
  }, []);

  const removeLunchItem = async (id) => {
    console.log(id)
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this Item?",
      okButtonProps: { className: "bg-green-500 text-white" },
      onOk: () => {
        deleteLunch(id);
      },
      onCancel: hideDeleteModal,
    });
  };

  const Category = ({item, id}) => {
    return(
      <div
        onClick={() => 
          handleDayClick(item, id)
        }
        className={`cursor-pointer rounded-md font-bold xl:mb-0 mb-5 text-medium h-fit p-2 border border-black ${selectedButton === id ? 'bg-green-500 text-white' : ''}`}>
          {item}
      </div>
    )
  };

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
                onClick={() => handleDayClick("Maanantai", 1)}
                className={`cursor-pointer rounded-md font-bold text-medium h-fit mb-5 p-2 border border-black ${selectedButton === 1 ? 'bg-green-500 text-white' : ''}`}>
                  Maanantai
              </div>
              <Category id="2" item="Tiistai" />
              <Category id="3" item="Keskiviikko" />
              <Category id="4" item="Torstai" />
              <Category id="5" item="Perjantai" />
            </div>
            <button 
              onClick={() => showAddModal()}
              className="flex justify-center items-center font-bold rounded-md ml-2 gap-2 text-md shadow-2xl p-4 bg-slate-600 border border-black">
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
              <span className="rounded-full h-2 w-2" />
              <MenuIcon />
            </button>
            <div className="xl:flex hidden gap-10">
              <div
                onClick={() => handleDayClick("Maanantai", 1)}
                className={`cursor-pointer rounded-md font-bold text-medium h-fit p-2 border border-black ${selectedButton === 1 ? 'bg-green-500 text-white' : ''}`}>
                  Maanantai
              </div>
              <Category id="2" item="Tiistai" />
              <Category id="3" item="Keskiviikko" />
              <Category id="4" item="Torstai" />
              <Category id="5" item="Perjantai" />
            </div>
            <button 
              onClick={() => showAddModal()}
              className="xl:flex hidden  h-fit items-center gap-4 text-xl hover:shadow-2xl p-2 bg-white rounded-lg">
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
              className="sm:flex justify-between items-center w-full bg-white p-2 mb-5 mt-5 shadow-md rounded-lg"
            >
              <p  className="text-medium italic tracking-wide p-3">{item.description}</p>
              <div className="flex justify-items-center p-3">
                  <button
                    className="bg-orange-300 hover:bg-orange-400 px-3 py-1 h-8  rounded-md text-xs"
                    onClick={() => showModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-2 bg-red-300 hover:bg-red-400 px-3 py-1 h-8 rounded-md text-xs"
                    onClick={() => removeLunchItem(item.id)}
                  >
                    Delete
                  </button>
              </div>
            </div>
          ))}
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
                      className="!text-black border-gray-600"
                      onClick={hideModal}
                    >
                      Cancel
                    </Button>
                )}
              >
              {selectedItem && (
                <div>
                  <Item itemId={selectedItem.id} itemName={selectedItem} />
                </div>
              )}
              </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LunchMenu