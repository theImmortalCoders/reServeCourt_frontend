"use client";
import React, { useLayoutEffect, useState } from "react";
import { AuthenticateUserData, authenticateUser } from "@/hooks/user";
import { useRouter } from "next/navigation";
import ResetPasswordModal from "@/components/login/ResetPasswordModal";
import { LoginButtonClass } from "@/components/login/atoms/LoginButton";
import AddAccountModal from "@/components/login/AddAccountModal";
import InputPassword from "@/components/login/molecules/InputPassword";
import InputEmail from "@/components/login/molecules/InputEmail";
import LoginHeader from "@/components/login/atoms/LoginHeader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] =
    useState(false);
  const [isAddAccountModalVisible, setIsAddAccountModalVisible] =
    useState(false);
  const handleLogin = async () => {
    try {
      setLoading(true);
      setLogged(undefined);
      const userData: AuthenticateUserData = { email, password };
      const result = await authenticateUser(userData);
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

  const openResetPasswordModal = () => {
    setIsResetPasswordModalVisible(true);
  };

  const closeResetPasswordModal = () => {
    setIsResetPasswordModalVisible(false);
  };

  const openAddAccountModal = () => {
    setIsAddAccountModalVisible(true);
  };

  const closeAddAccountModal = () => {
    setIsAddAccountModalVisible(false);
  };

  useLayoutEffect(() => {
    if (isResetPasswordModalVisible || isAddAccountModalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isResetPasswordModalVisible, isAddAccountModalVisible]);

  return (
    <main className="min-h-screen max-w-max bg-mainWhite flex justify-center items-center">
      <div className="bg-mainWhite p-7 rounded shadow-md w-64 xs:w-80 lg:w-96">
        <LoginHeader
          title={"Logowanie"}
          description={
            "Wprowadź adres e-mail oraz hasło aby uzyskać dostęp do konta."
          }
        />
        <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
        <button
          className="w-full text-right text-darkGreen underline"
          onClick={openResetPasswordModal}
        >
          Zapomniałeś hasła?
        </button>
        {isResetPasswordModalVisible && (
          <ResetPasswordModal closeModal={closeResetPasswordModal} />
        )}
        <InputPassword
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={LoginButtonClass}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logowanie..." : "Zaloguj"}
        </button>
        <div className="flex flex-row justify-center gap-x-1 pt-2">
          <p>Nie masz konta?</p>
          <button
            className="text-right text-darkGreen underline"
            onClick={openAddAccountModal}
          >
            Załóż konto
          </button>
        </div>
        {isAddAccountModalVisible && (
          <AddAccountModal closeModal={closeAddAccountModal} />
        )}
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
      </div>
    </main>
  );
}
