"use client";
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
            Dodaj klub
          </button>
          {courtsLoading || courtsError ? (
            <div>Trwa ładowanie danych...</div>
          ) : (
            <div className="w-11/12 lg:w-3/5 space-y-2">
              {courtsData &&
                courtsData.content.map((court, index) => (
                  <DashboardContainer
                    key={index}
                    onClick={() =>
                      window.location.replace(`/managecourts/${court.id}`)
                    }
                    className="flex h-fit cursor-pointer"
                  >
                    <div className="p-4 w-[20%]">
                      <APIImageComponent
                        imageId={court.logo.id}
                        type={court.logo.path}
                      />
                    </div>
                    <div className="flex flex-col justify-center w-full p-4 ">
                      <p className="text-base">{court.name}</p>
                      <p className="text-xs font-sans mb-2">
                        {court.description}
                      </p>
                      <p className="text-sm text-mainOrange">
                        {court.location.name}
                      </p>
                      <span className="flex items-center space-x-8 mt-2 text-xs">
                        <p>Liczba kortów: {court.courtsAmount}</p>
                        <span className="flex items-center space-x-1">
                          <p>Ocena:</p>
                          <RatingStars rating={court.rating} />
                        </span>
                      </span>
                    </div>
                    <span className="flex justify-end items-center text-2xl space-x-2 p-4">
                      <MdEdit className="cursor-pointer hover:text-mainGreen" />
                      <MdDelete
                        onClick={(e: any) => {
                          e.stopPropagation();
                          setDeleteWarning(true);
                          setTempId(club.id);
                        }}
                        className="cursor-pointer hover:text-red-600"
                      />
                    </span>
                  </DashboardContainer>
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
        <AddCourtForm isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}
