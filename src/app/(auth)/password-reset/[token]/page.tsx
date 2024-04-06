"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@/components/common/box/Box";
import Page from "@/components/common/page/Page";
import { LoginButtonClass } from "@/components/login/atoms/LoginButton";
import LoginHeader from "@/components/login/atoms/LoginHeader";
import { resetPassword } from "@/hooks/user";
import {
  InputPassword,
  InputSecondPassword,
} from "@/components/login/molecules/Inputs";

export default function PasswordResetToken({
  params,
}: {
  params: { token: string };
}) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPasswordState, setResetPasswordState] = useState<
    boolean | undefined
  >(undefined);
  const router = useRouter();

  const submitResetPassword = async (formData: FormData) => {
    setLoading(true);
    setButtonDisabled(true);
    setResetPasswordState(undefined);
    const password = formData.get("password");
    const secondpassword = formData.get("secondpassword");
    if (password === secondpassword) {
      const result = await resetPassword(params.token, password);
      if (result === 200) {
        setResetPasswordState(true);
        setTimeout(() => {
          router.push("/login");
        }, 6 * 1000);
      } else {
        setMessage(result);
        setResetPasswordState(false);
      }
    } else {
      setMessage("Hasła nie są takie same");
    }
    setTimeout(() => {
      setButtonDisabled(false);
      setLoading(false);
      setResetPasswordState(undefined);
    }, 6 * 1000);
  };

  return (
    <Page className="flex justify-center items-center">
      <Box>
        <form action={submitResetPassword}>
          <LoginHeader
            title={"Resetowanie hasła"}
            description={
              "Wprowadź adres e-mail powiązany z Twoim kontem, aby zresetować hasło."
            }
          />
          <InputPassword />
          <InputSecondPassword />
          <button className={LoginButtonClass} disabled={buttonDisabled}>
            {loading ? "Resetowanie hasła..." : "Resetuj hasło"}
          </button>
          {resetPasswordState === false && (
            <p className="mt-4 text-start text-sm text-red-800">{message}</p>
          )}
          {resetPasswordState === true && (
            <div className="mt-4 text-start text-sm">
              <p className="text-green-800">
                Hasło zostało zresetowane. Za chwilę zostaniesz przekierowany na
                stronę logowania.
              </p>
            </div>
          )}
        </form>
      </Box>
    </Page>
  );
}
