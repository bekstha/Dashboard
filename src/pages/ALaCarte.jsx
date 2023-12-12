import React from "react";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import useAlacarteMenu from "../hooks/useAlaCarteMenu";
import CardHeader from "../components/CardHeader";
import { Modal, Result } from "antd";
import Button from "../components/Button";
import AlaCarteItem from "../components/AlacarteItem";
import LoadingScreen from "../components/LoadingScreen";

const ALaCarte = () => {
  const [itemName, setItemName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { alaCarte, deleteAlaCarte } = useAlacarteMenu();
  const [dishName, setDishName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const Category = ({ item, id }) => {
    return (
      <div
        onClick={() => handleItemClick(item, id)}
        className={`cursor-pointer rounded-md md:font-bold sm:text-base md:text-lg text-xs flex justify-center h-fit w-24 md:w-28 p-2 border border shadow-md ${
          dishName === item ? "bg-green-500 text-white" : "bg-white"
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

  const removeAlacarte = async (item) => {
    setSelectedItem(item);
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this Item?",
      okButtonProps: { className: "bg-green-500 text-white" },
      onOk: () => {
        deleteAlaCarte(item.id);
        setIsSuccess(true);
      },
      onCancel: hideDeleteModal,
    });
  };

  const checkGLP = (itemName) => {
    const components = [];
  
    if (itemName.gluten_free) components.push("G");
    if (itemName.lactose_free) components.push("L");
    if (itemName.nut_free) components.push("P");
  
    return `(${components.join(', ')})`;
  };

  const DishItems = ({ dishName, index }) => {
    const valueGLP = checkGLP(dishName);
    const handleEditClick = () => {
      showEditModal(dishName);
    };
    return (
      <React.Fragment key={index}>
        <div className="sm:flex justify-between items-center gap-10 w-full bg-white p-3 mb-5 shadow-md rounded-lg">
          <div className="sm:w-5/6">
            <CardHeader
              dish={dishName.title +" "+ valueGLP}
              price={dishName.price + `\u20AC`}
            />
            <hr className="border-orange-500" />
            <p className="text-xs sm:text-sm  italic tracking-wide mt-2 mb-2">
              {dishName.description}
            </p>
          </div>
          <div className="flex justify-items-center">
            <button
              className="bg-orange-300 hover:bg-orange-400 px-3 py-1 h-8 w-16 rounded-md text-xs"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="ml-2 bg-red-300 hover:bg-red-400 px-3 py-1 h-8 w-16 rounded-md text-xs"
              onClick={() => removeAlacarte(dishName)}
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
      <div className="border w-full m-5 bg-slate-100 rounded-lg">
        <div className="flex-col justify-center ">
          <div className="flex flex-wrap justify-between p-3 mx-5 my-5 gap-8 overflow-x-auto scrollbar-hide">
            <div className="flex flex-wrap gap-4">
              <Category item="Starters" />
              <Category item="Vegetarian" />
              <Category item="Lamb" />
              <Category item="Chicken" />
              <Category item="Tandoor" />
              <Category item="Vegan" />
            </div>
            <div
              onClick={() => showAddModal()}
              className="flex items-center gap-4 min-w-fit h-fit sm:text-base md:text-lg text-xs hover:shadow-2xl p-2 bg-white rounded-lg cursor-pointer"
            >
              <IoAddCircleOutline />
              Add new Item
            </div>
            <Modal
              open={isAddOpen}
              onOk={hideAddModal}
              onCancel={hideAddModal}
              title={`Add new ${dishName} menu`}
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
              <AlaCarteItem dishName={dishName} hideAddModal={hideAddModal} />
            </Modal>
          </div>
          <div className="mx-5 rounded-lg p-3">
          {isSuccess && (
              <Result
                className="bg-white shadow-md border rounded fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:m-10"
                status="success"
                title={"Successfully Deleted menu"}
                subTitle={`Item: ${selectedItem.title}`}
                extra={[
                  <Button type="default" key="console" onClick={() => setIsSuccess(false)}>
                    Close
                  </Button>,
                ]}
              />
            )}
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
                    hideEditModal={hideEditModal}
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
