import React, { useState } from "react";
import { Input, Space, Modal } from "antd";
import { useEffect } from "react";
import useFoodMenu from "../hooks/useFoodMenu";
import Button from "../components/Button";
import Item from "./LunchItem";

const SearchBar = ({ item }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { Search } = Input;
  const { deleteLunch } = useFoodMenu();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredMenu = item.filter((item) =>
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filteredMenu);
    } else {
      setFilteredData([]);
    }
  }, [searchQuery]);

  const removeLunchItem = async (id) => {
      console.log(id)
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
    <div className="m-8">
      <Space direction="vertical">
        <Search
          placeholder="Filter all menu"
          size="large"
          allowClear
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: 500 }}
        />
      </Space>
      {filteredData.length > 0 && (
        <div className="top-0 bg-white rounded-lg left-0 w-full md:flex-nowrap md:justify-start flex-col items-center mt-5 border shadow-lg p-3">
        <p className="font-bold italic">Available Items....</p>
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="sm:flex justify-between bg-slate-300 items-center w-full bg-white p-2 mb-5 mt-5 shadow-md rounded-lg"
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
