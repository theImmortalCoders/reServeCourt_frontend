"use client";
import { useState, useEffect, SetStateAction } from "react";
import { useQuery } from "react-query";
import { getAllClubs } from "@/hooks/club";
import ClubForm from "../../../components/manageclubs/ClubForm";
import DeleteWarning from "@/components/manageclubs/DeleteWarning";
import ClubListComponent from "@/components/manageclubs/ClubListComponent";

export default function ManageClubs() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [deleteWarning, setDeleteWarning] = useState<boolean>(false);
  const [tempId, setTempId] = useState<number[]>([-1, -1]);

  const {
    data: clubsData,
    isLoading: clubsLoading,
    isError: clubsError,
    refetch: refetchClubs,
  } = useQuery("clubs", getAllClubs);

  useEffect(() => {
    if (!isOpen && !deleteWarning) {
      refetchClubs();
    }
  }, [isOpen, tempId]);

  return (
    <div className="flex flex-col items-center bg-mainWhite min-h-max py-8 space-y-6">
      {!isOpen ? (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-mainGreen text-mainWhite text-xl w-fit px-4 py-2 rounded"
          >
            Dodaj klub
          </button>
          {clubsLoading || clubsError ? (
            <div>Trwa ładowanie danych...</div>
          ) : (
            <div className="w-11/12 xl:w-3/5 space-y-8 md:space-y-2">
              {clubsData &&
                clubsData.content.map((club, index) => (
                  <ClubListComponent
                    key={index}
                    club={club}
                    setIsUpdate={setIsUpdate}
                    setIsOpen={setIsOpen}
                    setDeleteWarning={setDeleteWarning}
                    setTempId={setTempId}
                  />
                ))}
            </div>
          )}
          {deleteWarning && (
            <DeleteWarning
              deleteWarning={deleteWarning}
              setDeleteWarning={setDeleteWarning}
              tempId={tempId}
              setTempId={setTempId}
            />
          )}
        </>
      ) : (
        <ClubForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          tempId={tempId}
          setTempId={setTempId}
        />
      )}
    </div>
  );
}
