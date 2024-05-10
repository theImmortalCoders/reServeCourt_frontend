"use client";
import React, { useEffect, useState } from "react";
import DashboardContainer from "../common/dashboardContainer/DashboardContainer";
import ReservationCalendar from "./ReservationCalendar";
import {
  AddReservationData,
  ReservationData,
  addReservation,
  getAllReservationByCourtId,
} from "@/hooks/reservation";

export function ReservationButton() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);
  const [message, setMessage] = useState<string>("");
  const courtId = 1;
  const [reservations, setReservations] = useState<ReservationData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllReservationByCourtId(courtId);
        if (typeof result !== "string") {
          setReservations(result);
        } else {
          console.error("Błąd:");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania rezerwacji:", error);
      }
    };
    fetchData();
  }, [isReservationModalOpen]);

  const handleButtonClick = () => {
    setIsReservationModalOpen(true);
  };

  const handleModalClose = () => {
    setIsReservationModalOpen(false);
  };

  const handleReservationSubmit = async () => {
    if (selectedEndTime && selectedStartTime) {
      const startTimeWithOffset = new Date(
        selectedStartTime.getTime() + 2 * 60 * 60 * 1000
      );
      const endTimeWithOffset = new Date(
        selectedEndTime.getTime() + 2 * 60 * 60 * 1000
      );
      const startTimeUTC = startTimeWithOffset.toISOString();
      const endTimeUTC = endTimeWithOffset.toISOString();

      const reservationData: AddReservationData = {
        timeFrom: startTimeUTC,
        timeTo: endTimeUTC,
        message: "asdasd",
      };

      try {
        const result = await addReservation(courtId, reservationData);
        //console.log("result", result);
        if (result === "200") {
          //console.log("Rezerwacja została pomyślnie dodana", result);
          setMessage("Rezerwacja została pomyślnie dodana");
          setSelectedStartTime(null);
          setSelectedEndTime(null);
        } else {
          setMessage("Wystąpił błąd podczas dodawania rezerwacji");
        }
      } catch (error) {
        console.error("Wystąpił błąd podczas dodawania rezerwacji:", error);
        setMessage("Wystąpił błąd podczas dodawania rezerwacji");
      }
    }
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="w-auto h-auto bg-mainGreen text-mainWhite text-md md:text-lg lg:text-xl px-2 lg:px-4 py-1 lg:py-2 rounded"
      >
        Zarezerwuj
      </button>
      {isReservationModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40">
          <DashboardContainer className="flex flex-col space-y-4 p-7 w-11/12 lg:w-3/5">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold">Zarezerwuj Kort</h2>
              <ReservationCalendar
                selectedStartTime={selectedStartTime}
                setSelectedStartTime={setSelectedStartTime}
                selectedEndTime={selectedEndTime}
                setSelectedEndTime={setSelectedEndTime}
                reservations={reservations}
              />
            </div>
            <span className="flex justify-center space-x-4">
              <button
                className="text-right text-mainOrange text-sm sm:text-md"
                onClick={handleModalClose}
              >
                Zamknij
              </button>
              <button
                onClick={handleReservationSubmit}
                className="bg-darkGreen text-mainWhite text-sm rounded px-4 py-2 w-fit"
              >
                Zarezerwuj
              </button>
            </span>
            <div className="flex w-full justify-center">
              <p className="text-xs text-center">{message}</p>
            </div>
          </DashboardContainer>
        </div>
      )}
    </>
  );
}
