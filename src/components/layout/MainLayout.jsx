import { Outlet } from "react-router-dom";

import Preloader from "../Preloader/Preloader";
import Navbar from "./header/Navbar";
import SmoothScrollProvider from "../../provider/SmoothScrollProvider";
import ScrollToHashElement from "../../provider/ScrollToHashElement";
import Footer from "./Footer";

import PageTransition from "./PageTransition";

const MainLayout = () => {
  return (
    <div className=" bg-primary font-spaceMono">
      <PageTransition>
        <SmoothScrollProvider>
          <ScrollToHashElement />
          <Preloader />
          <Navbar />
          <Outlet />
          <Footer />
        </SmoothScrollProvider>
      </PageTransition>
    </div>
  );
};

export default MainLayout;
