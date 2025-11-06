import { useEffect, useRef, useState } from "react";
import "./Preloader.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
import { useLenis } from "lenis/react";
import image1 from "../../assets/loader/1.jpg";
import image2 from "../../assets/loader/2.avif";
import image3 from "../../assets/loader/3.jpg";
import image4 from "../../assets/loader/4.jpg";

gsap.registerPlugin(useGSAP, SplitText, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
export let isInitialLoad = true;
const Preloader = () => {
  const preloaderRef = useRef();
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();
  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      if (loaderAnimating) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, loaderAnimating]);
  useGSAP(() => {
    if (!showPreloader) return;
    setLoaderAnimating(true);
    // start animation
    const initializeAnimation = async () => {
      gsap.set(".preloader-header h1", { opacity: 1 });
      const preLoaderHeaderSplit = SplitText.create(".preloader-header h1", {
        type: "chars",
        charsClass: "char",
        mask: "chars",
      });
      const chars = preLoaderHeaderSplit.chars;
      chars.forEach((char, idx) => {
        gsap.set(char, {
          yPercent: idx % 2 === 0 ? 100 : -100,
        });
      });
      gsap.set(".preloader-header h1", { opacity: 1 });

      const preloaderImages = gsap.utils.toArray(".preloader-images .img");
      const preloaderImagesInner = gsap.utils.toArray(
        ".preloader-images .img img"
      );

      const tl = gsap.timeline({ delay: 0 });
      tl.to(".progress-bar", {
        scaleX: 1,
        duration: 5,
        ease: "power3.inOut",
      })
        .set(".progress-bar", { transformOrigin: "right" })
        .to(".progress-bar", {
          scaleX: 0,
          duration: 1,
          ease: "power3.in",
        });
      preloaderImages.forEach((preloaderImg, idx) => {
        tl.to(
          preloaderImg,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "hop",
            delay: idx * 0.75,
          },
          "-=5"
        );
      });
      preloaderImagesInner.forEach((preloaderImageInner, index) => {
        tl.to(
          preloaderImageInner,
          {
            scale: 1,
            duration: 1.5,
            ease: "hop",
            delay: index * 0.75,
          },
          "-=5.25"
        );
      });
      tl.to(
        chars,
        {
          yPercent: 0,
          duration: 1,
          ease: "hop",
          stagger: 0.025,
        },
        "-=5"
      );

      tl.to(
        ".preloader-images",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "hop",
        },
        "-=1.5"
      );

      tl.to(
        chars,
        {
          yPercent: (index) => (index % 2 === 0 ? 100 : -100),
          duration: 1,
          ease: "hop",
          stagger: 0.025,
        },
        "-=2.5"
      );

      tl.to(
        ".preloader",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.75,
          ease: "hop",
          onStart: () => {
            gsap.set(".preloader", { pointerEvents: "none" });
          },
          onComplete: () => {
            setTimeout(() => {
              setLoaderAnimating(false);
              setShowPreloader(false);
            }, 100);
          },
        },
        "-=0.5"
      );
    };
    initializeAnimation();
  });

  if (!showPreloader) {
    return null;
  }

  return (
    <>
      <div className="preloader" ref={preloaderRef}>
        <div className="progress-bar bg-emerald-600"></div>

        <div className="preloader-images">
          <div className="img">
            <img src={image1} alt="" />
            <div className="bg-linear-to-t from-primary/70 via-primary/40 to-transparent rounded-xl absolute inset-0 z-10"></div>
          </div>
          <div className="img">
            <img src={image2} alt="" />
            <div className="bg-linear-to-t from-primary/70 via-primary/40 to-transparent rounded-xl absolute inset-0 z-10"></div>
          </div>
          <div className="img">
            <img src={image3} alt="" />
            <div className="bg-linear-to-t from-primary/70 via-primary/40 to-transparent rounded-xl absolute inset-0 z-10"></div>
          </div>
          <div className="img">
            <img src={image4} alt="" />
            <div className="bg-linear-to-t from-primary/70 via-primary/40 to-transparent rounded-xl absolute inset-0 z-10"></div>
          </div>
          {/* <div className=" bg-linear-to-t from-primary/70 via-primary/40 to-transparent rounded-xl absolute  w-full h-full inset-0"></div> */}
        </div>
      </div>

      <div className="preloader-header">
        <h1 className=" text-7xl font-spaceMono lg:text-9xl md:text-8xl uppercase font-black">
          CODEX IT
        </h1>
      </div>
    </>
  );
};

export default Preloader;
