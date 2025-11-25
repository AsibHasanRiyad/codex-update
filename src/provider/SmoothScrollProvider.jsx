import ReactLenis from "lenis/react";

const SmoothScrollProvider = ({ children }) => {
  const lenisOptions = {
    lerp: 0.25,
    duration: 2,
    touchSmooth: false,
    smooth: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  };
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScrollProvider;
