import { Outlet } from "react-router-dom";

import Preloader from "../Preloader/Preloader";
import Navbar from "./header/Navbar";
import SmoothScrollProvider from "../../provider/SmoothScrollProvider";
import ScrollToHashElement from "../../provider/ScrollToHashElement";
import Footer from "./Footer";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const MainLayout = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);
  return (
    <div className=" bg-primary font-spaceMono">
      <SmoothScrollProvider>
        <ScrollToHashElement />
        {/* <Preloader onFinish={() => setPreloaderDone(true)} /> */}
        <Navbar />
        <Outlet context={{ preloaderDone }} />
        <Footer />
      </SmoothScrollProvider>
    </div>
  );
};

export default MainLayout;
