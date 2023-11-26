// CalendarButton.js
import { useState } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import CalendarPicker from "./CalendarPicker";

const Calendar = ({ onSelectDate }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };
  const handleDateSelect = (date) => {
    onSelectDate(date);
    handleClose();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={handleClick}
        icon={<CalendarOutlined className="text-black" />}
        style={{ maxWidth: "200px", marginTop: "10px" }}
      ></Button>
      <Modal
        title="Select Date"
        open={visible}
        onCancel={handleClose}
        footer={null}
      >
        <CalendarPicker onSelectDate={handleDateSelect} />
      </Modal>
    </>
  );
};

export default Calendar;
