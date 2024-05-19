import MainNavigation from "../components/Layout/MainNavigation";
import MainBanner from "../components/Layout/MainBanner";
import MainFooter from "../components/Layout/MainFooter";
import MainPage from "../components/Layout/MainPage";

const Main = () => {
  return (
    <div className="font-sans bg-black">
      <MainNavigation />
      <MainPage />
      <MainBanner />
      <MainFooter />
    </div>
  );
};

export default Main;
