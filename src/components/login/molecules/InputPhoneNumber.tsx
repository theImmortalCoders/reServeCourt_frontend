import LoginInput from "../atoms/LoginInput";
import { FiPhone } from "react-icons/fi";

export default function InputPhoneNumber({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <LoginInput
      type="tel"
      placeholder="Numer Telefonu"
      value={value}
      onChange={onChange}
    >
      <FiPhone className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2" />
    </LoginInput>
  );
}
