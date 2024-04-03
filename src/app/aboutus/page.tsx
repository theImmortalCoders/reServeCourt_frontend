import Image from "next/image";
import Real_Court from "@/assets/aboutus/real_court.jpg"
import Court_1 from "@/assets/aboutus/court_1.png"
import Balls_1 from "@/assets/aboutus/balls_1.png"
import Court_2 from "@/assets/aboutus/court_2.png"
import Balls_2 from "@/assets/aboutus/balls_2.png"
import { FaCheck } from "react-icons/fa";

export default function Page () {
    return (
        <div className="flex flex-col items-center min-h-max m-8">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl md:text-2xl text-center">Szanowni Klienci,</h1>
                <h1 className="text-xl md:text-2xl text-center">Z najwyższą przyjemnością witamy Państwa na naszym portalu <span className="text-mainGreen">ReServeCourt</span></h1>
                <p className="text-sm md:text-base w-3/4 mt-5 text-center">ReServeCourt to platforma online do rezerwacji kortów tenisowych, która umożliwia użytkownikom łatwe znalezienie i zarezerwowanie kortu tenisowego w dowolnym miejscu i czasie. Nasza misja to ułatwienie dostępu do kortów tenisowych i promowanie aktywnego trybu życia.</p>
            </div>
            <div className="flex justify-center items-center w-5/6 my-10 relative">
                <Image
                    src={Real_Court}
                    alt={"Real_Court"}
                    className="min-w-72 w-3/4 h-max md:w-1/2"
                    priority
                />
                <div className="flex flex-col bg-mainGreen text-mainBlack w-3/4 h-full items-center justify-center min-w-72 md:w-auto md:h-auto p-5 md:p-10 opacity-85 md:opacity-100 absolute md:right-[10vw] space-y-3">
                    <span className="flex w-full text-sm items-start space-x-2 ml-10"><FaCheck /><p className="font-bold md:font-normal font-sans">rezerwacja kortów tenisowych</p></span>
                    <span className="flex w-full text-sm items-start space-x-2 ml-10"><FaCheck /><p className="font-bold md:font-normal font-sans">wspólne miejsce odpoczynku</p></span>
                    <span className="flex w-full text-sm items-start space-x-2 ml-10"><FaCheck /><p className="font-bold md:font-normal font-sans">nauka tenisa z profesjonalistą</p></span>
                    <span className="flex w-full text-sm items-start space-x-2 ml-10"><FaCheck /><p className="font-bold md:font-normal font-sans">aktywny wypoczynek</p></span>
                </div>
            </div>
            <div className="flex flex-col space-y-5 w-5/6 my-10">
                <span className="flex flex-col md:flex-row items-center md:items-start md:space-x-10 space-y-5 md:space-y-10">
                    <div className="flex flex-col md:w-1/2">
                        <p className="text-xl md:text-2xl">Komfortowe warunki</p>
                        <p className="text-sm font-sans mt-2">
                            Zapewniamy komfortowe warunki przez cały rok. Posiadamy trzy hale tenisowe oraz profesjonalnie oświetlone korty, co umożliwia grę w tenisa niezależnie od pory dnia czy warunków pogodowych. W naszym ośrodku regularnie organizowane są kursy, aby zapewnić naszym graczom możliwość doskonalenia swoich umiejętności.
                        </p>
                    </div>
                    <div className="flex flex-col md:w-1/2">
                        <p className="text-xl md:text-2xl">Dla wszystkich</p>
                        <p className="text-sm font-sans mt-2">
                            Nasz priorytet to zapewnienie przyjemnego doświadczenia tenisowego dla wszystkich odwiedzających. Niezależnie od tego, czy jesteś początkujący, czy wracasz po przerwie, zawsze możesz liczyć na wsparcie. Oferujemy wynajem kortów oraz kompleksowe programy treningowe dla wszystkich grup wiekowych, aby umożliwić rozwój umiejętności.
                        </p>
                    </div>
                </span>
                <span className="flex flex-col md:flex-row items-center md:items-start md:space-x-10 space-y-5 md:space-y-10">
                    <div className="flex flex-col md:w-1/2">
                        <p className="text-xl md:text-2xl">Pod okiem profesjonalistów</p>
                        <p className="text-sm font-sans mt-2">
                            Nasi doświadczeni trenerzy są dostępni do prowadzenia treningów zarówno w formie grupowej, jak i indywidualnej. Dodatkowo, oferujemy aktywny program tenisowy dla dzieci oraz dla każdego, kto chciałby po prostu pojawić się i zagrać. Jako przyjazny ośrodek tenisowy, witamy graczy w każdym wieku i o różnym poziomie umiejętności.
                        </p>
                    </div>
                    <div className="flex flex-col md:w-1/2">
                        <p className="text-xl md:text-2xl">Organizacja wydarzeń</p>
                        <p className="text-sm font-sans mt-2">
                            Nasza oferta obejmuje również wynajem sali na różnorodne wydarzenia, takie jak szkolenia, urodziny czy spotkania biznesowe. Po intensywnej grze w tenisa, jeśli będziecie mieli ochotę na chwilę regeneracji i odprężenia, serdecznie zapraszamy do skorzystania z usług masażu w naszej strefie relaksu.
                        </p>
                    </div>
                </span>
            </div>
            <span className="flex justify-center space-x-5 my-5">
                <Image
                    src={Court_1}
                    alt={"Court_1"}
                    className="w-1/5"
                    priority
                />
                <Image
                    src={Balls_1}
                    alt={"Balls_1"}
                    className="w-1/5"
                    priority
                />
                <Image
                    src={Court_2}
                    alt={"Court_2"}
                    className="w-1/5"
                    priority
                />
                <Image
                    src={Balls_2}
                    alt={"Balls_2"}
                    className="w-1/5"
                    priority
                />
                </span>
        </div>
    )
}