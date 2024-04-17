import { MdDriveFileRenameOutline, MdOutlineShortText, MdImage } from "react-icons/md";
import React, { Dispatch, SetStateAction } from "react";

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

export function ClubNameInput ({
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

export function ClubDescriptionInput ({
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

export function ClubLocationMap () {
    return (
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d164088.40954316402!2d21.811627027973955!3d50.01357813382295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfae3cc14d449%3A0xd2240d31b33eb2ed!2zUnplc3rDs3c!5e0!3m2!1spl!2spl!4v1713206101009!5m2!1spl!2spl" className="w-full h-96 rounded"></iframe>
    )
}

export function ClubLogoInput ({
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