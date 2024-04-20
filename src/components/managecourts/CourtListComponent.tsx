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
    <DashboardContainer className="flex h-fit cursor-pointer">
      <div className="p-4 w-[20%]">
        <APIImageComponent imageId={court.image.id} type={court.image.path} />
      </div>
      <div className="flex flex-col justify-center w-full p-4 ">
        <p className="text-base">{court.name}</p>
        <p className="text-xs font-sans mb-2"></p>
        <p className="text-sm text-mainOrange">{court.location.name}</p>
        <div className="text-sm flex items-center">
          <h1>Typ nawierzchni:</h1>
          <h2 className="pl-2 text-sm text-mainOrange">
            {translateCourtSurface(court.surface)}
          </h2>
        </div>
        <div className="text-sm flex items-center">
          <h1>Typ kortu:</h1>
          <h2 className="pl-2 text-sm text-mainOrange">
            {translateCourtType(court.type)}
          </h2>
        </div>
      </div>
      <span className="flex justify-end items-center text-2xl space-x-2 p-4">
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
