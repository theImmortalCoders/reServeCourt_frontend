import { useState } from "react";
import { LoginButtonClass } from "./LoginButton";

export default function ResetPasswordModal() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    console.log("Reset Password");
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Resetowanie hasła</h2>
        <p className="text-sm text-gray-700 mb-4">
          Wprowadź adres e-mail powiązany z Twoim kontem, aby zresetować hasło.
        </p>
        <input
          type="email"
          placeholder="Adres E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <button className={LoginButtonClass} onClick={handleResetPassword}>
          Resetuj hasło
        </button>
      </div>
    </div>
  );
}
