import Image from "next/image";
import Logo from "@/assets/logo/logo.png";
import Page from "@/components/common/page/Page";

export default function Error404Page() {
  return (
    <Page className="flex flex-col justify-center items-center">
      <p className="text-2xl lg:text-4xl text-darkGreen">BŁĄD 404</p>
      <Image src={Logo} alt="logo" className="w-1/2 sm:w-1/4" priority />
      <p className="text-xl lg:text-3xl text-center text-darkGreen px-12">
        Strona nie istnieje
      </p>
    </Page>
  );
}
