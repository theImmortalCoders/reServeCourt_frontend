"use client";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getClubDetails } from "@/hooks/club";
import Error500Page from "@/components/common/error/Error500Page";
import CourtForm from "@/components/managecourts/CourtForm";
import DeleteWarningCourt from "@/components/managecourts/DeleteWarningCourt";
import CourtListComponent from "@/components/managecourts/CourtListComponent";
import APIImageComponent from "@/hooks/imageAPI";

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
    <div className="flex flex-col items-center bg-mainWhite min-h-max p-8">
      {!isOpen ? (
        <>
          {clubDetailsLoading ? (
            <div>Trwa ładowanie danych...</div>
          ) : (
            <>
              {clubDetailsData && typeof clubDetailsData !== "string" && (
                <>
                  <div className="w-[100px]">
                    <APIImageComponent
                      imageId={clubDetailsData.logo.id}
                      type={clubDetailsData.logo.path}
                    />
                  </div>
                  <div className="mt-2">
                    <h1 className="w-full text-2xl">{clubDetailsData.name}</h1>
                  </div>
                  <h1 className="mt-2 h-auto w-11/12 lg:w-3/5 flex justify-start text-lg">
                    Opis:
                  </h1>
                  <div className="h-auto w-11/12 lg:w-3/5 flex justify-start text-md text-mainOrange">
                    {clubDetailsData.description}
                  </div>
                  <div className="w-11/12 lg:w-3/5 text-lg flex items-start mt-2">
                    <h1>Lokalizacja:</h1>
                    <h2 className="pl-2 text-md text-mainOrange">
                      {clubDetailsData.location.name}
                    </h2>
                  </div>
                  <div className="h-auto w-11/12 lg:w-3/5 flex justify-between mt-2">
                    <div className="h-auto w-auto text-lg flex items-start">
                      <h1>Liczba kortów:</h1>
                      <h2 className="pl-2 text-md text-mainOrange">
                        {clubDetailsData.courts.length}
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsOpen(true)}
                      className="w-auto h-auto bg-mainGreen text-mainWhite text-xl px-4 py-2 rounded"
                    >
                      Dodaj kort
                    </button>
                  </div>
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
