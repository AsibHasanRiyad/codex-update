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
    endAngle: 300,
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
    endAngle: -110,
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
    endAngle: 310,
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
    endAngle: -125,
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
    endAngle: 280,
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
    endAngle: -135,
  },
];

const BeamCircle = ({ size = 300, orbits: customOrbits }) => {
  const orbitsData = useMemo(
    () => customOrbits || defaultOrbits,
    [customOrbits]
  );
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
            text="Innovate. Inspire."
          />
          <TextMaskReveal
            className="uppercase -mt-7"
            splitByWord
            text="Experiences that Move"
          />
        </div>
        <p className="text-center max-w-7xl mx-auto text-3xl text-white">
          At CodexitBD, we create visually stunning, high-performance animated
          websites that blend creativity and technology. Our designs deliver
          seamless performance, sleek visuals, and immersive user experiences —
          helping your brand stand out in the digital world.
        </p>
      </div>

      {/* --- Orbit Section --- */}
      <div className="absolute -bottom-1/3 transform -translate-x-1/2 left-1/2 p-4 bg-transparent">
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
