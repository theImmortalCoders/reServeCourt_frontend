"use client"
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { getAllReservationByCurrentUser, cancelReservation } from "@/hooks/reservation";
import { useQuery } from 'react-query';
import DashboardContainer from "@/components/common/dashboardContainer/DashboardContainer";
import APIImageComponent from "@/hooks/imageAPI";
import { MdCancel } from "react-icons/md";

function CancelWarning({
    setCancelWarning,
    tempId,
    handleCancelReservation
  }: {
    setCancelWarning: Dispatch<SetStateAction<boolean>>;
    tempId: number;
    handleCancelReservation: (id:number) => void;
  }) {
    return (
      <div className="fixed flex items-center justify-center inset-0 z-10">
        <div className="absolute inset-0 bg-mainWhite opacity-80"></div>
        <div className="flex flex-col justify-center items-center w-64 sm:w-96 border-2 border-darkGreen bg-mainWhite rounded space-y-2 p-4 z-20">
          <h1 className="text-xl">Anulowanie rezerwacji</h1>
          <p className="text-sm text-center font-sans">
            Czy na pewno chcesz anulować wybraną rezerwację?
          </p>
          <span className="space-x-4">
            <button
              onClick={() => setCancelWarning(false)}
              className="text-right text-mainOrange text-sm sm:text-md"
            >
              Anuluj
            </button>
            <button
              onClick={() => {
                handleCancelReservation(tempId);
                setCancelWarning(false);
            }}
              className="bg-red-600 text-mainWhite text-sm rounded px-4 py-2 w-fit"
            >
              Tak
            </button>
          </span>
        </div>
      </div>
    );
  }

const HistoryCurrentSwitch = ({
    isCurrent,
    setIsCurrent
}:{
    isCurrent: boolean;
    setIsCurrent: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <div
            className="flex h-10 w-11/12 xs:w-96 items-center border-2 rounded-full relative bg-close2White transition-all z-0"
        >
            <div
                className={ `${isCurrent?"text-close2White":"text-mainGreen"} z-20 w-[50%] transition-colors font-semibold text-center text-base cursor-pointer`}
                onClick={() => {
                    setIsCurrent(false);
                }}
            >
                Historia
            </div>            
            <div
                className={ `${isCurrent?"text-mainGreen":"text-mainBlack"} z-20 w-[50%] transition-colors font-semibold text-center text-base cursor-pointer`}
                onClick={() => {
                    setIsCurrent(true);
                }}
            >
                Bieżące
            </div>
        </div>
    )
}


export default function MyReservationsPage() {

    const [isCurrent, setIsCurrent] = useState<boolean>(true);
    const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().slice(0, -5));
    const [cancelWarning, setCancelWarning] = useState<boolean>(false);
    const [tempId, setTempId] = useState<number>(-1);

    const {
        data: reservationsData,
        isLoading,
        isError,
        refetch
    } = useQuery(["reservations", isCurrent], () => getAllReservationByCurrentUser(isCurrent ? currentDate : undefined, isCurrent ? undefined : currentDate))

    const handleCancelReservation = async (id:number) => {
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
    }

    return (
        <div className="flex flex-col items-center bg-mainWhite min-h-max py-8 space-y-6">
            <HistoryCurrentSwitch isCurrent={isCurrent} setIsCurrent={setIsCurrent}/>
            <div className="w-11/12 xl:w-3/5 space-y-8 md:space-y-2">
            {!isLoading && !isError && (
                    Array.isArray(reservationsData) &&
                    reservationsData.map((reservation) => (
                        !reservation.canceled && (
                            <DashboardContainer key={reservation.id} className="flex flex-col md:flex-row md:h-36">
                                <div className="flex items-center w-40 p-4">
                                    <APIImageComponent imageId={reservation.court.image.id} type={"type"} />
                                </div>
                                <div className="flex flex-col justify-start h-full w-full p-4">
                                    <p className="text-base">{reservation.court.name}</p>
                                    <p className="text-sm text-mainOrange text-wrap">
                                        {reservation.court.location.name}
                                    </p>
                                    <div className="hidden md:flex flex-col w-full md:h-full justify-end min-h-12">
                                        <p className="text-sm font-bold">Zarezerwowano:</p>
                                        <p className="text-xs font-sans text-nowrap">
                                            {reservation.timeFrom.slice(0, -3).replace('T', ' ')} : {reservation.timeTo.slice(11, -3).replace('T', ' ')}
                                        </p>
                                    </div>
                                </div>
                                <span className="flex justify-end items-center p-4">
                                    <div className="flex md:hidden flex-col justify-end space-y-1 h-full w-full">
                                        <p className="text-sm font-bold">Zarezerwowano:</p>
                                        <p className="text-xs font-sans text-nowrap">
                                            {reservation.timeFrom.slice(0, -3).replace('T', ' ')} : {reservation.timeTo.slice(11, -3).replace('T', ' ')}
                                        </p> 
                                    </div>
                                    <span className="flex space-x-3 md:space-x-2 text-3xl md:text-2xl">
                                        <MdCancel onClick={() => {
                                            setTempId(reservation.id);
                                            setCancelWarning(true);
                                        }} className="cursor-pointer hover:text-red-600"/>
                                    </span>
                                </span>
                            </DashboardContainer>
                        )
                    ))
                )
            }
            </div>
            { cancelWarning && (
                <CancelWarning tempId={tempId} setCancelWarning={setCancelWarning} handleCancelReservation={handleCancelReservation}/>
            )}
        </div>
    )
}