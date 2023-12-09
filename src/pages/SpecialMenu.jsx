import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import Button from "../components/Button";
import Modal from "antd/es/modal/Modal";
import SpecialMenuItem from "../components/SpecialMenuItem";
import useSpecialMenu from "../hooks/useSpecialMenu";
import LoadingScreen from "../components/LoadingScreen";

const SpecialMenu = ({}) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { specialMenu, deleteSpecial } = useSpecialMenu();
  const [loading, setLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const showAddModal = () => setIsAddOpen(true);
  const hideAddModal = () => setIsAddOpen(false);

  const hideDeleteModal = () => setIsDeleteModalVisible(false);

  const showEditModel = (item) => {
    setIsEditOpen(true);
    setSelectedItem(item);
  };

  const hideEditModal = () => {
    setIsEditOpen(false);
    setSelectedItem(null);
  };

  const removeItem = async (id) => {
    console.log(id);
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this Item?",
      okButtonProps: { className: "bg-green-500 text-white" },
      onOk: () => {
        deleteSpecial(id);
      },
      onCancel: hideDeleteModal,
    });
  };

  useEffect(() => {
    if (specialMenu.length > 0) {
      setLoading(false);
    }
  }, [specialMenu]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="flex justify-center">
      <div className="border w-full m-5 p-3 bg-slate-100 rounded-lg">
        <div className="flex gap-10 justify-between">
          <button
            onClick={() => showAddModal()}
            className="flex border h-fit items-center gap-4 sm:text-base md:text-lg text-xs hover:shadow-2xl p-2 bg-white rounded-lg"
          >
            <IoAddCircleOutline />
            Add special menu
          </button>
          <Modal
            open={isAddOpen}
            onOk={hideAddModal}
            onCancel={hideAddModal}
            title="Add Special Menu"
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
            <SpecialMenuItem />
          </Modal>
        </div>
        {specialMenu.map((item, index) => (
          <div
            key={index}
            className="sm:flex w-full justify-between items-center bg-white p-2 mb-5 mt-5 shadow-md rounded-lg"
          >
            <p className="text-xs sm:text-sm md:text-base italic tracking-wide p-3">{item.title}</p>
            <div className="flex justify-items-center p-3">
              <button
                className="bg-orange-300 hover:bg-orange-400 px-3 py-1 h-8 rounded-md w-16 sm:w-20 text-xs sm:text-sm md:text-base"
                onClick={() => showEditModel(item)}
              >
                Edit
              </button>
              <button
                className="ml-2 bg-red-300 hover:bg-red-400 px-3 py-1 h-8 rounded-md w-16 sm:w-20 text-xs sm:text-sm md:text-base"
                onClick={() => removeItem(item.id)}
              >
                Delete
              </button>
            </div>
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
                  <SpecialMenuItem
                    itemId={selectedItem.id}
                    itemName={selectedItem}
                  />
                </div>
              )}
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialMenu;
