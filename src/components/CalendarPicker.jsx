import { useState } from "react";
import { DatePicker } from "antd";

const CalendarPicker = ({ onSelectDate, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <div>
      <DatePicker value={selectedDate} onChange={handleDateChange} />
    </div>
  );
};

export default CalendarPicker;
