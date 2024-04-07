"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@/components/common/box/Box";
import Page from "@/components/common/page/Page";
import { LoginButton } from "@/components/login/atoms/LoginButton";
import LoginHeader from "@/components/login/atoms/LoginHeader";
import { resetPassword } from "@/hooks/user";
import {
  InputPassword,
  InputSecondPassword,
} from "@/components/login/molecules/Inputs";
import LoginMessage from "@/components/login/atoms/LoginMessage";

export default function PasswordResetToken({
  params,
}: {
  params: { token: string };
}) {
  const [message, setMessage] = useState("");
  const [resetPasswordState, setResetPasswordState] = useState<
    boolean | undefined
  >(undefined);
  const router = useRouter();

  const submitResetPassword = async (formData: FormData) => {
    setResetPasswordState(undefined);
    const password = formData.get("password");
    const secondpassword = formData.get("secondpassword");
    if (password !== secondpassword) {
      setResetPasswordState(false);
      setMessage("Hasła nie są takie same");
      setTimeout(() => {
        setResetPasswordState(undefined);
      }, 2 * 1000);
      return;
    } else {
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
      setTimeout(() => {
        setResetPasswordState(undefined);
      }, 6 * 1000);
    }
  };

  return (
    <Page className="flex justify-center items-center">
      <Box>
        <form action={submitResetPassword}>
          <LoginHeader
            title={"Resetowanie hasła"}
            description={"Wprowadź nowe hasło."}
          />
          <InputPassword />
          <InputSecondPassword />
          <LoginButton
            messageIfLoadingIsTrue={"Resetowanie hasła..."}
            messageIfLoadingIsFalse={"Resetuj hasło"}
          />
          <LoginMessage
            value={resetPasswordState}
            messageIfIsRed={message}
            messageIfIsGreen={"Hasło zostało zresetowane"}
            messageIfIsGreenAdd="Zaraz zostanie przeniesiony na stronę logowania"
          />
        </form>
      </Box>
    </Page>
  );
}
