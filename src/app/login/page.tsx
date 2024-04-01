"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { FiMail, FiLock } from "react-icons/fi"; // Importowanie ikon z React Icons
import { AuthenticateUserData, authenticateUser } from "@/hooks/user";
import LoginInput from "@/components/login/LoginInput";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ResetPasswordModal from "@/components/login/ResetPasswordModal";
import { LoginButtonClass } from "@/components/login/LoginButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const [resetPasswordModalVisible, setResetPasswordModalVisible] =
    useState(false);
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
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

  const handleForgotPassword = () => {
    setResetPasswordModalVisible(true);
  };

  const handleRegisterForm = () => {
    console.log("Przekierowanie do formularza rejestracji");
  };

  return (
    <main className="min-h-screen max-w-max bg-mainWhite flex justify-center items-center">
      <div className="bg-mainWhite p-7 rounded shadow-md w-64 xs:w-80 lg:w-96">
        <h2 className="text-xl lg:text-2xl font-semibold mb-6">Logowanie</h2>
        <LoginInput
          type="text"
          placeholder="Adres E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
          <FiMail className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2" />
        </LoginInput>
        <button
          className="w-full text-right text-darkGreen underline"
          onClick={handleForgotPassword}
        >
          Zapomniałeś hasła?
        </button>
        {resetPasswordModalVisible && <ResetPasswordModal />}
        <LoginInput
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <FiLock className="h-4 w-4 lg:h-5 lg:w- text-gray-500 mr-2" />
        </LoginInput>
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
            onClick={handleRegisterForm}
          >
            Załóż konto
          </button>
        </div>

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
