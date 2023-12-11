import { useState } from "react";
import { Input, Modal } from "antd";
import { PlusCircleFilled } from '@ant-design/icons';
import { useEffect } from "react";
import useFoodMenu from "../hooks/useFoodMenu";

const SearchBar = ({ day }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { Search } = Input;
  const { lunchItem, updateLunch } = useFoodMenu();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

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

  const addLunchItem = async (item) => {
    const dayToAdd = day;
    const isDayAlreadyPresent = item.day.includes(dayToAdd);
    if(!isDayAlreadyPresent) {
      const newData = {
        day: [...item.day, dayToAdd], // Add dayToAdd to the existing days
      };
      Modal.confirm({
        title: "Add Lunch Item",
        content: `Are you sure you want to add this menu for ${day}?`,
        okButtonProps: { className: "bg-green-500 text-white" },
        onOk: () => {
          updateLunch(item.id, newData)
        },
        onCancel: hideDeleteModal,
      });
    } else {
      Modal.warning({
        title: 'Error',
        okButtonProps: { className: "bg-red-400 text-white" },
        content: `This item already exists in ${day} menu.`,
      });
    }
  };

  const hideDeleteModal = () => setIsDeleteModalVisible(false);

  return (
    <div>
      <Search
        placeholder="Search menu"
        size="large"
        allowClear
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
        <div className="bg-slate-100 rounded-lg w-full flex-col items-center my-5 border shadow-lg px-3">
          <p className="font-bold italic p-2">List of available menus...</p>
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between bg-white items-center w-full bg-gray my-5 shadow-md rounded-lg p-2"
            >
              <p className="text-xs sm:text-sm md:text-base italic tracking-wide p-3">
                {item.description}
              </p>
              <div className="inline-block shadow hover:shadow-md hover:border hover:bg-white rounded-full">
                <PlusCircleFilled
                  onClick={() => addLunchItem(item)}
                  className="p-3 transition duration-300  cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default SearchBar;
