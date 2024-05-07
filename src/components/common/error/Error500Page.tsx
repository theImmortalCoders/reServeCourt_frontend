import Image from "next/image";
import Logo from "@/assets/logo/logo.png";
import Page from "../page/Page";

export default function Error500Page() {
  return (
    <Page className="flex flex-col justify-center items-center">
      <p className="text-2xl lg:text-4xl text-darkGreen">BŁĄD 500</p>
      <Image src={Logo} alt="logo" className="w-1/2 sm:w-1/4" priority />
      <p className="text-lg lg:text-3xl text-center text-darkGreen px-12">
        Występują problemy techniczne
      </p>
      <p className="text-base lg:text-2xl text-center text-darkGreen px-12">
        Zapraszamy później
      </p>
    </Page>
  );
}
