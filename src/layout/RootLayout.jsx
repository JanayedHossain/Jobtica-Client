import Navbar from "../components/header/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/footer/Footer";

const RootLayout = () => {
  return (
    <div className="max-w-[1850px] mx-auto">
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
