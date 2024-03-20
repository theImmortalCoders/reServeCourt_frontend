export default function HomePageText({
  number,
  text,
}: {
  number: number;
  text: string;
}) {
  return (
    <div className="flex items-end">
      <h1 className="text-5xl font-sans">{number}</h1>
      <p className="text-3xl ml-3 font-sans">{text}</p>
    </div>
  );
}
