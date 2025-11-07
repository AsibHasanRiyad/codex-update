/* eslint-disable no-unused-vars */
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import arrow from "../../assets/Arrow.svg";
import { useRef, useState } from "react";

const DevelopmentProjectCard = ({
  image,

  siteName,
  shortDesc,
  description,
  siteLink,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const arrowRef = useRef(null);
  const nameRef = useRef(null);
  useGSAP(
    () => {
      gsap.set(arrowRef.current, { x: -20, opacity: 0 });
      gsap.set(nameRef.current, { x: -30 });
    },
    { scope: cardRef }
  );

  const handleEnter = () => {
    setIsHovered(true);

    gsap.to(arrowRef.current, {
      x: 10,
      opacity: 1,
      duration: 0.6,
      ease: "power3.inOut",
    });

    gsap.to(nameRef.current, {
      x: 10,
      duration: 0.6,
      ease: " power3.out",
    });
  };

  const handleLeave = () => {
    setIsHovered(false);

    gsap.to(arrowRef.current, {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(nameRef.current, {
      x: -30,
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={cardRef}
      className="group relative w-full mx-auto"
    >
      {/* Image Container with fixed height */}
      <div
        className="relative w-full h-80 rounded-xl overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={image}
          alt={siteName}
          className="w-full h-full object-cover"
        />

        {/* Overlay on hover - slides up from bottom */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? 0 : "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-emerald-600 text-white flex flex-col justify-between p-6 rounded-xl"
        >
          {/* Top: Company Logo */}
          <div className="flex justify-start items-start">
            {/* <div>
              <img src={logo} alt="Logo" className="w-44 object-contain" />
            </div> */}
          </div>

          {/* Bottom: Description + Visit Button */}
          <div className="flex flex-col gap-4">
            <p className="text-sm lg:text-lg leading-relaxed">{description}</p>
            <motion.a
              href={siteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-start lg:text-xl items-center gap-2 text-start text-white font-semibold"
              whileHover="hover"
            >
              <span>Explore Now</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
                variants={{
                  hover: { x: 6 }, // moves arrow 6px to the right
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Below image: site name + short description */}
      <div className="mt-4 px-2 text-start">
        <div className=" flex gap-1 items-center ">
          <img
            ref={arrowRef}
            src={arrow}
            className="w-7 pr-2 arrow rotate-45"
          />
          <h1
            className="font-bold name text-xl lg:text-2xl 2xl:text-3xl text-strong"
            ref={nameRef}
          >
            {siteName}
          </h1>
        </div>
        <p className="text-gray-100 text-sm mt-1">{shortDesc}</p>
      </div>
    </div>
  );
};

export default DevelopmentProjectCard;
