import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function ReservationCalendar() {
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

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
  };

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
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
      />
    </div>
  );
}
