"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@/components/common/box/Box";
import Page from "@/components/common/page/Page";
import { LoginButtonClass } from "@/components/login/atoms/LoginButton";
import LoginHeader from "@/components/login/atoms/LoginHeader";
import InputPassword from "@/components/login/molecules/InputPassword";
import { resetPassword } from "@/hooks/user";

export default function PasswordResetToken({
  params,
}: {
  params: { token: string };
}) {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPasswordState, setResetPasswordState] = useState<
    boolean | undefined
  >(undefined);
  const router = useRouter();

  const handleResetPassword = async () => {
    setLoading(true);
    setButtonDisabled(true);
    setResetPasswordState(undefined);
    if (password1 === password2) {
      const result = await resetPassword(params.token, password1);
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
        <LoginHeader
          title={"Resetowanie hasła"}
          description={
            "Wprowadź adres e-mail powiązany z Twoim kontem, aby zresetować hasło."
          }
        />
        <InputPassword
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <InputPassword
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button className={LoginButtonClass} onClick={handleResetPassword}>
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
      </Box>
    </Page>
  );
}
