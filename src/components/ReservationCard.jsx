import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState } from "react";
import Button from "./Button";
import { Modal, Statistic } from "antd";
import { InputLabel, Input } from "./Input";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import useReservation from "../hooks/useReservation";
import ReservationDetailModal from "./ReservationDetailModal";

const TableHeader = ({ label, headerClass }) => (
  <th className={`py-2 px-4 border-b ${headerClass}`}>{label}</th>
);
const TableContent = ({ label, headerClass, onClick }) => (
  <td
    className={`py-2 px-4 border-b ${headerClass}`}
    onClick={() => onClick && onClick()}
  >
    {label}
  </td>
);

const ReservationCard = ({ reservations = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { deleteReservation } = useReservation();
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    guestCount: null,
    reservationDate: "",
    reservationTime: "",
  });

  const isNotEmpty = (value) => value.trim() !== "";
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidPhoneNumber = (value) => /^\+?[1-9]\d{1,14}$/.test(value);
  const isValidNumber = (value) => /^\d+$/.test(value);

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

  const handleInputChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
    console.log({ name: event.target });
  };
  const handleReservationClick = (id) => {
    setSelectedID(id);
    setIsDetailModalOpen(true);
  };
  const handleCloseDetailModal = () => {
    setSelectedID(null);
    setIsDetailModalOpen(false);
  };
  const modifyReservation = async (id) => {
    setIsOpen(true);
    setSelectedID(id);
  };

  const handleReservationSubmit = async (event) => {
    event.preventDefault();
    try {
      const {
        firstname,
        lastname,
        email,
        phoneNumber,
        guestCount,
        reservationDate,
        reservationTime,
      } = state;

      await updateDoc(doc(db, "Reservations", selectedID), {
        firstname: firstname || reservationById[0]?.firstname,
        lastname: lastname || reservationById[0]?.lastname,
        email: email || reservationById[0]?.email,
        phoneNumber: phoneNumber || reservationById[0]?.phoneNumber,
        guestCount: guestCount || reservationById[0]?.guestCount,
        reservationDate: reservationDate || reservationById[0]?.reservationDate,
        reservationTime: reservationTime || reservationById[0]?.reservationTime,
        status: "pending",
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const reservationById = reservations?.filter(
    (reservation) => reservation?.id === selectedID
  );

  const totalApprovedGuests = reservations
    .filter((reservation) => reservation.status === "approved")
    .reduce((total, reservation) => total + Number(reservation.guestCount), 0);

  return (
    <div>
      <div className="bg-gray-200 p-4 flex items-center min-w-full  ">
        <Statistic
          title="Total Confirmed Guests"
          value={totalApprovedGuests}
          prefix={<UserOutlined />}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-fixed min-w-full bg-white border border-gray-300 lg:text-lg text-xs overflow-x-scroll">
          <thead>
            <tr>
              <TableHeader label="Time" />
              <TableHeader label="Pax" />
              <TableHeader label="Name" />
              <TableHeader label="Email" headerClass="hidden lg:table-cell" />
              <TableHeader label="Phone" headerClass="hidden lg:table-cell" />
              <TableHeader label="Status" headerClass="hidden lg:table-cell" />
              <TableHeader label="Decision" />
              <TableHeader label="Actions" />
            </tr>
          </thead>
          <tbody>
            {reservations?.map((item) => (
              <tr key={item.id}>
                <TableContent label={item.reservationTime} className="" />
                <TableContent label={item.guestCount} />
                <TableContent
                  label={`${item.firstname} ${item.lastname}`}
                  onClick={() => handleReservationClick(item.id)}
                  headerClass=" cursor-pointer"
                />
                <TableContent
                  label={item.email}
                  headerClass="hidden lg:table-cell"
                />
                <TableContent
                  label={item.phoneNumber}
                  headerClass="hidden lg:table-cell"
                />
                <TableContent
                  label={item.status}
                  headerClass="hidden lg:table-cell"
                />
                <TableContent
                  label={
                    <div className="flex flex-col md:flex-row gap-1 justify-center items-center">
                      <a
                        href={
                          item.status !== "pending"
                            ? "#"
                            : `http://localhost:5173/reservation/${item.id}/decline`
                        }
                        className="bg-orange-300 hover:bg-orange-400 px-3 py-1 rounded-md text-xs"
                      >
                        Decline
                      </a>
                      <a
                        href={
                          item.status !== "pending"
                            ? "#"
                            : `http://localhost:5173/reservation/${item.id}/approve`
                        }
                        className="ml-2 bg-red-300 hover:bg-red-400 px-3 py-1 rounded-md text-xs"
                      >
                        Approve
                      </a>
                    </div>
                  }
                />
                <TableContent
                  label={
                    <div className="flex flex-col md:flex-row gap-1 justify-center items-center">
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
              <form onSubmit={handleReservationSubmit}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <InputLabel label="First name" />
                    <Input
                      placeholder="John"
                      name="firstname"
                      value={state?.firstname || reservationById[0]?.firstname}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <InputLabel label="Last name" />
                    <Input
                      placeholder="Doe"
                      name="lastname"
                      value={state?.lastname || reservationById[0]?.lastname}
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
                    value={state?.email || reservationById[0]?.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-2">
                  <InputLabel label="Phone number" />
                  <Input
                    type="tel"
                    placeholder="+358411103121"
                    name="phoneNumber"
                    value={
                      state?.phoneNumber || reservationById[0]?.phoneNumber
                    }
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
                    value={state?.guestCount || reservationById[0]?.guestCount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <InputLabel label="Time" />
                    <Input
                      type="time"
                      name="reservationTime"
                      value={
                        state?.reservationTime ||
                        reservationById[0]?.reservationTime
                      }
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
          <ReservationDetailModal
            isOpen={isDetailModalOpen}
            onClose={handleCloseDetailModal}
            reservation={reservationById}
          />
        </table>
      </div>
    </div>
  );
};

export default ReservationCard;
