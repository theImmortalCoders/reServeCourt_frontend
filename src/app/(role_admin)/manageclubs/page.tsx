"use client";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAllClubs } from "@/hooks/club";
import AddClubForm from "../../../components/manageclubs/AddClubForm";

export default function ManageClubs () {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {
        data: clubsData,
        isLoading: clubsLoading,
        isError: clubsError,
    } = useQuery("clubs", getAllClubs)
    return (
        <div className="flex flex-col items-center bg-mainWhite min-h-max py-8">
            {!isOpen ? (
                <>
                    <button onClick={() => (setIsOpen(true))} className="bg-mainGreen text-mainWhite text-xl w-fit px-4 py-2 rounded">Dodaj klub</button>
                    { clubsLoading || clubsError ? (
                        <div>
                            Trwa ładowanie danych...
                        </div>
                    ) : (
                        <div>
                            { clubsData && clubsData.content.map((club, index) => (
                                <div key={index}>
                                    { club.name }
                                </div>
                            )) }
                        </div>
                    )}
                </>
            ) : (
                <AddClubForm isOpen={isOpen} setIsOpen={setIsOpen}/>
            )}
        </div>
    )
    
}