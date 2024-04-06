import LoginInput from "../atoms/LoginInput";
import { IoPersonOutline } from "react-icons/io5";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FiLock, FiPhone, FiMail } from "react-icons/fi";

export function InputName() {
  return (
    <LoginInput
      type="text"
      name="name"
      placeholder="Imię"
      icon={
        <IoPersonOutline className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2" />
      }
    />
  );
}

export function InputSurname() {
  return (
    <LoginInput
      type="text"
      name="surname"
      placeholder="Nazwisko"
      icon={
        <IoPersonOutline className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2" />
      }
    />
  );
}

export function InputBirthDate() {
  return (
    <LoginInput
      type="date"
      name="birthDate"
      placeholder="Data urodzenia"
      icon={
        <LiaBirthdayCakeSolid className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2" />
      }
    />
  );
}

export function InputPassword() {
  return (
    <LoginInput
      type="password"
      name="password"
      placeholder="Hasło"
      icon={<FiLock className="h-4 w-4 lg:h-5 lg:w- text-gray-500 mr-2" />}
    />
  );
}

export function InputSecondPassword() {
  return (
    <LoginInput
      type="password"
      name="secondpassword"
      placeholder="Powtórz hasło"
      icon={<FiLock className="h-4 w-4 lg:h-5 lg:w- text-gray-500 mr-2" />}
    />
  );
}

export function InputPhoneNumber() {
  return (
    <LoginInput
      type="phone"
      name="phoneNumber"
      placeholder="Numer Telefonu"
      icon={<FiPhone className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2" />}
    />
  );
}

export function InputEmail() {
  return (
    <LoginInput
      type="email"
      name="email"
      placeholder="Adres E-mail"
      icon={<FiMail className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2" />}
    />
  );
}
