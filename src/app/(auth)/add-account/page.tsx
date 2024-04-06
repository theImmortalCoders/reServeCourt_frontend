"use client";
import Box from "@/components/common/box/Box";
import Page from "@/components/common/page/Page";
import { LoginButtonClass } from "@/components/login/atoms/LoginButton";
import LoginHeader from "@/components/login/atoms/LoginHeader";
import {
  InputBirthDate,
  InputEmail,
  InputName,
  InputPassword,
  InputPhoneNumber,
  InputSecondPassword,
  InputSurname,
} from "@/components/login/molecules/Inputs";
import { RegisterNewUserData, registerNewUser } from "@/hooks/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddAccount() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [addAccount, setAddAccount] = useState<boolean | undefined>(undefined);
  const router = useRouter();

  const submitAddAccount = async (formData: FormData) => {
    setLoading(true);
    setButtonDisabled(true);
    setAddAccount(undefined);
    const password = formData.get("password");
    const secondpassword = formData.get("secondpassword");
    if (password !== secondpassword) {
      setAddAccount(false);
      setMessage("Hasła nie są takie same");
      setTimeout(() => {
        setButtonDisabled(false);
        setLoading(false);
        setAddAccount(undefined);
      }, 2 * 1000);
      return;
    } else {
      const name = formData.get("name");
      const surname = formData.get("surname");
      const birthDate = formData.get("birthDate");
      const phoneNumber = formData.get("phoneNumber");
      const email = formData.get("email");
      const newUser: RegisterNewUserData = {
        name,
        surname,
        birthDate,
        password: password,
        phoneNumber,
        email,
      };
      const result = await registerNewUser(newUser);
      if (result === 200) {
        setAddAccount(true);
        router.push("/login");
      } else {
        setMessage(result);
        setAddAccount(false);
      }
      setTimeout(() => {
        setButtonDisabled(false);
        setLoading(false);
        setAddAccount(undefined);
      }, 3 * 1000);
    }
  };

  return (
    <Page className="flex justify-center items-center">
      <Box>
        <form action={submitAddAccount}>
          <LoginHeader
            title={"Stworzenie konta"}
            description={"Wprowadź podane dane aby stworzyć konto."}
          />
          <InputName />
          <InputSurname />
          <InputPhoneNumber />
          <InputEmail />
          <InputBirthDate />
          <InputPassword />
          <InputSecondPassword />
          <button className={LoginButtonClass} disabled={buttonDisabled}>
            {loading ? "Sprawdzanie danych..." : "Stwórz konto"}
          </button>
          {addAccount === false && (
            <p className="mt-4 text-start text-sm text-red-800">{message}</p>
          )}
          {addAccount === true && (
            <div className="mt-4 text-start text-sm">
              <p className="text-green-800">Konto zostało dodane poprawnie.</p>
              Zaraz zostanie przeniesiony na stronę logowania
            </div>
          )}
        </form>
      </Box>
    </Page>
  );
}