"use client";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getClubDetails } from "@/hooks/club";
import Error500Page from "@/components/common/error/Error500Page";
import CourtForm from "@/components/managecourts/CourtForm";
import DeleteWarningCourt from "@/components/managecourts/DeleteWarningCourt";
import CourtListComponent from "@/components/managecourts/CourtListComponent";

export default function ClubId({ params }: { params: { clubId: string } }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [deleteWarning, setDeleteWarning] = useState<boolean>(false);
  const [tempId, setTempId] = useState<number[]>([-1, -1]);

  const {
    data: clubDetailsData,
    isLoading: clubDetailsLoading,
    isError: clubDetailsError,
    refetch: refetchClubs,
  } = useQuery("clubDetails", () => getClubDetails(parseInt(params.clubId)));

  useEffect(() => {
    if (!isOpen && !deleteWarning) {
      refetchClubs();
    }
  }, [isOpen, tempId]);

  if (clubDetailsError) return <Error500Page />;

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
          {clubDetailsLoading ? (
            <div>Trwa ładowanie danych...</div>
          ) : (
            <>
              {clubDetailsData && typeof clubDetailsData !== "string" && (
                <>
                  <span className="flex items-center space-x-8 mt-2 text-xs">
                    <p>Liczba kortów: {clubDetailsData.courts.length}</p>
                  </span>

                  <div className="w-11/12 lg:w-3/5 space-y-2">
                    {clubDetailsData.courts.map((court, index) => (
                      <CourtListComponent
                        key={index}
                        court={court}
                        setIsUpdate={setIsUpdate}
                        setIsOpen={setIsOpen}
                        setDeleteWarning={setDeleteWarning}
                        setTempId={setTempId}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          {deleteWarning && (
            <DeleteWarningCourt
              deleteWarning={deleteWarning}
              setDeleteWarning={setDeleteWarning}
              tempId={tempId}
              setTempId={setTempId}
            />
          )}
        </>
      ) : (
        <CourtForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          tempId={tempId}
          setTempId={setTempId}
          clubID={parseInt(params.clubId)}
        />
      )}
    </div>
  );
}
