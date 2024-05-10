"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function ReservationCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedDate(start);
    setSelectedTime(
      `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`
    );
  };

  const handleNavigate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h2>Wybierz dostępne godziny</h2>
      <Calendar
        localizer={localizer}
        events={[
          {
            start: selectedDate,
            end: selectedDate, // Możesz dostosować to w zależności od potrzeb
            title: "Dostępne godziny",
          },
        ]}
        selectable
        defaultView="week"
        min={
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            9
          )
        }
        max={
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            20
          )
        }
        defaultDate={selectedDate}
        onSelectSlot={handleSelectSlot}
        onNavigate={handleNavigate}
      />
      <p>Wybrana data: {moment(selectedDate).format("YYYY-MM-DD")}</p>
      <p>Wybrany czas: {selectedTime}</p>
    </div>
  );
}
