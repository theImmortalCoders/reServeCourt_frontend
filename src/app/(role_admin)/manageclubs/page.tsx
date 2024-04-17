"use client";
import { useState, useEffect, Dispatch, SetStateAction, } from "react";
import { useQuery } from "react-query";
import { getAllClubs } from "@/hooks/club";
import APIImageComponent from "@/hooks/imageAPI";
import AddClubForm from "../../../components/manageclubs/AddClubForm";
import DashboardContainer from "@/components/common/dashboardContainer/DashboardContainer";
import RatingStars from "@/components/common/ratingStars/RatingStars";
import { MdEdit, MdDelete } from "react-icons/md";

function DeleteWarning  ({
    deleteWarning,
    setDeleteWarning
}: {
    deleteWarning: boolean,
    setDeleteWarning: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <div className="fixed flex items-center justify-center inset-0 z-10">
            <div className="absolute inset-0 bg-mainWhite opacity-80"></div>
            <div className="flex flex-col justify-center items-center w-1/4 border-2 border-darkGreen bg-mainWhite rounded space-y-2 p-4 z-20">
                <h1 className="text-xl">Usuwanie klubu</h1>
                <p className="text-sm text-center font-sans">Czy na pewno chcesz usunąć wybrany klub?<br/>Operacja jest nieodwracalna i spowoduje trwałe usunięcie klubu wraz ze wszystkimi przypisanymi do niego kortami.</p>
                <span className="space-x-4">
                    <button onClick={() => setDeleteWarning(false)}className="text-right text-mainOrange text-sm sm:text-md">Anuluj</button>
                    <button className="bg-red-600 text-mainWhite text-sm rounded px-4 py-2 w-fit">Usuń</button>
                </span>
            </div>
        </div>
    )
}

export default function ManageClubs () {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleteWarning, setDeleteWarning] = useState<boolean>(false);

    const {
        data: clubsData,
        isLoading: clubsLoading,
        isError: clubsError,
        refetch: refetchClubs
    } = useQuery("clubs", getAllClubs)

    useEffect(() => {
        if (!isOpen) {
            refetchClubs();
        }
    }, [isOpen]);

    return (
        <div className="flex flex-col items-center bg-mainWhite min-h-max p-8 space-y-6">
            {!isOpen ? (
                <>
                    <button onClick={() => (setIsOpen(true))} className="bg-mainGreen text-mainWhite text-xl w-fit px-4 py-2 rounded">Dodaj klub</button>
                    { clubsLoading || clubsError ? (
                        <div>
                            Trwa ładowanie danych...
                        </div>
                    ) : (
                        <div className="w-11/12 lg:w-3/5 space-y-2">
                            { clubsData && clubsData.content.map((club, index) => (
                                <DashboardContainer key={index} onClick={() => window.location.replace("/managecourts")} className="flex h-fit">
                                    <div className="p-4 w-[20%]">
                                        <APIImageComponent imageId={club.logo.id} type={club.logo.path} />
                                    </div>
                                    <div className="flex flex-col justify-center w-full p-4 ">
                                        <p className="text-base">{ club.name }</p>
                                        <p className="text-xs font-sans mb-2">{ club.description }</p>
                                        <p className="text-sm text-mainOrange">{ club.location.name }</p>
                                        <span className="flex items-center space-x-8 mt-2 text-xs"> 
                                            <p>Liczba kortów: { club.courtsAmount }</p>
                                            <span className="flex items-center space-x-1"><p>Ocena:</p><RatingStars rating={club.rating}/></span>
                                        </span>
                                    </div>
                                    <span className="flex justify-end items-center text-2xl space-x-2 p-4">
                                        <MdEdit className="cursor-pointer hover:text-mainGreen"/>
                                        <MdDelete onClick={() => setDeleteWarning(true)} className="cursor-pointer hover:text-red-600" /> 
                                    </span>
                                </DashboardContainer>
                            )) }
                        </div>
                    )}
                </>
            ) : (
                <AddClubForm isOpen={isOpen} setIsOpen={setIsOpen}/>
            )}
            { deleteWarning && (
                <DeleteWarning deleteWarning={deleteWarning} setDeleteWarning={setDeleteWarning}/>
            )}
        </div>
    )
}