import { useState } from "react";
import { LoginButtonClass } from "./atoms/LoginButton";
import Modal from "../common/modal/Modal";
import InputEmail from "./molecules/InputEmail";
import LoginHeader from "./atoms/LoginHeader";

export default function ResetPasswordModal({
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
      <LoginHeader
        title={"Resetowanie hasła"}
        description={
          "Wprowadź adres e-mail powiązany z Twoim kontem, aby zresetować hasło."
        }
      />
      <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className={LoginButtonClass} onClick={handleResetPassword}>
        Resetuj hasło
      </button>
    </Modal>
  );
}
