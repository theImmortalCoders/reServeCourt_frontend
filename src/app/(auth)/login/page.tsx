"use client";
import React, { useEffect, useState } from "react";
import {
  AuthenticateUserData,
  authenticateUser,
  getCurrentUser,
} from "@/hooks/user";
import { useRouter } from "next/navigation";
import { LoginButton } from "@/components/login/atoms/LoginButton";
import LoginHeader from "@/components/login/atoms/LoginHeader";
import Page from "@/components/common/page/Page";
import Box from "@/components/common/box/Box";
import Link from "next/link";
import { InputPassword, InputEmail } from "@/components/login/molecules/Inputs";
import LoginMessage from "@/components/login/atoms/LoginMessage";
import { useQuery, useQueryClient } from "react-query";
import Error500Page from "@/components/common/error/Error500Page";

export default function Login() {
  const [message, setMessage] = useState("");
  const [logged, setLogged] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const [showLogin, setShowLogin] = useState<boolean | undefined>(undefined);

  const {
    data: currentUserData,
    isLoading,
    isError,
  } = useQuery("currentUser", getCurrentUser, { staleTime: 0 });

  const queryClient = useQueryClient();

  if (isError) return <Error500Page />;

  useEffect(() => {
    if (!isLoading && !isError && currentUserData) {
      if (currentUserData !== "Brak autoryzacji użytkownika") {
        router.push("/");
        queryClient.invalidateQueries("currentUser");
      }
    }
    setShowLogin(true);
  }, [isLoading, isError, currentUserData, router]);

  const submitLogin = async (formData: FormData) => {
    setLogged(undefined);
    const email = formData.get("email");
    const password = formData.get("password");
    const userData: AuthenticateUserData = { email, password };
    const result = await authenticateUser(userData);
    if (result === 200) {
      setLogged(true);
      router.push("/clubs");
      queryClient.invalidateQueries("currentUser");
    } else {
      setMessage(result);
      setLogged(false);
    }
    setTimeout(() => {
      setLogged(undefined);
    }, 6 * 1000);
  };

  return (
    <Page className="flex justify-center items-center">
      {showLogin ? (
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
            <LoginButton
              messageIfLoadingIsTrue={"Logowanie..."}
              messageIfLoadingIsFalse={"Zaloguj"}
            />
            <div className="flex flex-row justify-center gap-x-1 pt-2 text-sm sm:text-md">
              <p>Nie masz konta?</p>
              <Link href={"/add-account"}>
                <button className="text-right text-darkGreen underline text-sm sm:text-md">
                  Załóż konto
                </button>
              </Link>
            </div>
            <LoginMessage
              value={logged}
              messageIfIsRed={message}
              messageIfIsGreen={"Zalogowano poprawnie"}
            />
          </form>
        </Box>
      ) : (
        <h1 className="text-sm sm:text-md md:text-lg lg:text-2xl text-close2White pt-[20%]">
          Trwa ładowanie danych...
        </h1>
      )}
    </Page>
  );
}
