import Navbar from "../components/header/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/footer/Footer";
import Toggle from "../components/toggle/Toggle";

const RootLayout = () => {
  return (
    <div className="max-w-[1850px] mx-auto">
      <Navbar />
      <Toggle/>
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
