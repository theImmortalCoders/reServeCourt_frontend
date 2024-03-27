import MainPage from "@/components/home/organisms/MainPage";
import Map from "@/components/home/organisms/Map";

export default function Home() {
  return (
    <main className="min-h-max max-w-max bg-mainWhite">
      <MainPage />
      <Map />
    </main>
  );
}
