import { useState } from "react";
import { LoginButtonClass } from "./atoms/LoginButton";
import Modal from "../common/modal/Modal";
import InputEmail from "./molecules/InputEmail";
import LoginHeader from "./atoms/LoginHeader";
import InputPassword from "./molecules/InputPassword";
import InputBirthDate from "./molecules/InputBirthDate";
import InputName from "./molecules/InputName";
import InputPhoneNumber from "./molecules/InputPhoneNumber";
import InputSurname from "./molecules/InputSurname";

export default function AddAccountModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const AddAccountFunction = () => {
    console.log("Reset Password");
  };

  return (
    <Modal closeModal={closeModal}>
      <LoginHeader
        title={"Stworzenie konta"}
        description={"Wprowadź podane dane aby stworzyć konto."}
      />
      <InputName value={name} onChange={(e) => setName(e.target.value)} />
      <InputSurname
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <InputPhoneNumber
        value={phonenumber}
        onChange={(e) => setPhonenumber(e.target.value)}
      />
      <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputBirthDate
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <InputPassword
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
      />
      <InputPassword
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <button className={LoginButtonClass} onClick={AddAccountFunction}>
        Stwórz konto
      </button>
    </Modal>
  );
}
