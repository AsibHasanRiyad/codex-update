import { Outlet } from "react-router-dom";

import Preloader from "../Preloader/Preloader";
import Navbar from "./header/Navbar";
import SmoothScrollProvider from "../../provider/SmoothScrollProvider";
import ScrollToHashElement from "../../provider/ScrollToHashElement";
import Footer from "./Footer";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Suspense, useState } from "react";
import Preloader2 from "../Preloader/Preloader2";

gsap.registerPlugin(ScrollTrigger, SplitText);

const MainLayout = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);
  return (
    <div className=" bg-primary font-spaceMono">
      <SmoothScrollProvider>
        <ScrollToHashElement />
        <Navbar />
        <Suspense fallback={<Preloader2 />}>
          <Outlet />
        </Suspense>
        <Footer />
      </SmoothScrollProvider>
    </div>
  );
};

export default MainLayout;
