"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import { getAllClubs } from "@/hooks/club";
import AddClubForm from "../../../components/manageclubs/AddClubForm";

export default function ManageClubs() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteWarning, setDeleteWarning] = useState<boolean>(false);
  const [tempId, setTempId] = useState<number>(-1);

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
    <div className="flex flex-col items-center bg-mainWhite min-h-max p-8 space-y-6">
      {!isOpen ? (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-mainGreen text-mainWhite text-xl w-fit px-4 py-2 rounded"
          >
            Dodaj kort
          </button>
        </>
      ) : (
        <AddClubForm isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}
