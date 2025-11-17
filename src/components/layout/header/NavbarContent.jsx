/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import codexLogo from "../../../assets/codex-white-logo.png";

import {
  Dot,
  Facebook,
  Instagram,
  Linkedin,
  Plus,
  Twitter,
} from "lucide-react";

import { Link } from "react-router-dom";
import { TextMaskReveal } from "../../../hooks/TextMaskReveal";
import CrossIcon from "./CrossIcon";
import EmailInput from "./EmailInput";
import { navLinks } from "../../../constants";
import ColorBends from "../../ui/ColorBends";

const NavbarContent = ({ active, handleToggle, setOpen }) => {
  return (
    <motion.div
      initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 h-screen bg-primary z-1000 "
    >
      <ColorBends
        colors={["#1E3A8A", "#0A7351", "#D9D9D9"]}
        rotation={30}
        speed={0.5}
        scale={0.09}
        frequency={2.3}
        warpStrength={1.2}
        mouseInfluence={0.2}
        parallax={0}
        noise={0.1}
        transparent
        className={"absolute top-0 h-full w-full"}
      />
      {/* Top bar (Logo + Close Button) */}
      <div className=" border-b border-muted py-[30px] shadow-lg">
        <div className=" flex justify-between items-center px-4 md:px-8 lg:px-16">
          <img
            className="w-60"
            src={codexLogo || "/placeholder.svg"}
            alt="CodexIT Logo"
          />
          <CrossIcon onClick={() => setOpen(false)} />
        </div>
      </div>

      {/* Main content */}
      <div className="grid container pt-16 mx-auto px-4 md:px-8 grid-cols-12 gap-12 h-full">
        {/* Navigation */}
        <div className=" col-span-9 md:col-span-12 lg:col-span-6">
          <ul className="space-y-6">
            {navLinks.map((nav) => (
              <div
                key={nav.name}
                className="relative group pb-3 transition-all duration-300"
              >
                {/* Animated bottom border */}
                <span className="absolute left-0 bottom-0 w-full h-px bg-linear-to-r from-emerald-600 via-emerald-400 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>

                {/* Parent link */}
                <div
                  className={`flex justify-between items-center cursor-pointer text-3xl md:text-4xl lg:text-5xl font-black uppercase transition-all duration-75 ease-in-out ${
                    active === nav.name
                      ? "text-emerald-600 drop-shadow-lg"
                      : "text-strong hover:text-emerald-600"
                  }`}
                  onClick={() => (nav.children ? handleToggle(nav.name) : null)}
                >
                  <Link
                    to={nav.link}
                    className="hover:drop-shadow-md transition-all"
                  >
                    <TextMaskReveal
                      startDelay={0.1}
                      fontSize="text-3xl md:text-4xl lg:text-5xl"
                      text={nav.name}
                    />
                  </Link>
                  {nav.children && (
                    <Plus
                      className={`transition-all duration-500 ${
                        active === nav.name ? "rotate-45 scale-125" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Children dropdown */}
                <AnimatePresence>
                  {active === nav.name && nav.children && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="pl-4 pt-5 space-y-3 text-lg md:text-xl lg:text-2xl text-strong">
                        {nav.children.map((child) => (
                          <li
                            key={child}
                            className="hover:text-strong uppercase flex justify-start items-center gap-2 cursor-pointer transition-all duration-500 hover:translate-x-2"
                          >
                            <Dot className="text-lochmara" />
                            <TextMaskReveal
                              startDelay={0.1}
                              fontSize="text-lg md:text-xl lg:text-2xl"
                              text={child}
                            />
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="col-span-2 hidden lg:flex justify-center items-start">
          <div className="h-[70vh] w-[0.5px] bg-muted"></div>
        </div>

        {/* Contact Section */}
        <div className="col-span-4 hidden lg:block -ml-[18%] space-y-6 relative">
          {/* ✅ Dhaka Office */}
          <div className="space-y-2 group">
            <TextMaskReveal
              startDelay={0.1}
              text="Dhaka Office (HQ):"
              fontSize="text-xl"
              className="uppercase font-semibold text-strong transition-all duration-300 group-hover:text-lochmara"
              splitByWord={false}
            />

            <TextMaskReveal
              startDelay={0.1}
              text={`House: 1275, Level 3 & 4, Road: 11, Avenue: 2, Mirpur DOHS,
      Dhaka 1216`}
              fontSize="text-base"
              className="text-gray-300 leading-relaxed"
              splitByWord={false}
            />
          </div>

          {/* ✅ Chattogram Office */}
          <div className="space-y-2 group">
            <TextMaskReveal
              startDelay={0.1}
              text="Chattogram Office:"
              fontSize="text-xl"
              className="uppercase font-semibold text-strong transition-all duration-300 group-hover:text-lochmara"
              splitByWord={false}
            />

            <TextMaskReveal
              startDelay={0.1}
              text="House: 20/B, Road: 02, Hill View Housing Society, Chattogram 4209."
              fontSize="text-base"
              className="text-gray-300 leading-relaxed"
              splitByWord={false}
            />
          </div>

          {/* ✅ Email */}
          <div className="space-y-2 group">
            <TextMaskReveal
              startDelay={0.1}
              text="Email:"
              fontSize="text-xl"
              className="uppercase font-semibold text-strong transition-all duration-300 group-hover:text-lochmara"
              splitByWord={false}
            />
            <TextMaskReveal
              startDelay={0.1}
              text="info@codexitbd.com"
              fontSize="text-base"
              className="text-gray-300"
              splitByWord={true}
            />
          </div>

          {/* ✅ Contact */}
          <div className="space-y-2 group">
            <TextMaskReveal
              startDelay={0.1}
              text="Contact:"
              fontSize="text-xl"
              className="uppercase font-semibold text-strong transition-all duration-300 group-hover:text-lochmara"
              splitByWord={false}
            />
            <TextMaskReveal
              startDelay={0.1}
              text="+88 096 78 375375"
              fontSize="text-base"
              className="text-gray-300"
              splitByWord={true}
            />
          </div>

          {/* ✅ Get Subscribed Section */}
          <div className="mt-8 pt-6 border-t border-muted">
            <TextMaskReveal
              startDelay={0.1}
              text="Get Subscribed!"
              fontSize="text-2xl"
              className="uppercase font-semibold text-strong mb-4"
              splitByWord={false}
            />
            <EmailInput />
          </div>

          {/* ✅ Social Icons */}
          <div className="flex justify-start items-center gap-3 mt-10">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
              <motion.div
                key={idx}
                className="bg-linear-to-br from-lochmara to-lochmara-700 w-fit h-fit p-3 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Icon size={20} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NavbarContent;
