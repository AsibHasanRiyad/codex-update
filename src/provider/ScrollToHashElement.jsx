import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

const ScrollToHashElement = () => {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Function to handle scrolling with offset
    const scrollWithOffset = (id) => {
      const element = document.getElementById(id);
      if (element) {
        // Use Lenis's scrollTo method with offset
        lenis.scrollTo(element, {
          offset: -120,
          duration: 1.2,
          immediate: false,
        });
      }
    };

    // Handle scroll behavior
    const handleScroll = () => {
      if (location.hash) {
        const id = location.hash.replace("#", "");
        // Delay to ensure DOM is ready
        setTimeout(() => scrollWithOffset(id), 100);
      } else {
        // Scroll to top using Lenis
        lenis.scrollTo(0, {
          immediate: false,
          duration: 1.2,
        });
      }
    };

    handleScroll();
  }, [location, lenis]);

  return null;
};

export default ScrollToHashElement;
