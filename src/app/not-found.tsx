import Image from "next/image"
import Logo from "@/assets/home/reServeCourt.png"

export default function Page () {
    return (
        <div className="flex flex-col justify-center items-center min-h-max bg-mainWhite">
            <p className="text-2xl lg:text-4xl text-darkGreen">BŁĄD 404</p>
            <Image 
                src={Logo}
                alt="logo"
                className="w-1/2 sm:w-1/4"
                priority
            />
            <p className="text-xl lg:text-3xl text-center text-darkGreen px-12">Strona nie istnieje</p>
        </div>
    )
}