import Image from "next/image";
import Tennis from "@/assets/home/tennis.jpg";
import HomePageText from "@/components/home/atoms/HomePageText";

export default function MainPage() {
  return (
    <div className="min-h-max w-full grid grid-cols-2 justify-center">
      <div className="flex w-full h-full justify-start items-center">
        <div className="relative">
          <Image
            src={Tennis}
            alt={"Tennis"}
            className="h-[60%] w-auto rounded-r-3xl"
            priority
          />
          <div className="absolute top-[35%] bottom-0 w-full h-[30%] bg-slate-200 z-1 flex flex-col items-center justify-center uppercase text-4xl text-darkGreen opacity-90">
            <h1>Zaplanuj swój trening</h1>
            <p className="font-sans">Wygodnie i z wyprzedzeniem</p>
          </div>
        </div>
      </div>
      <div className="text-darkGreen flex flex-col gap-y-10 justify-center w-full pl-[20%]">
        <HomePageText number={8} text={"ośrodków tenisowych"} />
        <HomePageText number={10} text={"kortów krytych"} />
        <HomePageText number={20} text={"kortów otwartych"} />
        <HomePageText number={20000} text={"rezerwacji"} />
        <button className="bg-darkGreen text-mainWhite w-[55%] py-6 flex items-center justify-center rounded-b-3xl">
          <a href="/reservation" className="uppercase">
            Zarezerwuj teraz
          </a>
        </button>
      </div>
    </div>
  );
}
