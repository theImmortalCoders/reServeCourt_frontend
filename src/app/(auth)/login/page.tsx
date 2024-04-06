"use client";
import React, { useState } from "react";
import { AuthenticateUserData, authenticateUser } from "@/hooks/user";
import { useRouter } from "next/navigation";
import { LoginButtonClass } from "@/components/login/atoms/LoginButton";
import InputPassword from "@/components/login/molecules/InputPassword";
import InputEmail from "@/components/login/molecules/InputEmail";
import LoginHeader from "@/components/login/atoms/LoginHeader";
import Page from "@/components/common/page/Page";
import Box from "@/components/common/box/Box";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState<boolean | undefined>(undefined);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setLogged(undefined);
      const userData: AuthenticateUserData = { email, password };
      const result = await authenticateUser(userData);
      console.log("result", result);
      if (result === 200) {
        setLogged(true);
        router.push("/dashboard");
      } else if (result === "Błędne dane logowania") {
        setLogged(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page className="flex justify-center items-center">
      <Box>
        <LoginHeader
          title={"Logowanie"}
          description={
            "Wprowadź adres e-mail oraz hasło aby uzyskać dostęp do konta."
          }
        />
        <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputPassword
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href={"/password-reset"}>
          <button className="w-full text-right text-darkGreen underline pb-2 text-sm sm:text-md">
            Zapomniałeś hasła?
          </button>
        </Link>
        <button
          className={LoginButtonClass}
          onClick={handleLogin}
          disabled={loading}
        >
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
          <p className="mt-4 text-start text-sm text-red-800">
            Błędne dane logowania
          </p>
        )}
        {logged === true && (
          <p className="mt-4 text-start text-sm text-green-800">
            Zalogowano poprawnie
          </p>
        )}
      </Box>
    </Page>
  );
}
