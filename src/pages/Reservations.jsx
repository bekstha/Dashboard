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

  const displayDate = selectedDate
    ? selectedDate.format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");

  const filteredAndSortedReservations = [...reservations]
    .filter((reservation) => reservation.reservationDate === displayDate)
    .sort((a, b) => {
      const timeA = a.reservationTime;
      const timeB = b.reservationTime;
      return timeA.localeCompare(timeB);
    });

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="container overflow-scroll mx-auto my-8 bg-slate-100 p-5 rounded-xl text-blue-950 mt-20 md:mt-5 ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Calendar onSelectDate={handleDateSelect} />
          <p className="ml-3 text-sm lg:text-lg">{displayDate}</p>
        </div>
      </div>
      {!loading && (
        <ReservationCard reservations={filteredAndSortedReservations} />
      )}
    </div>
  );
};

export default Reservations;
