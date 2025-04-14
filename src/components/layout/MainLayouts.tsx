import { Outlet } from "react-router";
import Footer from "../ui/Footer/Footer";
import { Navbar } from "../ui/Navbar";

const MainLayouts = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayouts;
