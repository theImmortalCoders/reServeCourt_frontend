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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddAccount() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [addAccount, setAddAccount] = useState<boolean | undefined>(undefined);
  const router = useRouter();

  const AddAccountFunction = async () => {
    setLoading(true);
    setButtonDisabled(true);
    setAddAccount(undefined);
    if (password1 !== password2) {
      setAddAccount(false);
      setMessage("Hasła nie są takie same");
      setTimeout(() => {
        setButtonDisabled(false);
        setLoading(false);
        setAddAccount(undefined);
      }, 2 * 1000);
      return;
    } else {
      const newUser: RegisterNewUserData = {
        name,
        surname,
        birthDate,
        password: password1,
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

        <button
          className={LoginButtonClass}
          onClick={AddAccountFunction}
          disabled={buttonDisabled}
        >
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
      </Box>
    </Page>
  );
}
