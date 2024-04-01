"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { FiMail, FiLock } from "react-icons/fi"; // Importowanie ikon z React Icons
import { AuthenticateUserData, authenticateUser } from "@/hooks/user";
import LoginInput from "@/components/login/atoms/LoginInput";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ResetPasswordModal from "@/components/login/ResetPasswordModal";
import { LoginButtonClass } from "@/components/login/atoms/LoginButton";
import AddAccountModal from "@/components/login/AddAccountModal";
import InputPassword from "@/components/login/molecules/InputPassword";
import InputEmail from "@/components/login/molecules/InputEmail";

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

  return (
    <main className="min-h-screen max-w-max bg-mainWhite flex justify-center items-center">
      <div className="bg-mainWhite p-7 rounded shadow-md w-64 xs:w-80 lg:w-96">
        <h2 className="text-xl lg:text-2xl font-semibold mb-6">Logowanie</h2>
        <p className="text-sm text-gray-700 mb-4">
          Wprowadź adres e-mail oraz hasło aby uzyskać dostęp do konta.
        </p>
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
