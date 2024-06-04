import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare } from "react-icons/fa";
import {ReactNode} from "react";

function Plan({ children }: { children: ReactNode }) {
  return (
    <div className="flex font-sans text-xs lg:text-sm xl:text-base">{ children }</div>
  )
}

function OrangeSans({ children }: { children: ReactNode }) {
  return (
    <span className="text-mainOrange mx-2 font-sans">{ children }</span>
  )
}

function OpenHours() {
  return (
    <div className="md:w-1/4 order-3 md:order-1">
      <span className="text-sm lg:text-base xl:text-lg">Godziny otwarcia:</span>
      <Plan>Pon - Czw:<OrangeSans>7:00 - 23:30</OrangeSans></Plan>
      <Plan>Pt: <OrangeSans>7:00 - 21:00</OrangeSans></Plan>
      <Plan>Sob i Niedz: <OrangeSans>8:00 - 20:00</OrangeSans></Plan>
    </div>
  )
}

function Information({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-xs lg:text-sm xl:text-base">{ children }</p>
  )
}

function Informations() {
  return (
    <div className="md:w-1/4 text-center order-1 md:order-2 ">
      <p className="text-base lg:text-lg xl:text-xl">RESERVE COURT RZESZÓW</p>
      <Information>35-410 Rzeszów, ul. Sportowa 51</Information>
      <Information>e-mail: kontakt@reservecourt.pl</Information>
      <Information>telefon: +48 999 999 999</Information>
    </div>
  )
}

function SocialsDiv({ children }: { children: ReactNode }) {
  return (
    <div className="flex md:w-full justify-start items-center space-x-2"> { children } </div>
  )
}

function SocialsLink({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans hidden md:block text-xs lg:text-sm xl:text-base">{ children }</p>
  )
}

function Socials() {
  return (
    <div className="flex flex-row md:flex-col md:w-1/4 items-start gap-y-2 py-5 md:py-0 md:pl-10 xl:pl-24 order-2 md:order-3">
      <SocialsDiv>
        <FaFacebookSquare className="flex justify-center text-2xl md:text-lg xl:text-2xl" />
        <SocialsLink>/reserveCourtRzeszow</SocialsLink>
      </SocialsDiv>
      <SocialsDiv>
        <FaInstagramSquare className="flex justify-center mx-2 md:mx-0 text-2xl md:text-lg xl:text-2xl" />
        <SocialsLink>/reservecourt</SocialsLink>
      </SocialsDiv>
      <SocialsDiv>
        <FaYoutubeSquare className="flex justify-center text-2xl md:text-lg xl:text-2xl" />
        <SocialsLink>/@reservecourt</SocialsLink>
      </SocialsDiv>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-around items-center text-mainWhite bg-darkGreen py-5">
        <OpenHours/>
        <Informations/>
        <Socials/>
    </footer>
  );
}