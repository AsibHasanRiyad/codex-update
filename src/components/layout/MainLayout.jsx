import { Outlet } from "react-router-dom";

import Preloader from "../Preloader/Preloader";
import Navbar from "./header/Navbar";
import SmoothScrollProvider from "../../provider/SmoothScrollProvider";
import ScrollToHashElement from "../../provider/ScrollToHashElement";
import Footer from "./Footer";
import { useState } from "react";
import PageTransition from "./PageTransition";

const MainLayout = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);
  return (
    <div className=" bg-primary font-spaceMono">
      <PageTransition>
        <SmoothScrollProvider>
          <ScrollToHashElement />
          {/* <Preloader onFinish={() => setPreloaderDone(true)} /> */}
          <Navbar />
          <Outlet context={{ preloaderDone }} />
          <Footer />
        </SmoothScrollProvider>
      </PageTransition>
    </div>
  );
};

export default MainLayout;
