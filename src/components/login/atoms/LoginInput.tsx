export default function LoginInput({
  type,
  placeholder,
  value,
  onChange,
  children,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center border text-sm lg:text-base border-gray-500 rounded px-3 py-2 mb-4">
      {children}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full outline-none focus:outline-none bg-inherit"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}