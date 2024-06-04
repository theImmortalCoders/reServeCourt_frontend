import Image from "next/image";
import Tennis from "@/assets/home/tennis.jpg";
import HomePageText from "@/components/home/atoms/HomePageText";

export default function MainPage() {
  return (
    <div className="min-h-max w-full justify-center grid grid-cols-1 sm:grid-cols-2">
      <div className="flex w-full h-full justify-start items-center">
        <div className="relative">
          <Image
            src={Tennis}
            alt={"Tennis"}
            className="h-[60%] w-auto rounded-r-3xl"
            priority
          />
          <div className="absolute top-[35%] bottom-0 w-full h-[30%] bg-slate-200 z-1 flex flex-col items-center justify-center uppercase text-2xl sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-darkGreen opacity-90">
            <h1>Zaplanuj swój trening</h1>
            <p className="font-sans">Wygodnie i z wyprzedzeniem</p>
          </div>
        </div>
      </div>
      <div className="text-darkGreen sm:flex sm:flex-col gap-y-6 sm:gap-y-10 justify-center w-full pl-3 sm:pl-[20%] grid grid-cols-2">
        <div className="flex flex-col gap-y-6 sm:gap-y-10">
          <HomePageText number={8} text={"ośrodków tenisowych"} />
          <HomePageText number={10} text={"kortów krytych"} />
          <HomePageText number={20} text={"kortów otwartych"} />
          <HomePageText number={20000} text={"rezerwacji"} />
        </div>
        <a href="/clubs">
          <button className="text-nowrap uppercase bg-darkGreen text-mainWhite px-3 py-6 mt-[28%] sm:mt-0 ml-6 sm:ml-0 flex items-center justify-center rounded-b-3xl text-xs sm:text-1x1 md:text-lg xl:text-2xl">
            Zarezerwuj teraz
          </button>
        </a>
      </div>
    </div>
  );
}
