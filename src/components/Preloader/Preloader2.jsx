/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export let isInitialLoad = true;

const Preloader2 = () => {
  const blocksRef = useRef([]);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  const setBlockRef = (el) => {
    if (el && !blocksRef.current.includes(el)) {
      blocksRef.current.push(el);
    }
  };

  useEffect(() => {
    if (!showPreloader || animating) return;
    setAnimating(true);

    const ease = "power4.inOut";

    const animateIn = () => {
      return new Promise((resolve) => {
        gsap.set(blocksRef.current, { visibility: "visible", scaleY: 0 });
        gsap.to(blocksRef.current, {
          scaleY: 1,
          duration: 0.7,
          ease,
          stagger: { each: 0.1, from: "start", grid: [2, 5], axis: "x" },
          onComplete: resolve,
        });
      });
    };

    const animateOut = () => {
      return new Promise((resolve) => {
        gsap.to(blocksRef.current, {
          scaleY: 0,
          duration: 0.7,
          ease,
          stagger: { each: 0.1, from: "start", grid: "auto", axis: "x" },
          onComplete: resolve,
        });
      });
    };

    const runAnimation = async () => {
      await animateIn();
      await animateOut();
      setShowPreloader(false);
      setAnimating(false);
    };

    runAnimation();
  }, [showPreloader, animating]);

  if (!showPreloader) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col pointer-events-none bg-white">
      <div className="flex-1 flex">
        {[...Array(5)].map((_, i) => (
          <div
            key={`row1-block-${i}`}
            ref={setBlockRef}
            className="flex-1 origin-top bg-primary"
            style={{ willChange: "transform", visibility: "hidden" }}
          ></div>
        ))}
      </div>
      <div className="flex-1 flex">
        {[...Array(5)].map((_, i) => (
          <div
            key={`row2-block-${i}`}
            ref={setBlockRef}
            className="flex-1 origin-bottom bg-primary"
            style={{ willChange: "transform", visibility: "hidden" }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Preloader2;
