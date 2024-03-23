import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-around items-center text-mainWhite bg-darkGreen py-5">
        <div className="md:w-1/4 order-3 md:order-1">
          <span className="text-sm lg:text-base xl:text-lg">Godziny otwarcia:</span>
          <div className="flex font-sans text-xs lg:text-sm xl:text-base">Pon - Czw:<span className="text-mainOrange mx-2 font-sans">7:00 - 23:30</span></div>
          <div className="flex font-sans text-xs lg:text-sm xl:text-base">Pt: <span className="text-mainOrange mx-2 font-sans">7:00 - 21:00</span></div>
          <div className="flex font-sans text-xs lg:text-sm xl:text-base">Sob i Niedz: <span className="text-mainOrange mx-2 font-sans">8:00 - 20:00</span></div>
        </div>
        <div className="md:w-1/4 text-center order-1 md:order-2 ">
          <p className="text-base lg:text-lg xl:text-xl">RESERVE COURT RZESZÓW</p>
          <p className="font-sans text-xs lg:text-sm xl:text-base">35-410 Rzeszów, ul. Sportowa 51</p>
          <p className="font-sans text-xs lg:text-sm xl:text-base">e-mail: kontakt@reservecourt.pl</p>
          <p className="font-sans text-xs lg:text-sm xl:text-base">telefon: +48 999 999 999</p>
        </div>
        <div className="flex flex-row md:flex-col md:w-1/4 items-start gap-y-2 py-5 md:py-0 md:pl-10 xl:pl-24 order-2 md:order-3">
          <div className="flex md:w-full justify-start items-center space-x-2">
            <FaFacebookSquare className="flex justify-center text-2xl md:text-lg xl:text-2xl" />
            <p className="font-sans hidden md:block text-xs lg:text-sm xl:text-base">/reserveCourtRzeszow</p>
          </div>
          <div className="flex md:w-full justify-start items-center space-x-2">
            <FaInstagramSquare className="flex justify-center mx-2 md:mx-0 text-2xl md:text-lg xl:text-2xl" />
            <p className="font-sans hidden md:block text-xs lg:text-sm xl:text-base">/reservecourt</p>
          </div>
          <div className="flex md:w-full justify-start items-center space-x-2">
            <FaYoutubeSquare className="flex justify-center text-2xl md:text-lg xl:text-2xl" />
            <p className="font-sans hidden md:block text-xs lg:text-sm xl:text-base">/@reservecourt</p>
          </div>
        </div>
    </footer>
  );
}