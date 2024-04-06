import LoginInput from "../../atoms/LoginInput";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

export default function InputBirthDate({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <LoginInput
      type="date"
      placeholder="Data urodzenia"
      value={value}
      onChange={onChange}
      icon={
        <LiaBirthdayCakeSolid className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2" />
      }
    />
  );
}
