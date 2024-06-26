import { Court, DaysOpen } from "@/hooks/club";
import { Dispatch, SetStateAction } from "react";
import DashboardContainer from "../common/dashboardContainer/DashboardContainer";
import { MdBuild, MdDelete, MdEdit} from "react-icons/md";
import { translateCourtSurface, translateCourtType } from "@/utils/courthelper";
import APIImageComponent from "@/hooks/imageAPI";
import { ReservationButton } from "../reservation/ReservationButton";
import Link from "next/link";

export default function CourtListComponent({
  court,
  setIsUpdate,
  setIsOpen,
  setDeleteWarning,
  setActiveWarning,
  setTempId,
  userRole,
  daysOpen,
}: {
  court: Court;
  setIsUpdate?: Dispatch<SetStateAction<boolean>>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setDeleteWarning?: Dispatch<SetStateAction<boolean>>;
  setActiveWarning?: Dispatch<SetStateAction<boolean>>;
  setTempId?: Dispatch<SetStateAction<number[]>>;
  userRole: string | null;
  daysOpen: DaysOpen;
}) {
  return (
    <DashboardContainer className="flex flex-col md:flex-row md:h-36">
      <div className="flex items-center w-40 p-4">
        <APIImageComponent imageId={court.image.id} type={court.image.path} />
      </div>
      <div className="flex flex-col justify-center w-full p-4 ">
        <p className="text-base">{court.name}</p>
        <div className="hidden md:flex flex-col justify-end space-y-1 h-full">
          <p className="text-sm text-mainOrange text-wrap">
            {court.location.name}
          </p>
          <span className="flex items-end space-x-8 text-xs">
            <p>Typ nawierzchni: {translateCourtSurface(court.surface)}</p>
            <p>Typ kortu: {translateCourtType(court.type)}</p>
          </span>
        </div>
      </div>
      <span className="flex justify-end items-center p-4">
        <div className="flex md:hidden flex-col justify-end space-y-1 h-full w-full">
          <p className="text-xs 2xs:text-sm text-mainOrange">
            {court.location.name}
          </p>
          <span className="flex flex-col 2xs:flex-row items-start xs:items-end space-x-0 2xs:space-x-4 text-xs">
            <p>Typ nawierzchni: {translateCourtSurface(court.surface)}</p>
            <p>Typ kortu: {translateCourtType(court.type)}</p>
          </span>
        </div>
        <div className="flex-col w-auto">
          <ReservationButton courtId={court.id} daysOpen={daysOpen} />
          {userRole === "ADMIN" && (
            <span className="flex space-x-3 md:space-x-2 text-3xl md:text-2xl justify-end pt-2">
              <Link className="w-auto h-auto bg-mainGreen text-mainWhite text-sm lg:text-md px-1 lg:px-2 py-1 rounded" href={`/reservation/${court.id}`}>Zobacz rezerwację</Link>
              <MdEdit
                onClick={(e: any) => {
                  e.preventDefault();
                  if (setIsUpdate && setTempId && setIsOpen) {
                    setIsUpdate(true);
                    setTempId([court.id, court.image.id]);
                    setIsOpen(true);
                  }
                }}
                className="cursor-pointer hover:text-mainGreen"
              />
               <MdBuild
                   onClick={(e: any) => {
                     e.preventDefault();
                     if (setActiveWarning && setTempId) {
                       setActiveWarning(true);
                       setTempId([court.id, court.image.id]);
                     }
                   }}
                   className="cursor-pointer hover:text-mainOrange"/>
              <MdDelete
                onClick={(e: any) => {
                  e.stopPropagation();
                  if (setDeleteWarning && setTempId) {
                    setDeleteWarning(true);
                    setTempId([court.id, court.image.id]);
                  }
                }}
                className="cursor-pointer hover:text-red-600"
              />
            </span>
          )}
        </div>
      </span>
    </DashboardContainer>
  );
}
