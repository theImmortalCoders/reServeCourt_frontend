"use client";
import Page from "@/components/common/page/Page"
import Box from "@/components/common/box/Box"
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { FiLock } from "react-icons/fi";
import { changePassword } from "@/hooks/user";

function PasswordChangeInput({
    placeholder,
    value,
    setValue
}:{
    placeholder?:string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}) {
    return (
        <div className="flex items-center border text-sm lg:text-base border-gray-500 rounded px-3 py-2 mb-4">
            <FiLock className="h-4 w-4 lg:h-5 lg:w- text-gray-500 mr-2"/>
            <input
                type="password"
                name="password"
                value={value}
                onChange={(e) => {
                    const value = e.target.value;
                    setValue(value);
                  }}
                placeholder={ placeholder || "Hasło"}
                className="w-full outline-none focus:outline-none bg-inherit"
                required
              />
         </div>
    )
}

export default function PasswordChangePage() {

    const [oldPass, setOldPass] = useState<string>("");
    const [newPass, setNewPass] = useState<string>("");
    const [repNewPass, setRepNewPass] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [message]);

    const handleChangePassword = async () => {

        if (!oldPass || !newPass || !repNewPass) {
            console.error("Pola muszą być wypełnione");
            setMessage("Pola muszą być wypełnione");
            return;
        }

        if (newPass !== repNewPass) {
            console.error("Błąd aktualizowania hasła");
            setMessage("Błąd aktualizowania hasła");
            return;
        }

        try {
            setIsLoading(true);
            const result = await changePassword({oldPassword: oldPass, newPassword: newPass});
            if (result === 200) {
                setMessage("Zaktualizowano hasło")
                setOldPass("");
                setNewPass("");
                setRepNewPass("");
                setIsLoading(false);
            } else {
                console.error("Błąd aktualizowania hasła");
                setMessage("Błąd aktualizowania hasła");
                setIsLoading(false);
            }
          } catch (error) {
            console.error("Błąd aktualizowania hasła", error);
            setMessage("Błąd aktualizowania hasła");
          }
    }

    return (
        <Page className="flex justify-center items-center">
            <Box>
                <h2 className="text-xl lg:text-2xl font-semibold mb-3">Zmiana hasła</h2>
                <PasswordChangeInput value={oldPass} setValue={setOldPass} placeholder="Stare hasło"/>
                <PasswordChangeInput value={newPass} setValue={setNewPass} placeholder="Nowe hasło"/>
                <PasswordChangeInput value={repNewPass} setValue={setRepNewPass} placeholder="Powtórz nowe hasło"/>
                <button onClick={handleChangePassword} disabled={isLoading} className="bg-darkGreen text-mainWhite rounded px-3 lg:px-4 py-2 w-full">
                    {isLoading ? 'Zapisywanie...' : 'Zmień hasło'}
                </button>
                {message && (
                    message === "Zaktualizowano hasło" ? (
                        <p className="mt-4 text-start text-sm text-green-800">{message}</p>
                    ) : (
                        <p className="mt-4 text-start text-sm text-red-800">{message}</p>
                    )
                )}
            </Box>
        </Page>
    )
}