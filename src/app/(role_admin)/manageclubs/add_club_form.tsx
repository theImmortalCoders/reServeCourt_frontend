"use client";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { MdDriveFileRenameOutline, MdOutlineShortText, MdImage } from "react-icons/md";
import { AddClubData, addClub, Location } from "@/hooks/club";
import { uploadSingleImage } from "@/hooks/image";

function FormBox ({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col space-y-4 bg-mainWhite p-7 rounded shadow-md w-11/12 lg:w-3/5">
            { children }
        </div>
    )
}

function ClubFormInput ({
    type,
    id,
    name,
    placeholder,
    value,
    icon,
    onChange,
    className,
    isForm,
    }: {
    type: string;
    id: string;
    name: string;
    placeholder: string,
    accept?: string,
    value?: string,
    icon?: React.ReactNode;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
    isForm?: boolean;
    }) {
    return (
        <div className={`flex items-center border text-sm lg:text-base border-gray-500 rounded px-3 py-2 ${className}`}>
            {icon}
            {isForm ? (
                <form id={id}>
                    <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        className="w-full outline-none focus:outline-none bg-inherit"
                        autoComplete="off"
                        required
                    />            
                </form>
            ) : (
                <input
                        type={type}
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        className="w-full outline-none focus:outline-none bg-inherit"
                        autoComplete="off"
                        required
                    />            
            )}
        </div>
    )
}

function ClubNameInput ({
    name,
    setName
    }: {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    }) {
    return (
        <ClubFormInput
            type="text"
            id="nameInput"
            name="name"
            placeholder="Nazwa"
            value={name}
            icon={<MdDriveFileRenameOutline className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2"/>}
            onChange={(e) => {
                const value = e.target.value;
                setName(value);
            }}
        />   
    )
}

function ClubDescriptionInput ({
    description,
    setDescription
    }: {
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    }) {
    return (
        <div className="flex border text-sm lg:text-base border-gray-500 rounded px-3 py-2">
            <MdOutlineShortText className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2"/>
            <textarea
                id="descriptionInput"
                name="description"
                placeholder="Opis"
                value={description}
                className="w-full h-16 outline-none focus:outline-none bg-inherit"
                onChange={(e) => {
                    const value = e.target.value;
                    setDescription(value);
                }}
            />               
        </div>
    )
}

function ClubLocationMap () {
    return (
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d164088.40954316402!2d21.811627027973955!3d50.01357813382295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfae3cc14d449%3A0xd2240d31b33eb2ed!2zUnplc3rDs3c!5e0!3m2!1spl!2spl!4v1713206101009!5m2!1spl!2spl" className="w-full h-96 rounded"></iframe>
    )
}

function ClubLogoInput ({
    logoFile,
    setLogoFile,
    isForm,
    }: {
    logoFile: File;
    setLogoFile: Dispatch<SetStateAction<File>>;
    isForm?: boolean;
    }) {
    return (
    <ClubFormInput
        type="file"
        id="logoInput"
        name="logoFile"
        placeholder="Logo"
        accept=".png, .jpg, .jpeg"
        icon={<MdImage className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2"/>}
        onChange={(e) => {
                if (e.target.files) {
                    setLogoFile(e.target.files[0]);
                }
            }
        }
        isForm={isForm}
    />   
    )
}

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
        <FormBox>
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
        </FormBox>
    )
}