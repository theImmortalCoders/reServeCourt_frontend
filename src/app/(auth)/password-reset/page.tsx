"use client";
import Box from "@/components/common/box/Box";
import Page from "@/components/common/page/Page";
import { LoginButtonClass } from "@/components/login/atoms/LoginButton";
import LoginHeader from "@/components/login/atoms/LoginHeader";
import InputEmail from "@/components/login/molecules/InputEmail";
import { requestResetPassword } from "@/hooks/user";
import { useState } from "react";

export default function passwordReset() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    requestResetPassword(email);
  };
  return (
    <Page className="flex justify-center items-center">
      <Box>
        <LoginHeader
          title={"Resetowanie hasła"}
          description={
            "Wprowadź adres e-mail powiązany z Twoim kontem, aby zresetować hasło."
          }
        />
        <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className={LoginButtonClass} onClick={handleResetPassword}>
          Resetuj hasło
        </button>
      </Box>
    </Page>
  );
}
