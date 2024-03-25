import Pin from "@/components/home/atoms/Pin";

export default function Map() {
  return (
    <div className="h-auto w-full">
      <h1 className="uppercase py-5 text-5xl font-sans text-mainWhite flex items-center justify-center bg-darkGreen w-full">
        Zobacz, gdzie jesteśmy
      </h1>
      <div className="bg-mainOrange h-6" />
      <div className="flex justify-evenly w-full">
        <Pin className={"mt-12"} />
        <Pin className={"mt-24"} />
        <Pin className={"mt-12"} />
      </div>
    </div>
  );
}
