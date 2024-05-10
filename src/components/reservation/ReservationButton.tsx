"use client";

import { useState } from "react";
import DashboardContainer from "../common/dashboardContainer/DashboardContainer";

export function ReservationButton() {
  const [isReservationModalOpen, setIsReservationModalOpen] =
    useState<boolean>(false);

  const handleButtonClick = () => {
    setIsReservationModalOpen(true);
  };

  const handleModalClose = () => {
    setIsReservationModalOpen(false);
  };

  const handleReservationSubmit = () => {};
  const [selectedTime, setSelectedTime] = useState<string>("");
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
              <ReservationTimeSelector setSelectedTime={setSelectedTime} />
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
              <p className="text-xs text-center">wiadomosc sadasd</p>
            </div>
          </DashboardContainer>
        </div>
      )}
    </>
  );
}

function ReservationTimeSelector({ setSelectedTime }: any) {
  // Function to handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Placeholder array of available reservation times
  const availableTimes = ["08:00", "09:00", "10:00", "11:00", "12:00"];

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-lg font-semibold">Wybierz Godzinę:</h3>
      {/* Display available times as buttons */}
      {availableTimes.map((time) => (
        <button
          key={time}
          onClick={() => handleTimeSelect(time)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          {time}
        </button>
      ))}
    </div>
  );
}
