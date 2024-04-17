"use client";
import DashboardContainer from "@/components/common/dashboardContainer/dashboardContainer";
import { ClubNameInput, ClubDescriptionInput, ClubLocationMap, ClubLogoInput } from "@/components/manageclubs/Inputs";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { AddClubData, addClub, Location } from "@/hooks/club";
import { uploadSingleImage } from "@/hooks/image";

export default function AddClubForm ({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [locX, setLocX] = useState<number>(0);
    const [locY, setLocY] = useState<number>(0);
    const [locName, setLocName] = useState<string>("");
    const [logoId, setLogoId] = useState<number>(0);
    const [logoFile, setLogoFile] = useState<File>(new File([], ""));

    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const handleNewImage = async () => {
          try {
            if (!logoFile.name) return;
            const result = await uploadSingleImage(logoFile, false);
            if (typeof result !== "string") setLogoId(result.id);
          } catch (error) {
            console.error("Błąd dodawania obrazu", error);
          }
        };
    
        handleNewImage();
      }, [logoFile]);

    const submitForm  = async () => {
        if(!name || !description || locX === null || locY === null) {
            console.error("Pola muszą być wypełnione");
            setMessage("Pola muszą być wypełnione");
            return;
        }

        const newLocation: Location = {
            locX: locX,
            locY: locY,
            name: locName
        }

        const newClubData: AddClubData = {
            name: name,
            description: description,
            location: newLocation,
            logoId: logoId
        }

        try {
            const result = await addClub(newClubData);
            if (result === 200) {
                setName("");
                setDescription("");
                setLocX(0);
                setLocY(0);
                setLocName("");
                setLogoId(0);
                setLogoFile(new File([], ""));
                const form = document.getElementById("logoInput") as HTMLFormElement;
                if (form) {
                  form.reset();
                }
                setMessage("Dodano klub");
            }
            else {
                console.error("Błąd dodawania klubu");
                setMessage("Błąd dodawania klubu");
            }
        }
        catch (error) {
            console.error("Błąd dodawania klubu", error);
            setMessage("Błąd dodawania klubu");
        }
    }

    return (
        <DashboardContainer className="flex flex-col space-y-4 p-7 w-11/12 lg:w-3/5">
            <h1 className="text-xl lg:text-2xl font-semibold">Dodawanie klubu</h1>
            <ClubNameInput name={name} setName={setName}/>
            <ClubDescriptionInput description={description} setDescription={setDescription}/>
            <div className="space-y-1">
                <p className="text-sm">Wybierz lokalizację:</p>
                <ClubLocationMap/>
            </div>
            
            <div className="space-y-1">
                <p className="text-sm">Wczytaj logo:</p>
                <ClubLogoInput logoFile={logoFile} setLogoFile={setLogoFile} isForm={true}/>                
            </div>
            <span className='flex justify-center space-x-4'>
                <button onClick={() => setIsOpen(false)} className="text-right text-mainOrange text-sm sm:text-md">Zamknij</button>
                <button onClick={submitForm} className="bg-darkGreen text-mainWhite text-sm rounded px-4 py-2 w-fit">Dodaj</button>
            </span>
            <div className="flex w-full justify-center">
                <p className="text-xs text-center">{ message }</p>
            </div>
        </DashboardContainer>
    )
}