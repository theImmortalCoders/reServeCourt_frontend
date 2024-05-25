import { Dispatch, SetStateAction } from "react";
import { ReservationData } from "@/hooks/reservation";
import DashboardContainer from "@/components/common/dashboardContainer/DashboardContainer";
import APIImageComponent from "@/hooks/imageAPI";
import { MdCancel } from "react-icons/md";

export default function ReservationListComponent({
  reservation,
  setCancelWarning,
  setTempId,
}: {
  reservation: ReservationData;
  setCancelWarning: Dispatch<SetStateAction<boolean>>;
  setTempId: Dispatch<SetStateAction<number>>;
}) {
  return (
    <DashboardContainer className="flex flex-col md:flex-row md:h-36">
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
            {reservation.timeFrom.slice(0, -3).replace("T", " ")} :{" "}
            {reservation.timeTo.slice(11, -3).replace("T", " ")}
          </p>
        </div>
      </div>
      <span className="flex justify-end items-center p-4">
        <div className="flex md:hidden flex-col justify-end space-y-1 h-full w-full">
          <p className="text-sm font-bold">Zarezerwowano:</p>
          <p className="text-xs font-sans text-nowrap">
            {reservation.timeFrom.slice(0, -3).replace("T", " ")} :{" "}
            {reservation.timeTo.slice(11, -3).replace("T", " ")}
          </p>
        </div>
        {reservation.timeTo >
          new Date().toISOString().slice(0, -5).toString() && (
          <span className="flex space-x-3 md:space-x-2 text-3xl md:text-2xl">
            <MdCancel
              onClick={() => {
                setTempId(reservation.id);
                setCancelWarning(true);
              }}
              className="cursor-pointer hover:text-red-600"
            />
          </span>
        )}
      </span>
    </DashboardContainer>
  );
}
