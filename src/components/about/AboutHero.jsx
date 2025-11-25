/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextMaskReveal } from "../../hooks/TextMaskReveal";
import movingSvg from "../../assets/Asterisk.svg";
import person from "../../assets/person.png";
export default function AboutHero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
  };

  const imageContainer = useRef();

  const { scrollYProgress } = useScroll({
    target: imageContainer,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div className="py-12 md:py-16 lg:py-20  flex items-center justify-center p-8">
      <motion.div
        className="container mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-16 items-start"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Left Side */}
        <motion.div className="space-y-8 lg:col-span-2" variants={fadeIn}>
          <motion.div
            className="text-gray-200 text-sm font-medium tracking-wider mb-4"
            variants={item}
          >
            • OUR JOURNEY
          </motion.div>

          <TextMaskReveal
            splitByWord
            text="Our Legacy of Innovation"
            className="text-gray-100 uppercase text-5xl lg:text-6xl font-bold leading-tight"
          />

          <p className="text-gray-300 font-medium md:text-lg text-justify -mt-5">
            Since our inception,Skylark Soft Limited has been a driving force in
            revolutionizing the textile and apparel industry through innovative{" "}
            ERP solutions. From humble beginnings to becoming a global
            technology leader, our commitment has always been to deliver
            excellence, efficiency, and empowerment to our clients worldwide.
          </p>

          {/* Rotating Shape */}
          <motion.div className="pt-6">
            <motion.img
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
              src={movingSvg}
              alt="rotating shape"
              className="size-28 mx-auto lg:mx-0"
            />
          </motion.div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="space-y-8 lg:col-span-3 lg:grid gap-12 lg:grid-cols-2"
          variants={fadeIn}
        >
          {/* Parallax Image */}
          <motion.div
            ref={imageContainer}
            className="w-full flex justify-center items-center aspect-square rounded-lg overflow-hidden"
            variants={item}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            style={{ y }}
          >
            <motion.img
              src={person}
              alt="textile machinery"
              className="size-[70%] object-contain"
            />
          </motion.div>

          <div>
            <TextMaskReveal
              splitByWord
              className="text-3xl text-gray-100 uppercase md:text-4xl lg:text-5xl"
              text="Our History"
            />

            <p className="text-gray-300 font-medium text-justify mt-4">
              Today, with our flagship productgoRMG ERP , we help manage over$8
              billion in annual production — streamlining operations for
              hundreds of clients across continents.
            </p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 gap-8 pt-8"
              variants={container}
            >
              <motion.div variants={item}>
                <motion.div
                  className="text-6xl font-bold text-gray-200 mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  98%
                </motion.div>
                <div className="text-gray-300 font-medium text-sm">
                  Client Retention & Satisfaction
                </div>
              </motion.div>

              <motion.div variants={item}>
                <motion.div
                  className="text-6xl font-bold text-gray-200 mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  125+
                </motion.div>
                <div className="text-gray-300 font-medium text-sm">
                  Projects Delivered Across 24 Countries
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
