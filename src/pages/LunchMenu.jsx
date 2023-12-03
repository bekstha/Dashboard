import { useEffect, useState } from "react";
import { Modal } from "antd";
import useFoodMenu from "../hooks/useFoodMenu";
import { IoAddCircleOutline } from "react-icons/io5";
import Item from "../components/LunchItem";
import Button from "../components/Button";
import LoadingScreen from "../components/LoadingScreen";

const LunchMenu = () => {
  const [day, setDay] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { lunchItem, deleteLunch } = useFoodMenu();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [dishName, setDishName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const filteredMenu = lunchItem.filter((item) => item.day.includes(day));

  useEffect(() => {
    if (lunchItem.length > 0) {
      setLoading(false);
    }
  }, [lunchItem]);

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

  const handleDayClick = (name) => {
    setDishName(name);
    setDay(name);
  };

  useEffect(() => {
    handleDayClick("Maanantai");
  }, []);

  const removeLunchItem = async (id) => {
    console.log(id);
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

  const Category = ({ item }) => {
    return (
      <div
        onClick={() => handleDayClick(item)}
        className={`cursor-pointer rounded-md font-bold text-medium h-fit p-2 border border-black ${
          dishName === item ? "bg-green-500 text-white" : ""
        }`}
      >
        {item}
      </div>
    );
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="flex justify-center">
      <div className="border w-full m-5 bg-slate-100">
        <div className="flex-col justify-center ">
          <div className="relative flex justify-between items-center m-5 p-3 gap-10 overflow-x-auto scrollbar-hide">
            <div className="flex gap-10">
              <Category item="Maanantai" />
              <Category item="Tiistai" />
              <Category item="Keskiviikko" />
              <Category item="Torstai" />
              <Category item="Perjantai" />
            </div>
            <div
              onClick={() => showAddModal()}
              className="flex cursor-pointer min-w-fit items-center gap-4 text-xl hover:shadow-2xl p-2 bg-white rounded-lg"
            >
              <IoAddCircleOutline />
              Add new menu
            </div>
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
          <div className="m-5 rounded-lg p- ">
            <hr className="border-orange-500" />
            {filteredMenu.map((item, index) => (
              <div
                key={index}
                className="sm:flex justify-between items-center w-full bg-white p-2 mb-5 mt-5 shadow-md rounded-lg"
              >
                <p className="text-medium italic tracking-wide p-3">
                  {item.description}
                </p>
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
  );
};

export default LunchMenu;
