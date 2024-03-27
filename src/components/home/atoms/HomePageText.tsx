export default function HomePageText({
  number,
  text,
}: {
  number: number;
  text: string;
}) {
  return (
    <div className="flex items-end">
      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-sans">
        {number}
      </h1>
      <p className="text-1x1 sm:text-lg md:text-2xl xl:text-3xl ml-3 font-sans">
        {text}
      </p>
    </div>
  );
}
