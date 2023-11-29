import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState } from "react";
import { Button, Modal } from "antd";
import { InputLabel, Input } from "./Input";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useReservation from "../hooks/useReservation";

const TableHeader = ({ label }) => (
  <th className="py-2 px-4 border-b ">{label}</th>
);
const TableContent = ({ label }) => (
  <td className="py-2 px-4 border-b ">{label}</td>
);

const ReservationCard = ({ reservations = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { deleteReservation } = useReservation();
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    guestCount: 1,
    reservationDate: "",
    reservationTime: "",
  });
  const {
    firstname,
    lastname,
    email,
    phoneNumber,
    guestCount,
    reservationDate,
    reservationTime,
  } = state;

  const isNotEmpty = (value) => value.trim() !== "";
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidPhoneNumber = (value) => /^\+?[1-9]\d{1,14}$/.test(value);
  const isValidNumber = (value) => /^\d+$/.test(value);

  const hideDeleteModal = () => setIsDeleteModalVisible(false);

  const removeReservation = async (id) => {
    console.log(id);
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this Item?",
      okButtonProps: { className: "bg-green-500 text-white" },
      onOk: () => {
        deleteReservation(id);
      },
      onCancel: hideDeleteModal,
    });
  };

  const validateForm = () => {
    if (
      !isNotEmpty(firstname) ||
      !isNotEmpty(lastname) ||
      !isValidEmail(email) ||
      !isValidPhoneNumber(phoneNumber) ||
      !isValidNumber(guestCount)
    ) {
      console.error("Invalid input. Please check your form fields.");
      return false;
    }
    return true;
  };
  const handleInputChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  const modifyReservation = async (id) => {
    setIsOpen(true);
    setSelectedID(id);
  };

  const handleReservationSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log({ selectedID });
      await updateDoc(doc(db, "Reservations", selectedID), {
        firstname,
        lastname,
        email,
        phoneNumber,
        guestCount,
        reservationDate,
        reservationTime,
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const reservationById = reservations?.filter(
    (reservation) => reservation?.id === selectedID
  );

  return (
    <table className="table-fixed min-w-full bg-white border border-gray-300 lg:text-lg text-xs">
      <thead>
        <tr>
          <TableHeader label="Time" />
          <TableHeader label="Pax" />
          <TableHeader label="Name" />
          <TableHeader label="Email" />
          <TableHeader label="Phone number" />
          <TableHeader label="Status" />
          <TableHeader label="Decision" />
          <TableHeader label="Actions" />
        </tr>
      </thead>
      <tbody>
        {reservations?.map((item) => (
          <tr key={item.id}>
            <TableContent label={item.reservationTime} />
            <TableContent label={item.guestCount} />
            <TableContent label={`${item.firstname} ${item.lastname}`} />
            <TableContent label={item.email} />
            <TableContent label={item.phoneNumber} />
            <TableContent label={item.status} />
            <TableContent
              label={
                <div className="flex">
                  <a
                    href={`http://localhost:5174/reservation/${item.id}/decline`}
                    className="bg-orange-300 hover:bg-orange-400 px-3 py-1 rounded-md text-xs"
                  >
                    Decline
                  </a>
                  <a
                    href={`http://localhost:5174/reservation/${item.id}/approve`}
                    className="ml-2 bg-red-300 hover:bg-red-400 px-3 py-1 rounded-md text-xs"
                  >
                    Approve
                  </a>
                </div>
              }
            />
            <TableContent
              label={
                <div className="flex">
                  <button
                    className="bg-orange-300 hover:bg-orange-400 px-3 py-1 rounded-md text-xs"
                    onClick={() => modifyReservation(item.id, item)}
                  >
                    <EditOutlined className="mr-1" />
                  </button>
                  <button
                    className="ml-2 bg-red-300 hover:bg-red-400 px-3 py-1 rounded-md text-xs"
                    onClick={() => removeReservation(item.id)}
                  >
                    <DeleteOutlined className="mr-1" />
                  </button>
                </div>
              }
            />
          </tr>
        ))}
        <Modal open={isOpen} onCancel={() => setIsOpen(false)}>
          {selectedID}
          <form onSubmit={handleReservationSubmit}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <InputLabel label="First name" />
                <Input
                  placeholder="John"
                  name="firstname"
                  value={firstname || reservationById[0]?.firstname}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <InputLabel label="Last name" />
                <Input
                  placeholder="Doe"
                  name="lastname"
                  value={lastname || reservationById[0]?.lastname}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-2">
              <InputLabel label="Email" />
              <Input
                type="email"
                placeholder="example@mail.com"
                name="email"
                value={email || reservationById[0]?.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-2">
              <InputLabel label="Phone number" />
              <Input
                type="tel"
                placeholder="+358411103121"
                name="phoneNumber"
                value={phoneNumber || reservationById[0]?.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-2">
              <InputLabel label="Number of guest" />
              <Input
                type="number"
                placeholder="1"
                min="1"
                max="14"
                name="guestCount"
                value={guestCount || reservationById[0]?.guestCount}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <div className="flex-1">
                <InputLabel label="Time" />
                <Input
                  type="time"
                  name="reservationTime"
                  value={reservationTime || reservationById[0]?.reservationTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <Button
              onClick={(event) => handleReservationSubmit(event)}
              className="md:w-full w-full mt-8"
            >
              Submit Reservation
            </Button>
          </form>
        </Modal>
      </tbody>
    </table>
  );
};

export default ReservationCard;
