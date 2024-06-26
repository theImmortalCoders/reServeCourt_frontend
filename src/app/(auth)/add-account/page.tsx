"use client";
import Box from "@/components/common/box/Box";
import Page from "@/components/common/page/Page";
import { LoginButton } from "@/components/login/atoms/LoginButton";
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
import Message from "@/components/login/atoms/LoginMessage";

export default function AddAccount() {
  const [message, setMessage] = useState("");
  const [addAccount, setAddAccount] = useState<boolean | undefined>(undefined);
  const router = useRouter();

  const submitAddAccount = async (formData: FormData) => {
    setAddAccount(undefined);
    const password = formData.get("password");
    const secondpassword = formData.get("secondpassword");
    if (password !== secondpassword) {
      setAddAccount(false);
      setMessage("Hasła nie są takie same");
      setTimeout(() => {
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
        password,
        phoneNumber,
        email,
      };
      const result = await registerNewUser(newUser);
      if (result === 200) {
        setAddAccount(true);
        setTimeout(() => {
          router.push("/login");
        }, 6 * 1000);
      } else {
        setMessage(result);
        setAddAccount(false);
      }
      setTimeout(() => {
        setAddAccount(undefined);
      }, 6 * 1000);
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
          <LoginButton
            messageIfLoadingIsTrue={"Sprawdzanie danych..."}
            messageIfLoadingIsFalse={"Stwórz konto"}
          />
          <Message
            value={addAccount}
            messageIfIsRed={message}
            messageIfIsGreen={"Konto zostało dodane poprawnie."}
            messageIfIsGreenAdd="Zaraz zostanie przeniesiony na stronę logowania"
          />
        </form>
      </Box>
    </Page>
  );
}
