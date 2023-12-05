import React, { useState } from "react";
import { Input, Modal } from "antd";
import { useEffect } from "react";
import useFoodMenu from "../hooks/useFoodMenu";
import Button from "../components/Button";
import Item from "./LunchItem";

const SearchBar = ({ day }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { Search } = Input;
  const { deleteLunch, lunchItem } = useFoodMenu();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredMenu = lunchItem.filter((item) =>
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filteredMenu);
    } else {
      setFilteredData(lunchItem);
    }
  }, [searchQuery, lunchItem]);

  const removeLunchItem = async (id) => {
    console.log(id);
    Modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete this item ?`,
      okButtonProps: { className: "bg-green-500 text-white" },
      onOk: () => {
        deleteLunch(id);
      },
      onCancel: hideDeleteModal,
    });
  };

  const hideDeleteModal = () => setIsDeleteModalVisible(false);

  const showModal = (item) => {
    setIsOpen(true);
    setSelectedItem(item);
  };

  const hideModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <Search
        placeholder="Search menu"
        size="large"
        allowClear
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredData.length > 0 && (
        <div className="top-0 bg-slate-100 rounded-lg left-0 w-full md:flex-nowrap md:justify-start flex-col items-center my-5 border shadow-lg px-3">
          <p className="font-bold italic p-2">List of available menus...</p>
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="sm:flex justify-between bg-white items-center w-full bg-gray my-5 shadow-md rounded-lg"
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
      )}
    </div>
  );
};

export default SearchBar;
