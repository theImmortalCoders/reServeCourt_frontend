import { Content, Court } from "@/hooks/club";
import { Dispatch, SetStateAction } from "react";
import DashboardContainer from "../common/dashboardContainer/DashboardContainer";
import { MdDelete, MdEdit } from "react-icons/md";
import { translateCourtSurface, translateCourtType } from "@/utils/courthelper";
import APIImageComponent from "@/hooks/imageAPI";

export default function CourtListComponent({
  court,
  setIsUpdate,
  setIsOpen,
  setDeleteWarning,
  setTempId,
}: {
  court: Court;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setDeleteWarning: Dispatch<SetStateAction<boolean>>;
  setTempId: Dispatch<SetStateAction<number[]>>;
}) {
  return (
    <DashboardContainer className="flex flex-col md:flex-row md:h-36 cursor-pointer">
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
        <MdEdit
          onClick={(e: any) => {
            e.preventDefault();
            setIsUpdate(true);
            setTempId([court.id, court.image.id]);
            setIsOpen(true);
          }}
          className="cursor-pointer hover:text-mainGreen"
        />
        <MdDelete
          onClick={(e: any) => {
            e.stopPropagation();
            setDeleteWarning(true);
            setTempId([court.id, court.image.id]);
          }}
          className="cursor-pointer hover:text-red-600"
        />
      </span>
    </DashboardContainer>
  );
}
