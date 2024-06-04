import Image from "next/image";
import Real_Court from "@/assets/aboutus/real_court.jpg";
import Court_1 from "@/assets/aboutus/court_1.png";
import Balls_1 from "@/assets/aboutus/balls_1.png";
import Court_2 from "@/assets/aboutus/court_2.png";
import Balls_2 from "@/assets/aboutus/balls_2.png";
import { FaCheck } from "react-icons/fa";
import {ReactNode} from "react";

function Header() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl md:text-2xl text-center">Szanowni Klienci,</h1>
      <h1 className="text-xl md:text-2xl text-center">
        Z najwyższą przyjemnością witamy Państwa na naszym portalu{" "}
        <span className="text-mainGreen">ReServeCourt</span>
      </h1>
      <p className="text-sm md:text-base w-3/4 mt-5 text-center">
        ReServeCourt to platforma online do rezerwacji kortów tenisowych, która
        umożliwia użytkownikom łatwe znalezienie i zarezerwowanie kortu
        tenisowego w dowolnym miejscu i czasie. Nasza misja to ułatwienie
        dostępu do kortów tenisowych i promowanie aktywnego trybu życia.
      </p>
    </div>
  );
}

function Check({ children }: { children: ReactNode }) {
  return (
    <span className="flex w-full text-sm items-start space-x-2 ml-10">
      <FaCheck />
      <p className="font-bold md:font-normal font-sans">{children}</p>
    </span>
  );
}

function Photo() {
  return (
    <div className="flex justify-center items-center w-5/6 my-10 relative">
      <Image
        src={Real_Court}
        alt={"Real_Court"}
        className="min-w-72 w-3/4 h-max md:w-1/2"
        priority
      />
      <div className="flex flex-col bg-mainGreen text-mainBlack w-3/4 h-full items-center justify-center min-w-72 md:w-auto md:h-auto p-5 md:p-10 opacity-85 md:opacity-100 absolute md:right-[10vw] space-y-3">
        <Check>rezerwacja kortów tenisowych</Check>
        <Check>wspólne miejsce odpoczynku</Check>
        <Check>nauka tenisa z profesjonalistą</Check>
        <Check>aktywny wypoczynek</Check>
      </div>
    </div>
  );
}

function ContentContainer({ children }: { children: ReactNode }) {
  return (
    <span className="flex flex-col md:flex-row items-center md:items-start md:space-x-10 space-y-5 md:space-y-10">
      {children}
    </span>
  );
}

function PointContainer({ children }: { children: ReactNode }) {
  return <div className="flex flex-col md:w-1/2">{children}</div>;
}

function HeaderPoint({ children }: { children: ReactNode }) {
  return <p className="text-xl md:text-2xl">{children}</p>;
}

function ContentPoint({ children }: { children: ReactNode }) {
  return <p className="text-sm font-sans mt-2">{children}</p>;
}

function Description() {
  return (
    <div className="flex flex-col space-y-5 w-5/6 my-10">
      <ContentContainer>
        <PointContainer>
          <HeaderPoint>Komfortowe warunki</HeaderPoint>
          <ContentPoint>
            Zapewniamy komfortowe warunki przez cały rok. Posiadamy szeroki
            wybór hal tenisowych oraz profesjonalnie oświetlonych kortów, co
            umożliwia grę w tenisa niezależnie od pory dnia czy warunków
            pogodowych. Dzięki trosce o detale oraz wysokim standardom obsługi,
            zapewniamy naszym klientom nie tylko możliwość gry w tenisa, ale
            również niezrównany komfort i satysfakcję z korzystania z obiektów.
          </ContentPoint>
        </PointContainer>
        <PointContainer>
          <HeaderPoint>Dla wszystkich</HeaderPoint>
          <ContentPoint>
            Nasz priorytet to zapewnienie przyjemnego doświadczenia tenisowego
            dla wszystkich odwiedzających. Niezależnie od tego, czy jesteś
            początkujący, czy wracasz po przerwie, zawsze możesz liczyć na
            wsparcie. Oferujemy wynajem kortów oraz wypożyczalnie sprzętu, aby
            umożliwić rozwój umiejętności sportowych.
          </ContentPoint>
        </PointContainer>
      </ContentContainer>
      <ContentContainer>
        <PointContainer>
          <HeaderPoint>Pod okiem profesjonalistów</HeaderPoint>
          <ContentPoint>
            Doświadczeni trenerzy są dostępni do prowadzenia treningów zarówno w
            formie grupowej, jak i indywidualnej. Dodatkowo, oferujemy aktywny
            program tenisowy dla dzieci oraz dla każdego, kto chciałby po prostu
            pojawić się i zagrać. Wspieramy graczy w każdym wieku i
            doświadczeniu.
          </ContentPoint>
        </PointContainer>
        <PointContainer>
          <HeaderPoint>Organizacja wydarzeń</HeaderPoint>
          <ContentPoint>
            Nasza oferta obejmuje również wynajem kortów tenisowych na
            różnorodne wydarzenia w tym urodziny, imprezy firmowe oraz inne
            specjalne spotkania. Oferujemy doskonałe warunki do organizacji
            aktywnego i niezapomnianego czasu spędzonego na korcie, zapewniając
            kompleksową obsługę oraz profesjonalne przygotowanie infrastruktury.
          </ContentPoint>
        </PointContainer>
      </ContentContainer>
    </div>
  );
}

function Graphics() {
  return (
    <span className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-5 space-y-5 md:space-y-0 my-5">
      <span className="flex flex-col 2xs:flex-row w-full md:w-1/2 items-center 2xs:items-start space-y-5 2xs:space-y-0 justify-center md:justify-end space-x-0 2xs:space-x-5">
        <Image
          src={Court_1}
          alt={"Court_1"}
          className="w-3/5 2xs:w-1/3"
          priority
        />
        <Image
          src={Balls_1}
          alt={"Balls_1"}
          className="w-3/5 2xs:w-1/3"
          priority
        />
      </span>
      <span className="flex flex-col 2xs:flex-row w-full md:w-1/2 justify-center items-center 2xs:items-start space-y-5 2xs:space-y-0 md:justify-start space-x-0 2xs:space-x-5">
        <Image
          src={Court_2}
          alt={"Court_2"}
          className="w-3/5 2xs:w-1/3"
          priority
        />
        <Image
          src={Balls_2}
          alt={"Balls_2"}
          className="w-3/5 2xs:w-1/3"
          priority
        />
      </span>
    </span>
  );
}

export default function AboutUsPage() {
  return (
    <div className="flex flex-col items-center min-h-max m-8">
      <Header />
      <Photo />
      <Description />
      <Graphics />
    </div>
  );
}
