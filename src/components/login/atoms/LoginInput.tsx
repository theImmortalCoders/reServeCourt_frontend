export default function LoginInput({
  type,
  name,
  placeholder,
  icon,
}: {
  type: string;
  name: string;
  placeholder: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center border text-sm lg:text-base border-gray-500 rounded px-3 py-2 mb-4">
      {icon}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full outline-none focus:outline-none bg-inherit"
        required
      />
    </div>
  );
}
