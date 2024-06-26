import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ReservationData } from "@/hooks/reservation";
import { DaysOpen } from "@/hooks/club";

const localizer = momentLocalizer(moment);

export default function ReservationCalendar({
                                                selectedStartTime,
                                                setSelectedStartTime,
                                                selectedEndTime,
                                                setSelectedEndTime,
                                                reservations,
                                                daysOpen,
                                            }: {
  selectedStartTime: Date | null;
  setSelectedStartTime: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedEndTime: Date | null;
  setSelectedEndTime: React.Dispatch<React.SetStateAction<Date | null>>;
  reservations: ReservationData[];
  daysOpen: DaysOpen;
}) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  //console.log("daysOpen", daysOpen);
  const courtStartTime = 8;
  const courtEndTime = 17;

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    if (start < new Date()) {
      return;
    }

    const isOverlapping = reservations.some(
        (reservation) =>
            start < new Date(reservation.timeTo) &&
            end > new Date(reservation.timeFrom)
    );
    if (isOverlapping) {
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

  interface reservationEvent {
    start: Date;
    end: Date;
    title: string;
    className?: string;
  }

  const mapReservationsToEvents = (): reservationEvent[] => {
    const reservedEvents: reservationEvent[] = reservations.map((reservation) => ({
      start: new Date(reservation.timeFrom),
      end: new Date(reservation.timeTo),
      title: "Zajęte",
      className: "reserved-event",
    }));
    const userEvent = selectedStartTime && selectedEndTime
        ? {
          start: selectedStartTime,
          end: selectedEndTime,
          title: "Twoja rezerwacja",
        }
        : null;
    return [...reservedEvents, userEvent].filter((event): event is reservationEvent => event !== null);
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
            onSelectEvent={(event: reservationEvent) => {
              if (event.title === "Twoja rezerwacja") {
                setSelectedStartTime(event.start);
                setSelectedEndTime(event.end);
              }
            }}
            eventPropGetter={(event) => ({
              className: event.className,
            })}
        />
        <style>{`
        .reserved-event {
          background-color: #cccccc; /* szary */
          color: #000000; /* czarny */
        }
      `}</style>
      </div>
  );
}
