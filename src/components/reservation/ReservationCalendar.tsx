import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function ReservationCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const courtStartTime = 9;
  const courtEndTime = 20;

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
    setSelectedTime(
      `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`
    );
  };

  const handleNavigate = (date: Date) => {
    setSelectedDate(date);
  };

  console.log("selectedStartTime", selectedStartTime);
  console.log("selectedEndTime", selectedEndTime);
  return (
    <div>
      <h2>Wybierz dostępne godziny</h2>
      <Calendar
        localizer={localizer}
        events={[
          {
            start: selectedStartTime!,
            end: selectedEndTime!,
            title: "Twoja rezerwacja",
          },
        ]}
        selectable
        defaultView="week"
        min={
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            courtStartTime
          )
        }
        max={
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            courtEndTime
          )
        }
        defaultDate={selectedDate}
        onSelectSlot={handleSelectSlot}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
