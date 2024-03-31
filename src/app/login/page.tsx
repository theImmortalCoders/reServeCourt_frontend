"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { FiMail, FiLock } from "react-icons/fi"; // Importowanie ikon z React Icons
import { AuthenticateUserData, authenticateUser } from "@/hooks/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: AuthenticateUserData = { email, password };
    const status = await authenticateUser(userData);
    console.log("status", status);
  };

  const handleForgotPassword = () => {
    // Tutaj możesz dodać logikę do przekierowania użytkownika do formularza odzyskiwania hasła
    console.log("Przekierowanie do formularza odzyskiwania hasła");
  };

  const handleRegisterForm = () => {
    // Tutaj możesz dodać logikę do przekierowania użytkownika do formularza rejestracji
    console.log("Przekierowanie do formularza rejestracji");
  };

  return (
    <main className="min-h-screen max-w-max bg-mainWhite flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">Logowanie</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              className="w-full pl-10 border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Hasło"
              className="w-full pl-10 border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Zaloguj się
            </button>
            <p className="w-1/2 text-right">
              <button
                onClick={handleForgotPassword}
                className="text-blue-500 hover:underline focus:outline-none"
                type="button"
              >
                Zapomniałeś hasła?
              </button>
            </p>
          </div>
        </form>
        <p className="mt-4 text-center">
          Nie masz jeszcze konta?{" "}
          <button
            onClick={handleRegisterForm}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Zarejestruj się
          </button>
        </p>
      </div>
    </main>
  );
}
