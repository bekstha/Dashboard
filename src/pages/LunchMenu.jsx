import { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import useFoodMenu from "../hooks/useFoodMenu";
import { IoAddCircleOutline } from "react-icons/io5";
import Item from "../components/LunchItem";
import Button from "../components/Button";
import LoadingScreen from "../components/LoadingScreen";
import SearchBar from "../components/SearchBar";

const LunchMenu = () => {
  const [day, setDay] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { lunchItem, updateLunch, deleteLunch } = useFoodMenu();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [dishName, setDishName] = useState("");
  const [loading, setLoading] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [addExisting, setAddExisting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { Search } = Input;

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    handleDayClick("Maanantai");
  }, []);

  useEffect(() => {
    if (lunchItem.length > 0) {
      setLoading(false);
    }
  }, [lunchItem]);

  useEffect(() => {
    const filteredMenu = lunchItem.filter((item) => item.day.includes(day));
    if (searchQuery !== "") {
      const filteredData = filteredMenu.filter((item) =>
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(filteredMenu);
    }
  }, [searchQuery, lunchItem, day]);

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
    setSearchQuery("");
    setDishName(name);
    setDay(name);
  };

  const removeLunchItem = async (item) => {
    const itemsToDelete = day;
    // Update the day array by removing the identified items
    const updatedDay = item.day.filter(
      (dayItem) => !itemsToDelete.includes(dayItem)
    );
    console.log(`${updatedDay} ${updatedDay.length}`);
    const newData = {
      day: updatedDay,
    };

    Modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete this item ?`,
      okButtonProps: { className: "bg-green-500 text-white" },
      onOk: () => {
        if (updatedDay.length === 0) {
          deleteLunch(item.id);
        } else {
          updateLunch(item.id, newData);
        }
      },
      onCancel: hideDeleteModal,
    });
  };

  const Category = ({ item }) => {
    return (
      <div
        onClick={() => handleDayClick(item)}
        className={`cursor-pointer rounded-md font-bold text-medium h-fit p-2 border shadow-md ${
          dishName === item ? "bg-green-500 text-black" : ""
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
      <div className="border w-full m-5 bg-slate-100 rounded-lg">
        <div className="flex-col justify-center ">
          <div className="flex flex-wrap justify-between items-center p-3 m-5 gap-8">
            <div className="flex flex-wrap gap-8">
              <Category item="Maanantai" />
              <Category item="Tiistai" />
              <Category item="Keskiviikko" />
              <Category item="Torstai" />
              <Category item="Perjantai" />
            </div>
            <div
              onClick={() => {
                showAddModal();
                setAddNew(true);
                setAddExisting(false);
              }}
              className="flex cursor-pointer min-w-fit items-center gap-4 text-xl hover:shadow-2xl p-2 bg-white rounded-lg"
            >
              <IoAddCircleOutline />
              Add new
            </div>

            <Modal
              open={isAddOpen}
              onOk={hideAddModal}
              onCancel={hideAddModal}
              title="Add Lunch Menu"
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
              <div className="flex w-full gap-5 mb-5 p-4 bg-slate-200 rounded-lg">
                <div
                  onClick={() => {
                    setAddNew(true);
                    setAddExisting(false);
                  }}
                  className={`flex cursor-pointer w-1/2  justify-center text-xl hover:shadow-2xl p-2  rounded-lg ${
                    addNew === true ? "bg-green-500 text-black" : "bg-white"
                  }`}
                >
                  Create new menu
                </div>
                <div
                  onClick={() => {
                    setAddExisting(true);
                    setAddNew(false);
                  }}
                  className={`flex cursor-pointer w-1/2 justify-center text-xl hover:shadow-2xl p-2 rounded-lg ${
                    addExisting === true
                      ? "bg-green-500 text-black"
                      : "bg-white"
                  }`}
                >
                  Add existing menu
                </div>
              </div>
              {addNew && <Item />}
              {addExisting && <SearchBar />}
            </Modal>
          </div>

          <div className="m-5 rounded-lg p-3 ">
            <Search
              className="mb-5"
              placeholder={`Search menu for ${day}`}
              size="large"
              allowClear
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%" }}
            />
            <hr className="border-orange-500" />
            {filteredData.map((item, index) => (
              <div
                key={index}
                className="lg:flex justify-between items-center w-full bg-white p-2 mb-5 mt-5 shadow-md rounded-lg"
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
                    onClick={() => removeLunchItem(item)}
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
              title="Edit Lunch Menu"
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
