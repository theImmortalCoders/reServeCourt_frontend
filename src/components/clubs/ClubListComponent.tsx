import { MdDelete, MdEdit } from "react-icons/md";
import DashboardContainer from "../common/dashboardContainer/DashboardContainer";
import APIImageComponent from "@/hooks/imageAPI";
import { Content } from "@/hooks/club";
import RatingStars from "../common/ratingStars/RatingStars";
import { Dispatch, SetStateAction } from "react";

export default function ClubListComponent({
  club,
  setIsUpdate,
  setIsOpen,
  setDeleteWarning,
  setTempId,
  userRole
}: {
  club: Content;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setDeleteWarning: Dispatch<SetStateAction<boolean>>;
  setTempId: Dispatch<SetStateAction<number[]>>;
  userRole: string | null;
}) {
  return (
    <DashboardContainer
      className="flex flex-col md:flex-row md:h-36 cursor-pointer"
      clubId={club.id}
    >
      <div className="flex items-center w-40 p-4">
        <APIImageComponent imageId={club.logo.id} type={club.logo.path} />
      </div>
      <div className="flex flex-col justify-center w-full p-4">
        <p className="text-base">{club.name}</p>
        <p className="text-xs font-sans mb-2 text-wrap min-h-12 md:h-fit">
          {club.description}
        </p>
        <div className="hidden md:flex flex-col justify-end space-y-1 h-full">
          <p className="text-sm text-mainOrange text-wrap">
            {club.location.name}
          </p>
          <span className="flex items-end space-x-8 text-xs">
            <p>Liczba kortów: {club.courtsAmount}</p>
            <span className="flex items-center space-x-1">
              <p>Ocena:</p>
              <RatingStars rating={club.rating} />
            </span>
          </span>
        </div>
      </div>
      <span className="flex justify-end items-center p-4">
        <div className="flex md:hidden flex-col justify-end space-y-1 h-full w-full">
          <p className="text-xs 2xs:text-sm text-mainOrange">
            {club.location.name}
          </p>
          <span className="flex flex-col 2xs:flex-row items-start xs:items-end space-x-0 2xs:space-x-4 text-xs">
            <p>Liczba kortów: {club.courtsAmount}</p>
            <span className="flex items-center space-x-1">
              <p>Ocena:</p>
              <RatingStars rating={club.rating} />
            </span>
          </span>
        </div>
        { userRole === "ADMIN" && (
          <span className="flex space-x-3 md:space-x-2 text-3xl md:text-2xl">
            <MdEdit
              onClick={(e: any) => {
                e.preventDefault();
                setIsUpdate(true);
                setTempId([club.id, club.logo.id]);
                setIsOpen(true);
              }}
              className="cursor-pointer hover:text-mainGreen"
            />
            <MdDelete
              onClick={(e: any) => {
                e.preventDefault();
                setDeleteWarning(true);
                setTempId([club.id, club.logo.id]);
              }}
              className="cursor-pointer hover:text-red-600"
            />
          </span>
        )}
      </span>
    </DashboardContainer>
  );
}
