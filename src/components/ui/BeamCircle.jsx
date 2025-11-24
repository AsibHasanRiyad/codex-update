import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  Sun,
  Smartphone,
  BrainCircuit,
  Cloud,
  Palette,
  Code,
  Megaphone,
} from "lucide-react";
import { TextMaskReveal } from "../../hooks/TextMaskReveal";
import { useInView } from "framer-motion";

const defaultOrbits = [
  {
    id: 1,
    label: "Web Development",
    icon: <Code className="text-primary" />,
    radiusFactor: 2.5,
    speed: 8,
    orbitColor: "gray",
    iconSize: 28,
    orbitThickness: 1.5,
    startAngle: 180,

    endAngleLg: 300, // desktop
    endAngleMd: 260, // tablet
    endAngleSm: 240, // mobile
  },
  {
    id: 2,
    label: "Mobile Apps",
    icon: <Smartphone className="text-primary" />,
    radiusFactor: 2.9,
    speed: 10,
    orbitColor: "gray",
    iconSize: 28,
    orbitThickness: 1.5,
    startAngle: 0,

    endAngleLg: -110,
    endAngleMd: -80,
    endAngleSm: -80,
  },
  {
    id: 3,
    label: "AI Solutions",
    icon: <BrainCircuit className="text-primary" />,
    radiusFactor: 3.3,
    speed: 12,
    orbitColor: "gray",
    iconSize: 30,
    orbitThickness: 1.5,
    startAngle: 180,

    endAngleLg: 310,
    endAngleMd: 260,
    endAngleSm: 250,
  },
  {
    id: 4,
    label: "Cloud Services",
    icon: <Cloud className="text-primary" />,
    radiusFactor: 3.7,
    speed: 14,
    orbitColor: "gray",
    iconSize: 30,
    orbitThickness: 1.5,
    startAngle: 0,

    endAngleLg: -125,
    endAngleMd: -90,
    endAngleSm: -90,
  },
  {
    id: 5,
    label: "Digital Marketing",
    icon: <Megaphone className="text-primary" />,
    radiusFactor: 4.1,
    speed: 16,
    orbitColor: "gray",
    iconSize: 28,
    orbitThickness: 1.5,
    startAngle: 180,

    endAngleLg: 280,
    endAngleMd: 240,
    endAngleSm: 260,
  },
  {
    id: 6,
    label: "UX/UI Design",
    icon: <Palette className="text-primary" />,
    radiusFactor: 4.5,
    speed: 18,
    orbitColor: "gray",
    iconSize: 28,
    orbitThickness: 1.5,
    startAngle: 0,

    endAngleLg: -135,
    endAngleMd: -95,
    endAngleSm: -85,
  },
];

const BeamCircle = ({ size = 300, orbits: customOrbits }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const orbitsData = useMemo(() => {
    return (customOrbits || defaultOrbits).map((orbit) => {
      let endAngle = orbit.endAngleLg;

      if (screenWidth < 640) {
        endAngle = orbit.endAngleSm;
      } else if (screenWidth < 1024) {
        endAngle = orbit.endAngleMd;
      }

      return { ...orbit, endAngle };
    });
  }, [customOrbits, screenWidth]);

  const halfSize = size / 2;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // triggers once when in viewport

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      setAnimate(true);
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="relative w-screen flex justify-center h-screen bg-primary overflow-hidden"
    >
      <div className="bg-gradient-to-t from-slate-950/80 to-transparent absolute w-screen h-40 bottom-0 left-0"></div>

      {/* --- Text Section --- */}
      <div className="pt-10 space-y-0">
        <div className="text-white text-8xl text-center">
          <TextMaskReveal
            className="uppercase"
            splitByWord
            fontSize="text-4xl md:text-5xl lg:text-6xl"
            text="Innovate. Inspire."
          />
          <TextMaskReveal
            className="uppercase lg:-mt-7"
            fontSize="text-3xl md:text-5xl lg:text-6xl"
            splitByWord
            text="Experiences that Move"
          />
        </div>
        <p className="text-center block px-4 md:px-8 max-w-7xl mx-auto text-base md:text-lg mt-5 lg:text-3xl text-white">
          At CodexitBD, we create visually stunning, high-performance animated
          websites that blend creativity and technology. Our designs deliver
          seamless performance, sleek visuals, and immersive user experiences —
          helping your brand stand out in the digital world.
        </p>
      </div>

      {/* --- Orbit Section --- */}
      <div className="absolute -bottom-[40%] lg:-bottom-1/3 transform -translate-x-1/2 left-1/2 p-4 bg-transparent">
        <div className="relative" style={{ width: size, height: size }}>
          {orbitsData.map((orbit) => {
            const orbitDiameter = size * orbit.radiusFactor;
            const orbitRadius = orbitDiameter / 2;
            const containerSize = size;

            return (
              <React.Fragment key={orbit.id}>
                <div
                  className="absolute rounded-full border border-gray-700"
                  style={{
                    width: orbitDiameter,
                    height: orbitDiameter,
                    top: halfSize - orbitRadius,
                    left: halfSize - orbitRadius,
                    borderWidth: orbit.orbitThickness || 1,
                  }}
                />

                <div
                  className="absolute inset-0"
                  style={{
                    width: containerSize,
                    height: containerSize,
                    transform: `rotate(${orbit.startAngle}deg)`,
                    animation: animate
                      ? `rotate-${orbit.id} ${orbit.speed}s ease-in-out forwards`
                      : "none",
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      top: halfSize,
                      left: halfSize + orbitRadius,
                      transform: `translate(-50%, -50%)`,
                    }}
                  >
                    <div
                      className="rounded-full relative shadow-md grid place-content-center bg-gray-900 p-1"
                      style={{
                        width: orbit.iconSize,
                        height: orbit.iconSize,
                        transform: `rotate(${-orbit.startAngle}deg)`,
                        animation: animate
                          ? `counter-rotate-${orbit.id} ${orbit.speed}s ease-in-out forwards`
                          : "none",
                      }}
                    >
                      <div className="bg-white rounded-full p-1">
                        {React.cloneElement(orbit.icon, {
                          size: orbit.iconSize * 0.6,
                        })}
                      </div>
                      <h1 className="absolute left-8 text-white whitespace-nowrap text-sm">
                        {orbit.label}
                      </h1>
                    </div>
                  </div>
                </div>

                <style key={`style-${orbit.id}`}>{`
                  @keyframes rotate-${orbit.id} {
                    from {
                      transform: rotate(${orbit.startAngle}deg);
                    }
                    to {
                      transform: rotate(${orbit.endAngle}deg);
                    }
                  }
                  @keyframes counter-rotate-${orbit.id} {
                    from {
                      transform: rotate(${-orbit.startAngle}deg);
                    }
                    to {
                      transform: rotate(${-orbit.endAngle}deg);
                    }
                  }
                `}</style>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BeamCircle;
