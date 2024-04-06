export default function LoginHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h2 className="text-xl lg:text-2xl font-semibold mb-3">{title}</h2>
      <p className="text-sm text-gray-700 mb-4">{description}</p>
    </>
  );
}
