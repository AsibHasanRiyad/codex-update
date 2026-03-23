/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextMaskReveal } from "../../hooks/TextMaskReveal";
import movingSvg from "../../assets/Asterisk.svg";
import person from "../../assets/person2.png";
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
            text="A Creative Partner For Modern Growth"
            className="text-gray-100 uppercase text-5xl lg:text-6xl font-bold leading-tight"
          />

          <p className="text-gray-300 font-medium md:text-lg text-justify -mt-5">
            2 Creative was built to help ambitious brands turn ideas into
            measurable business growth. We combine strategy, design, and
            technology to deliver high-performance websites, mobile apps, cloud
            systems, digital marketing campaigns, interior concepts, and smart
            IoT experiences tailored to modern business needs.
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
              alt="2 Creative team and digital innovation"
              className="size-[70%] object-contain"
            />
          </motion.div>

          <div>
            <TextMaskReveal
              splitByWord
              className="text-3xl text-gray-100 uppercase md:text-4xl lg:text-5xl"
              text="Why Businesses Choose Us"
            />

            <p className="text-gray-300 font-medium text-justify mt-4">
              Today, 2 Creative partners with growth-focused companies that need
              more than execution. Our team builds digital products, brand
              experiences, and operational systems designed to improve
              visibility, increase efficiency, and create long-term competitive
              advantage.
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
                  360&deg;
                </motion.div>
                <div className="text-gray-300 font-medium text-sm">
                  Digital, design, and innovation support under one creative
                  partner
                </div>
              </motion.div>

              <motion.div variants={item}>
                <motion.div
                  className="text-6xl font-bold text-gray-200 mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  7+
                </motion.div>
                <div className="text-gray-300 font-medium text-sm">
                  Core service categories built for modern business growth
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
