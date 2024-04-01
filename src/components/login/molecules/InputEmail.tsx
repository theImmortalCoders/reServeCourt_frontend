import LoginInput from "../atoms/LoginInput";
import { FiMail } from "react-icons/fi";

export default function InputPassword({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <LoginInput
      type="email"
      placeholder="Adres E-mail"
      value={value}
      onChange={onChange}
    >
      <FiMail className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2" />
    </LoginInput>
  );
}
