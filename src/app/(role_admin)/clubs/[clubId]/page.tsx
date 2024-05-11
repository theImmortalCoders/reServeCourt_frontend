"use client";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getClubDetails } from "@/hooks/club";
import { getCurrentUser } from "@/hooks/user";
import Error500Page from "@/components/common/error/Error500Page";
import CourtForm from "@/components/courts/CourtForm";
import DeleteWarningCourt from "@/components/courts/DeleteWarningCourt";
import CourtListComponent from "@/components/courts/CourtListComponent";
import APIImageComponent from "@/hooks/imageAPI";

async function getRole() {
  const userData = await getCurrentUser();
  if (userData && typeof userData === "object" && "role" in userData) {
    return userData.role;
  }
  return null;
}

export default function ClubId({ params }: { params: { clubId: string } }) {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [deleteWarning, setDeleteWarning] = useState<boolean>(false);
  const [tempId, setTempId] = useState<number[]>([-1, -1]);

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getRole();
      setUserRole(role);
    };
    fetchRole();
  }, []);

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

  console.log("clubDetailsData", clubDetailsData);
  return (
    <div className="flex flex-col items-center bg-mainWhite min-h-max p-4 md:p-8">
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
                  <h1 className="mt-2 h-auto w-11/12 lg:w-3/5 flex justify-start text-md lg:text-lg">
                    Opis:
                  </h1>
                  <div className="h-auto w-11/12 lg:w-3/5 flex justify-start text-sm lg:text-md text-mainOrange">
                    {clubDetailsData.description}
                  </div>
                  <div className="w-11/12 lg:w-3/5 text-md lg:text-lg flex items-start mt-2">
                    <h1>Lokalizacja:</h1>
                    <h2 className="pl-2 text-mainOrange">
                      {clubDetailsData.location.name}
                    </h2>
                  </div>
                  <div className="h-full w-11/12 lg:w-3/5 flex justify-between mt-2">
                    <div className="h-full w-auto text-md lg:text-lg flex items-start justify-center">
                      <h1>Liczba kortów:</h1>
                      <h2 className="pl-2 text-mainOrange h-full w-auto flex justify-center">
                        {clubDetailsData.courts.length}
                      </h2>
                    </div>
                    {userRole === "ADMIN" && (
                      <button
                        onClick={() => setIsOpen(true)}
                        className="w-auto h-auto bg-mainGreen text-mainWhite text-md md:text-lg lg:text-xl px-2 lg:px-4 py-1 lg:py-2 rounded"
                      >
                        Dodaj kort
                      </button>
                    )}
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
                        userRole={userRole}
                        daysOpen={clubDetailsData.daysOpen}
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
