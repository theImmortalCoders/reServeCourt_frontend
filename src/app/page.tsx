import Page from "@/components/common/page/Page";
import MainPage from "@/components/home/organisms/MainPage";
import Map from "@/components/home/organisms/Map";

export default function Home() {
  return (
    <Page>
      <MainPage />
      <Map />
    </Page>
  );
}
