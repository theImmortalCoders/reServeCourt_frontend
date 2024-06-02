"use client";
import Box from "@/components/common/box/Box";
import Page from "@/components/common/page/Page";
import { LoginButton } from "@/components/login/atoms/LoginButton";
import LoginHeader from "@/components/login/atoms/LoginHeader";
import { InputEmail } from "@/components/login/molecules/Inputs";
import { requestResetPassword } from "@/hooks/user";
import { useState } from "react";
import Message from "@/components/login/atoms/LoginMessage";

export default function passwordReset() {
  const [message, setMessage] = useState("");
  const [resetPasswordState, setResetPasswordState] = useState<
    boolean | undefined
  >(undefined);

  const submitResetPassword = async (formData: FormData) => {
    setResetPasswordState(undefined);
    const email = formData.get("email");
    const result = await requestResetPassword(email);
    if (result === 200) {
      setResetPasswordState(true);
    } else {
      setMessage(result);
      setResetPasswordState(false);
    }
    setTimeout(() => {
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
          <InputEmail />
          <LoginButton
            messageIfLoadingIsTrue={"Resetowanie hasła..."}
            messageIfLoadingIsFalse={"Resetuj hasło"}
          />
          <Message
            value={resetPasswordState}
            messageIfIsRed={message}
            messageIfIsGreen={
              "Sprawdź swoją skrzynkę e-mail w celu zresetowania hasła."
            }
          />
        </form>
      </Box>
    </Page>
  );
}
