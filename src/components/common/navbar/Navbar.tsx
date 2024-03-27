import Image from "next/image";
import Logo from "@/assets/logo.png";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <nav className="max-w-screen h-navbar bg-mainWhite flex items-center justify-between">
      <Image className="w-[50px] h-[50px] ml-[3%]" src={Logo} alt="Logo" />
      <p className="text-darkGreen flex flex-row gap-10 font-thin text-md lg:text-lg">
        <a href="">
          <button>O nas</button>
        </a>
        <a href="">
          <button>Cennik</button>
        </a>
        <a href="">
          <button>Regulamin</button>
        </a>
        <a href="">
          <button>Kontakt</button>
        </a>
      </p>
      <p className="flex flex-row gap-8 mr-[3%]">
        <a href="">
          <button className="text-mainWhite bg-darkGreen py-1 px-6 rounded-lg">
            Rezerwuj
          </button>
        </a>
        <IoPersonCircleOutline className="w-[30px] h-[30px] text-darkGreen" />
      </p>
    </nav>
  );
}
