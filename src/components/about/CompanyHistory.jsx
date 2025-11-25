/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CompanyTimeline } from "./CompanyTimeline";
import { TextMaskReveal } from "../../hooks/TextMaskReveal";
import image from "../../assets/person.png";
gsap.registerPlugin(ScrollTrigger);

const CompanyHistory = () => {
  const sectionRef = useRef(null);
  const historyRef = useRef(null);
  const historyDetailsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const history = historyRef.current;
    const historyDetails = historyDetailsRef.current;

    if (section && history && historyDetails) {
      gsap.to(history, {
        scrollTrigger: {
          trigger: section,
          start: "top start",
          end: () => `+=${historyDetails.offsetHeight - 600}`,
          pin: window.matchMedia("(min-width: 1280px)").matches
            ? history
            : false,
          pinSpacing: false,
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="   min-h-screen">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-10 py-8 lg:py-12  xl:grid-cols-3">
          {/* Timeline section */}
          <div ref={historyDetailsRef} className="  xl:col-span-2">
            <CompanyTimeline />
          </div>
          {/* Title / Pinned section */}
          <div
            className=" hidden xl:block text-end xl:col-span-1"
            ref={historyRef}
          >
            <TextMaskReveal
              splitByWord
              text="Our Journey"
              className=" text-gray-100 uppercase text-4xl md:text-5xl lg:text-6xl  font-semibold"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="relative justify-center hidden w-full  mt-10  md:flex items-center"
            >
              <img src={image} alt="" className=" rounded-xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHistory;
