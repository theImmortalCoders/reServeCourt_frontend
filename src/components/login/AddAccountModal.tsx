import { useState } from "react";
import { LoginButtonClass } from "./atoms/LoginButton";
import Modal from "../common/modal/Modal";
import InputEmail from "./molecules/InputEmail";

export default function AddAccountModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    console.log("Reset Password");
  };

  return (
    <Modal closeModal={closeModal}>
      <h2 className="text-xl font-semibold mb-4">Stworzenie konta</h2>
      <p className="text-sm text-gray-700 mb-4">
        Wprowadź podane dane aby stworzyć konto.
      </p>
      <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className={LoginButtonClass} onClick={handleResetPassword}>
        Stwórz konto
      </button>
    </Modal>
  );
}
