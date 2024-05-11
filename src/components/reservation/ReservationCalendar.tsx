import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ReservationData } from "@/hooks/reservation";

const localizer = momentLocalizer(moment);

export default function ReservationCalendar({
  selectedStartTime,
  setSelectedStartTime,
  selectedEndTime,
  setSelectedEndTime,
  reservations,
}: {
  selectedStartTime: Date | null;
  setSelectedStartTime: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedEndTime: Date | null;
  setSelectedEndTime: React.Dispatch<React.SetStateAction<Date | null>>;
  reservations: ReservationData[];
}) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const courtStartTime = 8;
  const courtEndTime = 17;

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    if (start < new Date()) {
      return;
    }
    const startHour = start.getHours();
    const endHour = end.getHours();
    if (startHour < courtStartTime || endHour > courtEndTime) {
      return;
    }
    setSelectedStartTime(start);
    setSelectedEndTime(end);
  };

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const mapReservationsToEvents = () => {
    const reservedEvents = reservations.map((reservation) => ({
      start: new Date(reservation.timeFrom),
      end: new Date(reservation.timeTo),
      title: "Zajęte",
    }));
    const userEvent = selectedStartTime &&
      selectedEndTime && {
        start: selectedStartTime!,
        end: selectedEndTime!,
        title: "Twoja rezerwacja",
      };
    return [...reservedEvents, userEvent].filter(Boolean);
  };

  return (
    <div>
      <h2>Wybierz dostępne godziny</h2>
      <Calendar
        localizer={localizer}
        events={mapReservationsToEvents()}
        selectable
        defaultView="week"
        min={
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            courtStartTime
          )
        }
        max={
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            courtEndTime
          )
        }
        defaultDate={currentDate}
        onSelectSlot={handleSelectSlot}
        toolbar={true}
        onNavigate={handleNavigate}
        date={currentDate}
        views={["week"]}
        onSelectEvent={(event) => {
          if (event.title === "Twoja rezerwacja") {
            setSelectedStartTime(event.start);
            setSelectedEndTime(event.end);
          }
        }}
      />
    </div>
  );
}
