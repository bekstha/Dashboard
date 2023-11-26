import { useEffect, useState } from "react";
import moment from "moment";

import ReservationCard from "../components/ReservationCard";
import LoadingScreen from "../components/LoadingScreen";
import Calendar from "../components/Calendar";

import useReservation from "../hooks/useReservation";

const Reservations = () => {
  const { reservations, setReservations } = useReservation();
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    if (reservations.length > 0) {
      setLoading(false);
    }
  }, [reservations]);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  const sortedReservations = [...reservations].sort(
    (a, b) => new Date(a.reservationDate) - new Date(b.reservationDate)
  );
  const displayDate = selectedDate
    ? selectedDate.format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  const filteredReservations = [...reservations].filter(
    (reservation) => reservation.reservationDate === displayDate
  );

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="container overflow-scroll mx-auto my-8 bg-slate-100 p-5 rounded-xl text-blue-950 mt-20 md:mt-5 ">
      {/* {console.log(selectedDate)} */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Calendar onSelectDate={handleDateSelect} />
          <p className="ml-3">{displayDate}</p>
        </div>
      </div>
      {!loading && <ReservationCard reservations={filteredReservations} />}
    </div>
  );
};

export default Reservations;
