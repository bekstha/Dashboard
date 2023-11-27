import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState } from "react";
import { Button, Modal } from "antd";
import { InputLabel, Input } from "./Input";

const TableHeader = ({ label }) => (
  <th className="py-2 px-4 border-b ">{label}</th>
);
const TableContent = ({ label }) => (
  <td className="py-2 px-4 border-b ">{label}</td>
);

const ReservationCard = ({ reservations = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedID, setSelectedID] = useState();
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

  const removeReservation = async (id) => {
    await deleteDoc(doc(db, "Reservations", id));
  };

  const modifyReservation = async (id) => {
    setIsOpen(true);
    setSelectedID(id);
  };

  const handleReservationSubmit = async (event) => {
    event.preventDefault();
    try {
      const reservationCollection = collection(db, "Reservations");
      const reservationRef = doc(reservationCollection);

      await setDoc(reservationRef, {
        id: selectedID,
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
    <table className="table-fixed min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <TableHeader label="Date" />
          <TableHeader label="Time" />
          <TableHeader label="Pax" />
          <TableHeader label="Name" />
          <TableHeader label="Email" />
          <TableHeader label="Phone number" />
          <TableHeader label="Actions" />
        </tr>
      </thead>
      <tbody>
        {reservations?.map((item) => (
          <tr key={item.id}>
            <TableContent label={item.reservationDate} />
            <TableContent label={item.reservationTime} />
            <TableContent label={item.guestCount} />
            <TableContent label={`${item.firstname} ${item.lastname}`} />
            <TableContent label={item.email} />
            <TableContent label={item.phoneNumber} />
            <TableContent
              label={
                <>
                  <button
                    className="bg-orange-300 hover:bg-orange-400 px-3 py-1 rounded-md text-xs"
                    onClick={() => modifyReservation(item.id, item)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-2 bg-red-300 hover:bg-red-400 px-3 py-1 rounded-md text-xs"
                    onClick={() => removeReservation(item.id)}
                  >
                    Delete
                  </button>
                </>
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
                  defaultValue={reservationById[0]?.firstname}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <InputLabel label="Last name" />
                <Input
                  placeholder="Doe"
                  name="lastname"
                  defaultValue={reservationById[0]?.lastname}
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
                defaultValue={reservationById[0]?.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-2">
              <InputLabel label="Phone number" />
              <Input
                type="tel"
                placeholder="+358411103121"
                name="phoneNumber"
                defaultValue={reservationById[0]?.phoneNumber}
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
                defaultValue={reservationById[0]?.guestCount}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <div className="flex-1">
                <InputLabel label="Date" />
                <Input
                  type="date"
                  name="reservationDate"
                  defaultValue={reservationById[0]?.reservationDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <InputLabel label="Time" />
                <Input
                  type="time"
                  name="reservationTime"
                  defaultValue={reservationById[0]?.reservationTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <Button className="md:w-full w-full mt-8">
              Submit Reservation
            </Button>
          </form>
        </Modal>
      </tbody>
    </table>
  );
};

export default ReservationCard;
