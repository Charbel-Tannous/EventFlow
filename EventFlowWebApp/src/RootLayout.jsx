import Navbar from "./components/Layout/Navbar";
import MainBanner from "./components/Layout/MainBanner";
import MainFooter from "./components/Layout/MainFooter";
import MainPage from "./components/Layout/MainPage";

const RootLayout = () => {
  return (
    <div className="font-sans bg-black">
      <Navbar />
      <MainPage />
      <MainBanner />
      <MainFooter />
    </div>
  );
};

export default RootLayout;
