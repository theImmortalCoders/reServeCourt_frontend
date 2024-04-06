"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@/components/common/box/Box";
import Page from "@/components/common/page/Page";
import { LoginButtonClass } from "@/components/login/atoms/LoginButton";
import LoginHeader from "@/components/login/atoms/LoginHeader";
import InputPassword from "@/components/login/molecules/InputPassword";
import { resetPassword } from "@/hooks/user";

export default function passwordResetToken({
  params,
}: {
  params: { token: string };
}) {
  const [password, setPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState<null | boolean>(null);
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter();

  const handleResetPassword = () => {
    setShowMessage(true);
    resetPassword(params.token, password)
      .then(() => {
        setResetSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 10 * 1000);
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        setResetSuccess(false);
      });
  };

  useEffect(() => {
    if (resetSuccess !== null) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5 * 1000);
      return () => clearTimeout(timer);
    }
  }, [resetSuccess]);

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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={LoginButtonClass} onClick={handleResetPassword}>
          Resetuj hasło
        </button>
        {showMessage && (
          <>
            {resetSuccess && (
              <div style={{ marginTop: "10px", color: "green" }}>
                Hasło zostało zresetowane. Za chwilę zostaniesz przekierowany na
                stronę logowania.
              </div>
            )}
            {!resetSuccess && (
              <div style={{ marginTop: "10px", color: "red" }}>
                Wystąpił problem podczas resetowania hasła.
              </div>
            )}
          </>
        )}
      </Box>
    </Page>
  );
}
