/* eslint-disable no-unused-vars */
import movingSvg from "../../assets/Asterisk.svg";
import { motion } from "framer-motion";
import { TextMaskReveal } from "../../hooks/TextMaskReveal";
import LightRays from "../ui/LightRays";
const PageHeader = () => {
  return (
    <div className=" relative w-screen  h-full flex flex-col py-20 justify-between overflow-hidden bg-primary">
      <LightRays className="absolute min-h-screen bg-primary left-0 top-0" />{" "}
      <div className="absolute  right-[12%] z-20 top-[22%] lg:top-[20%]">
        <motion.img
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
          className=" size-24 md:size-40  lg:size-32"
          src={movingSvg}
          alt=""
        />
      </div>
      {/* Main content */}
      <div className="relative z-40 flex-1 flex items-center">
        <div className="container mx-auto px-4 md:px-8 pb-12 lg:pb-16 pt-24 lg:pt-32">
          {/* Hero Title */}
          <div className="mb-8 md:mb-12">
            <TextMaskReveal
              splitByWord={true}
              fontSize="text-5xl text-7xl 2xl:text-8xl"
              className="font-bold text-white mb-2 uppercase leading-[0.9]"
              text="About Codex IT"
              delayPerItem={0.08}
            />
            <TextMaskReveal
              splitByWord={true}
              fontSize="text-xl text-2xl 2xl:text-3xl"
              className="font-normal text-white   leading-[0.9]"
              text="We are a client-oriented digital solutions provider in Bangladesh, dedicated to understanding your unique needs and delivering practical, innovative solutions that drive real business growth."
              delayPerItem={0.08}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
