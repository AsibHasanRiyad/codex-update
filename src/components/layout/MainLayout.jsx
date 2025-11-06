import { Outlet } from "react-router-dom";

import Preloader from "../Preloader/Preloader";
import Navbar from "./header/Navbar";
import SmoothScrollProvider from "../../provider/SmoothScrollProvider";
import ScrollToHashElement from "../../provider/ScrollToHashElement";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className=" bg-primary font-spaceMono">
      <Preloader />
      <SmoothScrollProvider>
        <ScrollToHashElement />
        <Navbar />
        <Outlet />
        <Footer />
      </SmoothScrollProvider>
    </div>
  );
};

export default MainLayout;
