import LoginInput from "../atoms/LoginInput";
import { FiLock } from "react-icons/fi";

export default function InputPassword({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <LoginInput
      type="password"
      placeholder="Hasło"
      value={value}
      onChange={onChange}
    >
      <FiLock className="h-4 w-4 lg:h-5 lg:w- text-gray-500 mr-2" />
    </LoginInput>
  );
}
