/* eslint-disable no-unused-vars */
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-5">
        {data.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeIn",
            }}
            key={index}
            className="flex justify-start pb-8 md:pb-12 lg:pb-16 md:gap-20 lg:gap-10"
          >
            {/* Left Side */}
            <div className="sticky flex flex-col min-w-min md:min-w-60 md:flex-row z-40 items-center top-40 self-center md:self-start max-w-xs lg:max-w-sm md:w-fit">
              {/* Outer circle gradient */}
              <div className="h-6 md:h-10 absolute bg-blue-600/40 left-5 md:left-3 w-6 md:w-10 rounded-full  flex items-center justify-center shadow-md">
                {/* Inner dot */}
                <div className="md:h-4 h-3 w-3 md:w-4 rounded-full bg-white  p-1 md:p-2" />
              </div>

              <h3 className="hidden text-gray-100 font-bold md:block text-2xl md:pl-20 md:text-4xl lg:text-5xl title">
                {item.title}
              </h3>
            </div>

            {/* Right Side */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-xl md:text-2xl mb-0 md:mb-4 text-left font-bold text-blue-800">
                {item.title}
              </h3>
              <div className="text-blue-900">{item.content}</div>
            </div>
          </motion.div>
        ))}

        {/* Vertical line */}
        <div
          style={{
            height: height - 100 + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] 
          bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] 
          from-transparent via-blue-500 to-transparent 
          [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] 
            bg-gradient-to-t from-blue-600 via-blue-400 to-blue-200 
            rounded-full shadow-[0_0_8px_rgba(30,115,190,0.4)]"
          />
        </div>
      </div>
    </div>
  );
};
