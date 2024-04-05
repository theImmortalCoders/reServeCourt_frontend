"use client";
import { LoginButtonClass } from "@/components/login/atoms/LoginButton";
import LoginHeader from "@/components/login/atoms/LoginHeader";
import InputPassword from "@/components/login/molecules/InputPassword";
import { resetPassword } from "@/hooks/user";
import { useState } from "react";

export default function passwordResetToken({
  params,
}: {
  params: { token: string };
}) {
  const [password, setPassword] = useState("");

  const handleResetPassword = () => {
    resetPassword(params.token, password);
  };
  function closeModal(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <LoginHeader
        title={"Resetowanie hasła"}
        description={
          "Wprowadź adres e-mail powiązany z Twoim kontem, aby zresetować hasło."
        }
      />
      <InputPassword
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={LoginButtonClass} onClick={handleResetPassword}>
        Resetuj hasło
      </button>
    </div>
  );
}
