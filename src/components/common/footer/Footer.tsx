import { FaFacebookF } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer () {
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
                <div className="flex flex-col items-center">
                    <span className="flex justify-center">
                        <FaFacebookF className=""/>
                        <p>/reserveCourtRzeszow</p>
                    </span>
                    <span className="flex justify-center">
                        <FaInstagramSquare />
                        <p>/reservecourt</p>
                    </span>
                    <span className="flex justify-center">
                        <FaYoutube/>
                        <p>/@reservecourt</p>
                    </span>
                </div>
            </div>
        </footer>
    )
}