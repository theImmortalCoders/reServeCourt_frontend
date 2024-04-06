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
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPasswordState, setResetPasswordState] = useState<
    boolean | undefined
  >(undefined);

  const handleResetPassword = async () => {
    setLoading(true);
    setButtonDisabled(true);
    setResetPasswordState(undefined);
    const result = await requestResetPassword(email);
    if (result === 200) {
      setResetPasswordState(true);
    } else {
      setMessage(result);
      setResetPasswordState(false);
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
        <LoginHeader
          title={"Resetowanie hasła"}
          description={
            "Wprowadź adres e-mail powiązany z Twoim kontem, aby zresetować hasło."
          }
        />
        <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
        <button
          className={LoginButtonClass}
          onClick={handleResetPassword}
          disabled={buttonDisabled}
        >
          {loading ? "Resetowanie hasła..." : "Resetuj hasło"}
        </button>
        {resetPasswordState === false && (
          <p className="mt-4 text-start text-sm text-red-800">{message}</p>
        )}
        {resetPasswordState === true && (
          <div className="mt-4 text-start text-sm">
            <p className="text-green-800">
              Sprawdź swoją skrzynkę e-mail w celu zresetowania hasła.
            </p>
          </div>
        )}
      </Box>
    </Page>
  );
}
