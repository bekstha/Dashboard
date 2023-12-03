import React from "react";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import useAlacarteMenu from "../hooks/useAlaCarteMenu";
import CardHeader from "../components/CardHeader";
import { Modal } from "antd";
import Button from "../components/Button";
import AlaCarteItem from "../components/AlacarteItem";
import LoadingScreen from "../components/LoadingScreen";

const ALaCarte = () => {
  const [itemName, setItemName] = useState("");
  const [selectedButton, setSelectedButton] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { alaCarte, deleteAlaCarte } = useAlacarteMenu();
  const [dishName, setDishName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const Category = ({ item, id }) => {
    return (
      <div
        onClick={() => handleItemClick(item, id)}
        className={`cursor-pointer rounded-md font-bold h-fit text-medium p-2 border border-black ${
          dishName === item ? "bg-green-500 text-white" : ""
        }`}
      >
        {item}
      </div>
    );
  };

  useEffect(() => {
    if (alaCarte.length > 0) {
      setLoading(false);
    }
  }, [alaCarte]);

  const hideDeleteModal = () => setIsDeleteModalVisible(false);

  const removeAlacarte = async (id) => {
    console.log(id);
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this Item?",
      okButtonProps: { className: "bg-green-500 text-white" },
      onOk: () => {
        deleteAlaCarte(id);
      },
      onCancel: hideDeleteModal,
    });
  };

  const DishItems = ({ dishName, index }) => {
    const handleEditClick = () => {
      showEditModal(dishName);
    };
    return (
      <React.Fragment key={index}>
        <div className="sm:flex justify-between items-center gap-10 w-full bg-white p-3 mt-5 shadow-md rounded-lg">
          <div className="sm:w-5/6">
            <CardHeader
              dish={dishName.title}
              price={dishName.price + `\u20AC`}
            />
            <hr className="border-orange-500" />
            <p className="text-sm italic tracking-wide mt-2 mb-2">
              {dishName.description}
            </p>
          </div>
          <div className="flex justify-items-center">
            <button
              className="bg-orange-300 hover:bg-orange-400 px-3 py-1 h-8 rounded-md text-xs"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="ml-2 bg-red-300 hover:bg-red-400 px-3 py-1 h-8 rounded-md text-xs"
              onClick={() => removeAlacarte(dishName.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const handleItemClick = (item) => {
    // Handle the card click event
    setDishName(item);
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
    handleItemClick("Starters");
  }, []);

  const itemFilters = {
    Starters: "starter",
    Vegetarian: "veg_dish",
    Lamb: "lamb_dish",
    Chicken: "chicken_dish",
    Tandoor: "tandoor_dish",
    Vegan: "vegan",
    Drinks: "drinks",
  };

  const filteredItems = alaCarte
    .filter((item) => item[itemFilters[itemName]])
    .map((filteredItem, index) => (
      <DishItems dishName={filteredItem} key={index} />
    ));

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="flex justify-center">
      <div className="relative border w-full m-5 bg-slate-100">
        <div className="flex-col justify-center ">
          <div className="flex justify-between p-3 m-5 gap-8 overflow-x-auto scrollbar-hide">
            <div className="flex gap-8">
              <Category item="Starters" />
              <Category item="Vegetarian" />
              <Category item="Lamb" />
              <Category item="Chicken" />
              <Category item="Tandoor" />
              <Category item="Vegan" />
              <Category item="Drinks" />
            </div>
            <div
              onClick={() => showAddModal()}
              className="flex items-center gap-4 min-w-fit h-fit text-xl hover:shadow-2xl p-2 bg-white rounded-lg cursor-pointer"
            >
              <IoAddCircleOutline />
              Add new Item
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
              <AlaCarteItem />
            </Modal>
          </div>
          <div className="m-5 rounded-lg p-3">
            {filteredItems.length > 0 ? (
              filteredItems
            ) : (
              <p className="flex justify-center font-bold text-2xl text-orange-400">
                No menu found for {itemName}.
              </p>
            )}
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
                  <AlaCarteItem
                    itemId={selectedItem.id}
                    itemName={selectedItem}
                    dishName={dishName}
                  />
                </div>
              )}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALaCarte;
