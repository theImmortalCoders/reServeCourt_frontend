"use client";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getAllClubs } from "@/hooks/club";
import { getCurrentUser } from "@/hooks/user";
import ClubForm from "../../../components/clubs/ClubForm";
import DeleteWarning from "@/components/clubs/DeleteWarning";
import ClubListComponent from "@/components/clubs/ClubListComponent";

async function getRole() {
  const userData = await getCurrentUser();
  if (userData && typeof userData === 'object' && 'role' in userData) {
    return userData.role;
  }
  return null;
}

export default function ManageClubs() {
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
          {userRole === "ADMIN" ? (
            <button
              onClick={() => setIsOpen(true)}
              className="bg-mainGreen text-mainWhite text-xl w-fit px-4 py-2 rounded"
            >
              Dodaj klub
            </button>  
          ) : (
            <p className="text-2xl">Dostępne kluby:</p>
          )}
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
                    userRole={userRole}
                  />
                ))}
            </div>
          )}
          {deleteWarning && (
            <DeleteWarning
              setDeleteWarning={setDeleteWarning}
              tempId={tempId}
              setTempId={setTempId}
            />
          )}
        </>
      ) : (
        <ClubForm
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
