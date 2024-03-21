import { FaFacebookF } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-row w-full h-auto justify-around items-center text-mainWhite bg-darkGreen py-5 ">
        <div className="flex flex-col justify-center w-1/4">
          <span className="text-lg">Godziny otwarcia:</span>
          <div className="flex font-sans">Poniedziałek - Czwartek:<span className="text-mainOrange mx-2 font-sans">7:00 - 23:30</span></div>
          <div className="flex font-sans">Piątek: <span className="text-mainOrange mx-2 font-sans">7:00 - 21:00</span></div>
          <div className="flex font-sans">Sobota i Niedziela: <span className="text-mainOrange mx-2 font-sans">8:00 - 20:00</span></div>
        </div>
        <div className="flex flex-col w-1/4 justify-start items-center ">
          <p className="text-2xl">RESERVE COURT RZESZÓW</p>
          <p className="font-sans">35-410 Rzeszów, ul. Sportowa 51</p>
          <p className="font-sans">e-mail: kontakt@reservecourt.pl</p>
          <p className="font-sans">telefon: +48 999 999 999</p>
        </div>
        <div className="flex flex-col w-1/4 justify-end items-end  gap-y-2 pl-24">
          <div className="flex flex-row w-full justify-start items-start">
            <FaFacebookF className="flex justify-center mr-2 text-2xl" />
            <p className="font-sans">/reserveCourtRzeszow</p>
          </div>
          <div className="flex flex-row w-full justify-start items-start">
            <FaInstagramSquare className="flex justify-center mr-2 text-2xl" />
            <p className="font-sans">/reservecourt</p>
          </div>
          <div className="flex flex-row w-full justify-start items-start">
            <FaYoutube className="flex justify-center mr-2 text-2xl" />
            <p className="font-sans">/@reservecourt</p>
          </div>
        </div>
    </footer>
  );
}
