import TopBar from "./components/topBar";
import HeroSection from "./components/hearo";
import CreateViewUrl from "./components/createViewUrl";
import { headers } from "next/headers";

const Page = async () => {

  const headersList = await headers();

  return (
    <>
      <TopBar />
      <HeroSection />
      <CreateViewUrl hostName={headersList.get("host")} />
    </>
  );
};

export default Page;
