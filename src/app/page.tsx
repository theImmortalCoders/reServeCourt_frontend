import MainPage from "@/components/home/organisms/MainPage";
import Map from "@/components/home/organisms/Map";

export default function Home() {
  return (
    <main className="min-h-max min-w-max bg-mainWhite mt-navbar">
      <MainPage />
      <Map />
    </main>
  );
}
