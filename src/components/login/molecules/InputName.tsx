import LoginInput from "../atoms/LoginInput";
import { IoPersonOutline } from "react-icons/io5";

export default function InputName({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <LoginInput
      type="text"
      placeholder="Imię"
      value={value}
      onChange={onChange}
    >
      <IoPersonOutline className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2" />
    </LoginInput>
  );
}
