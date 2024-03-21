import { FaFacebookF } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex justify-center h-auto w-full text-mainWhite">
      <div className="flex flex-row items-center h-auto bg-darkGreen w-full justify-evenly">
        <span className="flex flex-col">
          <p>Godziny otwarcia</p>
          <p>Poniedziałek - Czwartek: 7:00 - 23:30</p>
          <p>Piątek: 7:00 - 21:00</p>
          <p>Sobota i Niedziela: 8:00 - 20:00</p>
        </span>
        <span className="flex flex-col justify-center items-center">
          <p>RESERVE COURT RZESZÓW</p>
          <p>35-410 Rzeszów, ul. Sportowa 51</p>
          <p>e-mail: kontakt@reservecourt.pl</p>
          <p>telefon: +48 999 999 999</p>
        </span>
        <div className="flex flex-col w-auto gap-y-2">
          <div className="flex items-center justify-start w-full">
            <FaFacebookF className="flex justify-center mr-2 text-2xl" />
            <p>/reserveCourtRzeszow</p>
          </div>
          <div className="flex items-center justify-start w-full">
            <FaInstagramSquare className="flex justify-center mr-2 text-2xl" />
            <p>/reservecourt</p>
          </div>
          <div className="flex items-center justify-start w-full">
            <FaYoutube className="flex justify-center mr-2 text-2xl" />
            <p>/@reservecourt</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
