"use client";
import Box from "@/components/common/box/Box";
import Page from "@/components/common/page/Page";
import { LoginButtonClass } from "@/components/login/atoms/LoginButton";
import LoginHeader from "@/components/login/atoms/LoginHeader";
import InputBirthDate from "@/components/login/molecules/InputBirthDate";
import InputEmail from "@/components/login/molecules/InputEmail";
import InputName from "@/components/login/molecules/InputName";
import InputPassword from "@/components/login/molecules/InputPassword";
import InputPhoneNumber from "@/components/login/molecules/InputPhoneNumber";
import InputSurname from "@/components/login/molecules/InputSurname";
import { RegisterNewUserData, registerNewUser } from "@/hooks/user";
import { useState } from "react";

export default function AddAccount() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const AddAccountFunction = () => {
    if (password1 !== password2) {
      setPasswordError("Hasła nie są takie same.");
      return;
    }

    const newUser: RegisterNewUserData = {
      name,
      surname,
      birthDate,
      password: password1,
      phoneNumber,
      email,
    };
    registerNewUser(newUser);
  };

  return (
    <Page className="flex justify-center items-center">
      <Box>
        <LoginHeader
          title={"Stworzenie konta"}
          description={"Wprowadź podane dane aby stworzyć konto."}
        />
        <InputName value={name} onChange={(e) => setName(e.target.value)} />
        <InputSurname
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <InputPhoneNumber
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputBirthDate
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <InputPassword
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <InputPassword
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        {passwordError && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {passwordError}
          </div>
        )}
        <button className={LoginButtonClass} onClick={AddAccountFunction}>
          Stwórz konto
        </button>
      </Box>
    </Page>
  );
}
