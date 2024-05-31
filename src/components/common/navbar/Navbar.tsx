"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo/logo.png";
import {
  IoPersonCircleOutline,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";
import Link from "next/link";
import { GetCurrentUserData, getCurrentUser, logoutUser } from "@/hooks/user";
import { useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";

function Navbox() {
  return (
    <>
      <Link href="/aboutus">O nas</Link>
      <Link href="/price">Cennik</Link>
      <Link href="/rules">Regulamin </Link>
      <Link href="/clubs">Kluby</Link>
    </>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      if (result === 200) {
        console.log("Wylogowano poprawnie!");
        setShowUserMenu(false);
        router.push("/");
      } else {
        console.log(result);
      }
      queryClient.invalidateQueries("currentUser");
    } catch (error) {
      console.error(error);
      queryClient.invalidateQueries("currentUser");
    }
  };

  const {
    data: currentUserData,
    isLoading,
    isError,
  }: {
    data?: GetCurrentUserData | string;
    isLoading: boolean;
    isError: any;
  } = useQuery("currentUser", getCurrentUser, {});

  const queryClient = useQueryClient();

  return (
    <nav className="max-w-screen h-navbar bg-mainWhite font-extralight flex items-center justify-between px-4 md:px-8 shadow-navbarShadow sticky z-20">
      <Link href="/">
        <Image src={Logo} alt="Logo" width={70} height={70} />
      </Link>

      <div className="text-darkGreen font-sans text-md md:text-lg lg:text-xl md:flex md:flex-row md:gap-10 hidden">
        <Navbox />
      </div>

      <div className="flex flex-row gap-4 md:gap-8 items-center">
        <Link
          href="/book"
          className="text-mainWhite bg-darkGreen py-[2px] px-6 rounded-lg text-md md:text-lg"
        >
          Rezerwuj
        </Link>
        {typeof currentUserData === "string" ||
        !currentUserData ||
        currentUserData === null ||
        isLoading ||
        isError ? (
          <Link href="/login">
            <IoPersonCircleOutline className="w-8 h-8 text-darkGreen" />
          </Link>
        ) : (
          <div className="relative">
            <IoPersonCircleOutline
              className="w-8 h-8 text-darkGreen cursor-pointer"
              onClick={() => {
                setShowUserMenu(!showUserMenu);
              }}
            />
            <div
              className={`absolute space-y-1 -right-5 top-[56px] w-36 py-2 flex-col opacity-95 bg-mainWhite shadow-logoMenuShadow rounded-b-lg ${
                showUserMenu ? "flex" : "hidden"
              } items-center justify-start text-sm`}
            >
              <p className="text-mainBlack">
                {currentUserData.role === "USER"
                  ? "Użytkownik"
                  : currentUserData.role === "ADMIN"
                  ? "Admin"
                  : "Super Admin"}
              </p>
              <hr className="size-[2px] bg-mainBlack w-3/4" />
              {(currentUserData.role === "ADMIN") &&
              <Link href="/admin-panel">
                <p className="cursor-pointer">Panel Admina</p>
              </Link>
              }
              <Link href="/my-reservations">
                <p className="cursor-pointer">Moje rezerwacje</p>
              </Link>
              <Link href="/password-change">
                <p className="cursor-pointer">Zmień hasło</p>
              </Link>
              <p
                onClick={handleLogout}
                className="cursor-pointer text-mainOrange"
              >
                WYLOGUJ
              </p>
            </div>
          </div>
        )}

        <button
          onClick={toggleMenu}
          className="text-darkGreen mr-2 flex items-center md:hidden"
        >
          {isMenuOpen ? (
            <IoCloseOutline className="w-8 h-8" />
          ) : (
            <IoMenuOutline className="w-8 h-8" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-navbar left-0 w-full bg-mainWhite shadow-md py-4">
          <div
            className="flex flex-col items-center gap-4 "
            onClick={toggleMenu}
          >
            <Navbox />
          </div>
        </div>
      )}
    </nav>
  );
}
