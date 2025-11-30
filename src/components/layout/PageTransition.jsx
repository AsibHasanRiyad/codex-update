/* eslint-disable react-refresh/only-export-components */

import { useEffect, useRef, createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";

const PageTransitionContext = createContext(null);

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error(
      "usePageTransition must be used within a PageTransition component"
    );
  }
  return context;
};

export default function PageTransition({ children, color = "bg-primary" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const blocksRef = useRef([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [hasNavigatedFromHome, setHasNavigatedFromHome] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);
  const initialPathRef = useRef(location.pathname);

  const ease = "power4.inOut";

  useEffect(() => {
    // Clear the refs array on component mount
    blocksRef.current = [];

    // Set color
    setCurrentColor(color);

    // Mark initial load as complete (no transition for first load)
    setIsFirstLoad(false);

    // Hide all transition blocks for initial load
    setTimeout(() => {
      gsap.set(blocksRef.current, {
        visibility: "hidden",
        scaleY: 0,
      });
    }, 50);
  }, [color]);

  // Function to handle navigation with transitions
  const handleNavigation = (to) => {
    if (to !== location.pathname && !isNavigating) {
      // Skip transition if it's the initial navigation to home
      if (
        location.pathname === initialPathRef.current &&
        to === "/" &&
        !hasNavigatedFromHome
      ) {
        navigate(to);
        return;
      }

      // If we're navigating back to home after visiting other pages
      if (to === "/") {
        setHasNavigatedFromHome(true);
      }

      setIsNavigating(true);

      // Apply the color to all blocks
      blocksRef.current.forEach((block) => {
        // Remove all bg-* classes
        [...block.classList].forEach((cls) => {
          if (cls.startsWith("bg-")) {
            block.classList.remove(cls);
          }
        });
        // Add the color class
        block.classList.add(currentColor);
      });

      // Run transition animation
      animateTransition().then(() => {
        navigate(to);

        // Wait a bit for the new page to render
        setTimeout(() => {
          revealTransition().then(() => {
            setIsNavigating(false);
          });
        }, 100);
      });
    }
  };

  const revealTransition = () => {
    return new Promise((resolve) => {
      // Make sure blocks are visible before transition
      gsap.set(blocksRef.current, {
        visibility: "visible",
        scaleY: 1,
      });

      // Then animate them away
      gsap.to(blocksRef.current, {
        scaleY: 0,
        duration: 0.7,
        ease: ease,
        stagger: {
          each: 0.1,
          from: "start",
          grid: "auto",
          axis: "x",
        },
        onComplete: () => {
          // Explicitly hide blocks after animation
          gsap.set(blocksRef.current, {
            visibility: "hidden",
          });
          resolve();
        },
      });
    });
  };

  const animateTransition = () => {
    return new Promise((resolve) => {
      gsap.set(blocksRef.current, {
        visibility: "visible",
        scaleY: 0,
      });

      gsap.to(blocksRef.current, {
        scaleY: 1,
        duration: 0.7,
        ease: ease,
        stagger: {
          each: 0.1,
          from: "start",
          grid: [2, 5],
          axis: "x",
        },
        onComplete: resolve,
      });
    });
  };

  // Helper function to create the blocks and store refs
  const setBlockRef = (el) => {
    if (el && !blocksRef.current.includes(el)) {
      blocksRef.current.push(el);
    }
  };

  return (
    <>
      {/* Transition Layer - Hidden on first load */}
      <div
        className={`fixed inset-0 z-[1000] flex flex-col pointer-events-none`}
      >
        <div className="flex-1 flex">
          {[...Array(5)].map((_, i) => (
            <div
              key={`row1-block-${i}`}
              ref={setBlockRef}
              className={`flex-1 origin-top ${currentColor}`}
              style={{
                willChange: "transform",
                visibility: isFirstLoad ? "hidden" : undefined,
              }}
            ></div>
          ))}
        </div>
        <div className="flex-1 flex">
          {[...Array(5)].map((_, i) => (
            <div
              key={`row2-block-${i}`}
              ref={setBlockRef}
              className={`flex-1 origin-bottom ${currentColor}`}
              style={{
                willChange: "transform",
                visibility: isFirstLoad ? "hidden" : undefined,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content with navigation context */}
      <PageTransitionContext.Provider
        value={{ handleNavigation, currentColor }}
      >
        {children}
      </PageTransitionContext.Provider>
    </>
  );
}
