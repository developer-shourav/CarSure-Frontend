import { Outlet } from "react-router";
import Footer from "../ui/Footer/Footer";
import { Navbar } from "../ui/Navbar";
import { ScrollRestoration } from "react-router-dom";

const MainLayouts = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollRestoration />
      <Footer />
    </>
  );
};

export default MainLayouts;
