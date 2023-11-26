import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState } from "react";
import { Modal } from "antd";

const TableHeader = ({ label }) => (
  <th className="py-2 px-4 border-b ">{label}</th>
);
const TableContent = ({ label }) => (
  <td className="py-2 px-4 border-b ">{label}</td>
);

const ReservationCard = ({ reservations = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedID, setSelectedID] = useState();

  const removeReservation = async (id) => {
    await deleteDoc(doc(db, "Reservations", id));
  };

  const modifyReservation = async (id) => {
    setIsOpen(true);
    setSelectedID(id);

    await updateDoc(
      doc(db, "Reservations", {
        id,
        firstname: "sdflksdfj",
      })
    );
  };

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
                    onClick={() => modifyReservation(item.id)}
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
        </Modal>
      </tbody>
    </table>
  );
};

export default ReservationCard;
