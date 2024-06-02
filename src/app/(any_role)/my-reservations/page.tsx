"use client";
import { useState, Dispatch, SetStateAction } from "react";
import {
  getAllReservationByCurrentUser,
  cancelReservation, confirmReservation,
} from "@/hooks/reservation";
import { useQuery } from "react-query";
import ReservationListComponent from "@/components/my-reservations/ReservationListComponent";
import CancelWarning from "@/components/my-reservations/CancelWarning";
import VerifyWarning from "@/components/my-reservations/VerifyWarning";

const HistoryCurrentSwitch = ({
  isCurrent,
  setIsCurrent,
}: {
  isCurrent: boolean;
  setIsCurrent: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex h-10 w-11/12 xs:w-96 items-center border-2 rounded-full relative bg-close2White transition-all z-0">
      <div
        className={`${
          isCurrent ? "text-close2White" : "text-mainGreen"
        } z-20 w-[50%] transition-colors font-semibold text-center text-base cursor-pointer`}
        onClick={() => {
          setIsCurrent(false);
        }}
      >
        Historia
      </div>
      <div
        className={`${
          isCurrent ? "text-mainGreen" : "text-mainBlack"
        } z-20 w-[50%] transition-colors font-semibold text-center text-base cursor-pointer`}
        onClick={() => {
          setIsCurrent(true);
        }}
      >
        Bieżące
      </div>
    </div>
  );
};

export default function MyReservationsPage() {
  const [isCurrent, setIsCurrent] = useState<boolean>(true);
  const [cancelWarning, setCancelWarning] = useState<boolean>(false);
  const [tempId, setTempId] = useState<number>(-1);

  const currentDate = new Date().toISOString().slice(0, -5).toString();

  const [verifyWarning, setVerifyWarning] = useState<boolean>(false);

  const {
    data: reservationsData,
    isLoading,
    isError,
    refetch,
  } = useQuery(["reservations", isCurrent], () =>
    getAllReservationByCurrentUser(
      isCurrent ? currentDate : undefined,
      isCurrent ? undefined : currentDate
    )
  );

  const handleCancelReservation = async (id: number) => {
    try {
      const result = await cancelReservation(id);
      if (result === 200) {
        refetch();
        setTempId(-1);
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyReservation = async (id:number) => {
    try {
      const result = await confirmReservation(id);
      if (result === 200) {
        refetch();
        setTempId(-1);
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center bg-mainWhite min-h-max py-8 space-y-6">
      <HistoryCurrentSwitch isCurrent={isCurrent} setIsCurrent={setIsCurrent} />
      <div className="w-11/12 xl:w-3/5 space-y-8 md:space-y-2">
        {!isLoading &&
          !isError &&
          Array.isArray(reservationsData) &&
          reservationsData.map(
            (reservation) =>
              !reservation.canceled && (
                <ReservationListComponent
                  key={reservation.id}
                  reservation={reservation}
                  setCancelWarning={setCancelWarning}
                  setTempId={setTempId}
                  setVerifyWarning={setVerifyWarning}
                />
              )
          )}
      </div>
      {cancelWarning && (
        <CancelWarning
          tempId={tempId}
          setCancelWarning={setCancelWarning}
          handleCancelReservation={handleCancelReservation}
        />
      )}
      {verifyWarning && (
          <VerifyWarning tempId={tempId} setVerifyWarning={setVerifyWarning}
                         handleVerifyReservation={handleVerifyReservation}/>
      )}
    </div>
  );
}
