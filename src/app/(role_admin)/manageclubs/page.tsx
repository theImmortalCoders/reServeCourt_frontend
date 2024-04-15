"use client";
import { useState } from "react";
import AddClubForm from "./add_club_form";

export default function ManageClubs () {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="flex flex-col items-center bg-mainWhite min-h-max py-8">
            {!isOpen ? (
                <button onClick={() => (setIsOpen(true))} className="bg-mainGreen text-mainWhite text-xl w-fit px-4 py-2 rounded">Dodaj klub</button>
            ) : (
                <AddClubForm isOpen={isOpen} setIsOpen={setIsOpen}/>
            )}
        </div>
    )
}