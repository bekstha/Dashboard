import { Modal } from "antd";

const ReservationDetailModal = ({ isOpen, onClose, reservation }) => {
  return (
    <Modal
      title="Reservation Details"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      {/* Display reservation details here */}
      {reservation && (
        <div>
          <p className="block">
            <span className="inline-block w-20"> Name:</span>

            <a>
              {reservation[0]?.firstname} {reservation[0]?.lastname}
            </a>
          </p>

          <p className="block">
            <span className="inline-block w-20"> Time:</span>

            <a>{reservation[0]?.reservationTime}</a>
          </p>
          <p className="block">
            <span className="inline-block w-20">PAX:</span>

            <a>{reservation[0]?.guestCount}</a>
          </p>

          <p className="inline-block w-20">Phone : </p>
          <a
            href={`tel:${reservation[0]?.phoneNumber}`}
            className="hover:text-blue-400"
          >
            {reservation[0]?.phoneNumber}
          </a>
          <p className="block">
            <span className="inline-block w-20">Email : </span>
            <a
              href={`mailto:${reservation[0]?.email}`}
              className="hover:text-blue-400"
            >
              {reservation[0]?.email}
            </a>
          </p>
          <p className="block">
            <span className="inline-block w-20"> Status:</span>

            <a>{reservation[0]?.status}</a>
          </p>

          {/* Add other details as needed */}
        </div>
      )}
    </Modal>
  );
};

export default ReservationDetailModal;
