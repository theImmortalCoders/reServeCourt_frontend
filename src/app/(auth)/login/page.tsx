"use client";
import React, { useState } from "react";
import { AuthenticateUserData, authenticateUser } from "@/hooks/user";
import { useRouter } from "next/navigation";
import { LoginButtonClass } from "@/components/login/atoms/LoginButton";
import LoginHeader from "@/components/login/atoms/LoginHeader";
import Page from "@/components/common/page/Page";
import Box from "@/components/common/box/Box";
import Link from "next/link";
import { InputPassword, InputEmail } from "@/components/login/molecules/Inputs";

export default function Login() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState<boolean | undefined>(undefined);
  const router = useRouter();

  const submitLogin = async (formData: FormData) => {
    setLoading(true);
    setButtonDisabled(true);
    setLogged(undefined);
    const email = formData.get("email");
    const password = formData.get("password");
    const userData: AuthenticateUserData = { email, password };
    const result = await authenticateUser(userData);
    if (result === 200) {
      setLogged(true);
      router.push("/dashboard");
    } else {
      setMessage(result);
      setLogged(false);
    }
    setTimeout(() => {
      setButtonDisabled(false);
      setLoading(false);
      setLogged(undefined);
    }, 6 * 1000);
  };

  return (
    <Page className="flex justify-center items-center">
      <Box>
        <form action={submitLogin}>
          <LoginHeader
            title={"Logowanie"}
            description={
              "Wprowadź adres e-mail oraz hasło aby uzyskać dostęp do konta."
            }
          />
          <InputEmail />
          <InputPassword />
          <Link href={"/password-reset"}>
            <button className="w-full text-right text-darkGreen underline pb-2 text-sm sm:text-md">
              Zapomniałeś hasła?
            </button>
          </Link>
          <button className={LoginButtonClass} disabled={buttonDisabled}>
            {loading ? "Logowanie..." : "Zaloguj"}
          </button>
          <div className="flex flex-row justify-center gap-x-1 pt-2 text-sm sm:text-md">
            <p>Nie masz konta?</p>
            <Link href={"/add-account"}>
              <button className="text-right text-darkGreen underline text-sm sm:text-md">
                Załóż konto
              </button>
            </Link>
          </div>
          {logged === false && (
            <p className="mt-4 text-start text-sm text-red-800">{message}</p>
          )}
          {logged === true && (
            <p className="mt-4 text-start text-sm text-green-800">
              Zalogowano poprawnie
            </p>
          )}
        </form>
      </Box>
    </Page>
  );
}
