"use client";
import AddCourtForm from "@/components/managecourts/AddCourtForm";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function ManageCourts() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteWarning, setDeleteWarning] = useState<boolean>(false);
  const [tempId, setTempId] = useState<number>(-1);

  const {
    data: courtsData,
    isLoading: courtsLoading,
    isError: courtsError,
    refetch: refetchCourts,
  } = useQuery("clubs", getAllCourts);

  function getAllCourts() {}

  useEffect(() => {
    if (!isOpen && !deleteWarning) {
      refetchCourts();
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
        <AddCourtForm isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}
