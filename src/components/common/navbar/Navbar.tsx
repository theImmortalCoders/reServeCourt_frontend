"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import {
  IoPersonCircleOutline,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="max-w-screen h-navbar bg-mainWhite flex items-center justify-between px-4 md:px-8">
      <Image src={Logo} alt="Logo" width={70} height={70} />

      <div className="text-darkGreen font-thin text-md md:text-lg lg:text-2xl md:flex md:flex-row md:gap-10 hidden">
        <a href="/aboutus">
          <button>O nas</button>
        </a>
        <a href="/price">
          <button>Cennik</button>
        </a>
        <a href="/rules">
          <button>Regulamin</button>
        </a>
        <a href="/contact">
          <button>Kontakt</button>
        </a>
      </div>

      <div className="flex flex-row gap-4 md:gap-8 items-center">
        <a href="/book">
          <button className="text-mainWhite bg-darkGreen py-1 px-6 rounded-lg text-md md:text-lg lg:text-1xl">
            Rezerwuj
          </button>
        </a>
        <IoPersonCircleOutline className="w-8 h-8 text-darkGreen" />
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-darkGreen mr-2 flex items-center"
          >
            {isMenuOpen ? (
              <IoCloseOutline className="w-8 h-8" />
            ) : (
              <IoMenuOutline className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-navbar left-0 w-full bg-mainWhite shadow-md py-4">
          <div className="flex flex-col items-center gap-4">
            <a href="/aboutus" onClick={toggleMenu}>
              <button>O nas</button>
            </a>
            <a href="/price" onClick={toggleMenu}>
              <button>Cennik</button>
            </a>
            <a href="/rules" onClick={toggleMenu}>
              <button>Regulamin</button>
            </a>
            <a href="/contact" onClick={toggleMenu}>
              <button>Kontakt</button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
