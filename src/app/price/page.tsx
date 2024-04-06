"use client";
import { useState } from "react";
import CourtType from "@/components/price/CourtType";
import TableRow from "@/components/price/TableRow";
import DiscountType from "@/components/price/DiscountType";

export default function Price() {
  const [isIndoor, setIsIndoor] = useState<boolean>(true);

  return (
    <div className="min-h-max max-w-max bg-mainWhite">
      <div className="flex flex-col w-full justify-center items-center py-20 text-3xl xs:text-4xl text-darkGreen">
        <span className="flex w-full justify-center items-center pb-10 mb-2">Cennik kortów</span>
        <div className="flex flex-row w-1/2 h-10 justify-around items-center rounded-full text-lg">
            <div className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-mainGreen border-2 border-darkGreen relative transition-all duration-500 ease-in-out ${isIndoor ? '-left-[41.6%] 2xs:-left-[37.5%] xs:-left-1/3 md:-left-1/4' : 'left-[41.6%] 2xs:left-[37.5%] xs:left-1/3 md:left-1/4'}`}></div>
        </div>
        <div className="flex flex-row w-5/6 2xs:w-3/4 xs:w-2/3 md:w-1/2 h-8 md:h-10 justify-center items-center text-sm md:text-base lg:text-lg mb-4">
            <CourtType isIndoor={isIndoor} label="KORTY KRYTE" onClick={() => setIsIndoor(true)} left={true}/>
            <CourtType isIndoor={!isIndoor} label="KORTY OTWARTE" onClick={() => setIsIndoor(false)} left={false}/>
        </div>
        <div className="flex flex-col w-11/12 sm:w-4/5 md:w-2/3 justify-center items-center rounded-xl text-xs xs:text-base lg:text-lg bg-mainGreen p-1 mb-6">
            <TableRow hours="GODZINY" p1="PN - CZW" p2="" p3="PT" p4="" p5="SO - NI" p6="" isIndoor={isIndoor} isInfo={true}/>
            <TableRow hours="1" p1="60zł" p2="50zł" p3="65zł" p4="55zł" p5="70zł" p6="60zł" isIndoor={isIndoor} isInfo={false}/>
            <TableRow hours="2" p1="100zł" p2="90zł" p3="110zł" p4="100zł" p5="120zł" p6="110zł" isIndoor={isIndoor} isInfo={false}/>
            <TableRow hours="4" p1="180zł" p2="160zł" p3="190zł" p4="170zł" p5="200zł" p6="180zł" isIndoor={isIndoor} isInfo={false}/>
            <TableRow hours="6" p1="250zł" p2="220zł" p3="280zł" p4="250zł" p5="300zł" p6="270zł" isIndoor={isIndoor} isInfo={false}/>
            <TableRow hours="CAŁY DZIEŃ" p1="320zł" p2="290zł" p3="340zł" p4="310zł" p5="350zł" p6="320zł" isIndoor={isIndoor} isInfo={false}/>
        </div>
        <div className="flex items-center justify-around w-11/12 sm:w-3/4 md:w-2/3 text-xs xs:text-sm md:text-base text-center text-darkGreen rounded-xl py-2 mb-6">
            <DiscountType text="Zniżka studencka: -10%" left={false}/>
            <DiscountType text="Karta dużej rodziny: -20%" left={true}/>
        </div>
        <span className="flex items-center justify-center w-11/12 sm:w-3/4 md:w-2/3 text-xs xs:text-sm text-center text-mainOrange border-2 border-lightGrey rounded-xl py-2 px-1">
            W przypadku wynajmu kortów tenisowych dla zorganizowanych grup, ceny mogą być ustalane indywidualnie. Oznacza to, że koszt wynajmu może zależeć od wielu czynników. Pamiętaj, że każdy obiekt może mieć swoje własne zasady i procedury dotyczące wynajmu dla zorganizowanych grup. Prosimy o kontakt w takich sprawach.
        </span>
      </div>
    </div>
  );
}
