"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import { getClubDetails } from "@/hooks/club";
import APIImageComponent from "@/hooks/imageAPI";
import DashboardContainer from "@/components/common/dashboardContainer/DashboardContainer";
import DeleteWarning from "@/components/manageclubs/DeleteWarning";
import { MdEdit, MdDelete } from "react-icons/md";
import Error500Page from "@/components/common/error/Error500Page";
import AddCourtForm from "@/components/managecourts/AddCourtForm";

export default function ClubId({ params }: { params: { clubId: string } }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteWarning, setDeleteWarning] = useState<boolean>(false);
  const [tempId, setTempId] = useState<number>(-1);

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
            Dodaj klub
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
                      <DashboardContainer
                        key={index}
                        onClick={() =>
                          window.location.replace(`/manageclubs/${court.id}`)
                        }
                        className="flex h-fit cursor-pointer"
                      >
                        <div className="p-4 w-[20%]">
                          <APIImageComponent
                            imageId={court.image.id}
                            type={court.image.path}
                          />
                        </div>
                        <div className="flex flex-col justify-center w-full p-4 ">
                          <p className="text-base">{court.name}</p>
                          <p className="text-xs font-sans mb-2">
                            {court.location.name}
                          </p>
                          <p className="text-sm text-mainOrange">
                            {court.surface}
                          </p>
                          <p className="text-sm text-mainOrange">
                            {court.type}
                          </p>
                        </div>
                        <span className="flex justify-end items-center text-2xl space-x-2 p-4">
                          <MdEdit className="cursor-pointer hover:text-mainGreen" />
                          <MdDelete
                            onClick={(e: any) => {
                              e.stopPropagation();
                              setDeleteWarning(true);
                              setTempId(court.id);
                            }}
                            className="cursor-pointer hover:text-red-600"
                          />
                        </span>
                      </DashboardContainer>
                    ))}
                  </div>
                </>
              )}
            </>
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
        <AddCourtForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          clubID={parseInt(params.clubId)}
        />
      )}
    </div>
  );
}
