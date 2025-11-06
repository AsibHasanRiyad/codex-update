import { useEffect, useRef, useState } from "react";
import "./Preloader.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
import { useLenis } from "lenis/react";

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

      const tl = gsap.timeline({ delay: 0.25 });
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
        <div className="progress-bar bg-lochmara"></div>

        <div className="preloader-images">
          <div className="img">
            <img
              src="https://www.skylarksoft.com/wp-content/uploads/2021/02/mrketing-of-gormg-erp_pre.png"
              alt=""
            />
          </div>
          <div className="img">
            <img
              src="https://www.skylarksoft.com/wp-content/uploads/2021/03/automate-your-garments-production.png"
              alt=""
            />
          </div>
          <div className="img">
            <img
              src="https://www.skylarksoft.com/wp-content/uploads/2024/08/AQAI-dashboard-hitmap-600x300.png"
              alt=""
            />
          </div>
          <div className="img">
            <img
              src="https://www.skylarksoft.com/wp-content/uploads/2023/02/Garments-Production-Tracking-Software-Realtime-CUTRACKER-Skylark-Soft-Limited-e1696149874459.jpg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="preloader-header">
        <h1 className=" text-6xl mt-16 lg:text-8xl md:text-7xl uppercase font-black">
          Skylark Soft
        </h1>
      </div>
    </>
  );
};

export default Preloader;
