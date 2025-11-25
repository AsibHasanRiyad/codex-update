/* eslint-disable no-unused-vars */
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";

const ServicesImage = () => {
  const container = useRef();

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-30vh", "20vh"]);

  return (
    <div className=" py-12 container mx-auto px-4 md:px-8 md:py-16 lg:py-20 ">
      <div
        ref={container}
        className=" flex items-center justify-center  h-full lg:h-[60vh] rounded-2xl w-full overflow-hidden"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="  ">
          <motion.div
            style={{ y }}
            className="relative w-full h-full rounded-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1669023414162-8b0573b9c6b2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632"
              alt="image"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesImage;
