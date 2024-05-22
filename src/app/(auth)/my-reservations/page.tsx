"use client"
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { getAllReservationByCurrentUser } from "@/hooks/reservation";
import { useQuery } from 'react-query';
import DashboardContainer from "@/components/common/dashboardContainer/DashboardContainer";
import APIImageComponent from "@/hooks/imageAPI";
import { MdCancel } from "react-icons/md";

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

    const {
        data: reservationsData,
        isLoading,
        isError,
        refetch
    } = useQuery(["reservations", isCurrent], () => getAllReservationByCurrentUser(isCurrent ? currentDate : undefined, isCurrent ? undefined : currentDate))

    return (
        <div className="flex flex-col items-center bg-mainWhite min-h-max py-8 space-y-6">
            <HistoryCurrentSwitch isCurrent={isCurrent} setIsCurrent={setIsCurrent}/>
            <div className="w-11/12 xl:w-3/5 space-y-8 md:space-y-2">
            {!isLoading && !isError && (
                    Array.isArray(reservationsData) &&
                    reservationsData.map((reservation) => (
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
                                    <MdCancel className="cursor-pointer hover:text-red-600"/>
                                </span>
                            </span>
                        </DashboardContainer>
                    ))
                )
            }
            </div>
        </div>
    )
}