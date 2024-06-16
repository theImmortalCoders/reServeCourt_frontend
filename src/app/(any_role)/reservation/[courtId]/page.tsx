"use client";
import Page from "@/components/common/page/Page";
import { useQuery } from "react-query";
import {
  cancelReservation,
  confirmReservation,
  getAllReservationByCourtId,
} from "@/hooks/reservation";
import Error500Page from "@/components/common/error/Error500Page";
import ReservationListComponent from "@/components/my-reservations/ReservationListComponent";
import CancelWarning from "@/components/my-reservations/CancelWarning";
import { useEffect, useState } from "react";
import VerifyWarning from "@/components/my-reservations/VerifyWarning";
import getRole from "@/utils/Role";

export default function Reservation({
  params,
}: {
  params: { courtId: string };
}) {
  useEffect(() => {
    const fetchRole = async () => {
      const role = await getRole();
      if (role !== "ADMIN") {
        return <Error500Page />;
      }
    };
    fetchRole();
  }, []);

  const [cancelWarning, setCancelWarning] = useState<boolean>(false);
  const [verifyWarning, setVerifyWarning] = useState<boolean>(false);
  const [tempId, setTempId] = useState<number>(-1);
  console.log(params.courtId);
  const {
    data: reservationForClubIdData,
    isLoading: reservationForClubIdLoading,
    isError: reservationForClubIdError,
    refetch,
  } = useQuery("reservationForClubId", () =>
    getAllReservationByCourtId(parseInt(params.courtId))
  );

  if (reservationForClubIdError) return <Error500Page />;

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

  const handleVerifyReservation = async (id: number) => {
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
  };

  if (
    reservationForClubIdData != undefined &&
    reservationForClubIdData.length == 0
  )
    return (
      <Page>
        <h2 className="w-full text-center py-10 uppercase text-2xl sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-darkGreen">
          Brak rezerwacji
        </h2>
      </Page>
    );
  return (
    <Page>
      <div className="flex flex-col items-center bg-mainWhite min-h-max py-8 space-y-6">
        <h2 className="w-full text-center py-10 uppercase text-2xl sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-darkGreen">
          {reservationForClubIdData != undefined &&
            reservationForClubIdData.length > 0 &&
            typeof reservationForClubIdData != "string" && (
              <>Rezerwacje dla kortu {reservationForClubIdData[0].court.name}</>
            )}
        </h2>
        <div className="w-11/12 xl:w-3/5 space-y-8 md:space-y-2">
          {!reservationForClubIdLoading &&
            Array.isArray(reservationForClubIdData) &&
            reservationForClubIdData.map(
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
          <VerifyWarning
            tempId={tempId}
            setVerifyWarning={setVerifyWarning}
            handleVerifyReservation={handleVerifyReservation}
          />
        )}
      </div>
    </Page>
  );
}
