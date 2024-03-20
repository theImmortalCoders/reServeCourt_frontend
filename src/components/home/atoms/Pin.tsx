import { PiMapPinFill } from "react-icons/pi";

export default function Pin({ height }: { height: string }) {
  return (
    <div
      className={`w-28 h-auto flex flex-col items-center mt-${height} mb-20`}
    >
      <PiMapPinFill className="text-9xl text-darkGreen" />
      <div className="bg-mainOrange w-full h-28 rounded-full mt-6" />
    </div>
  );
}
