/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

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
      className="fixed inset-0 h-screen bg-primary z-1000 flex flex-col overflow-hidden"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <ColorBends
        // colors={["#1B5E20", "#43A047", "#D9D9D9"]}
        colors={["#1B5E20", "#D9D9D9"]}
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
      <div className="shrink-0 border-b border-muted py-[30px] shadow-lg">
        <div className=" flex justify-between items-center px-4 md:px-8 lg:px-16">
          <a
            href="/"
            onClick={() => setOpen(false)}
            className="text-3xl font-black bg-gradient-to-r from-[#1B6B2A] via-[#43A047] to-[#8BC34A] bg-clip-text text-transparent"
          >
            Devola
          </a>
          <CrossIcon onClick={() => setOpen(false)} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="grid container pt-16 mx-auto px-4 md:px-8 grid-cols-12 gap-12 h-full items-start">
          {/* Navigation */}
          <div className=" col-span-9 md:col-span-12 lg:col-span-6 overflow-y-auto h-full pr-2">
            <ul className="space-y-6">
              {navLinks.map((nav) => (
                <li
                  key={nav.name}
                  className="relative group pb-3 transition-all duration-300"
                >
                  <span className="absolute left-0 bottom-0 w-full h-px bg-linear-to-r from-[#1B6B2A] via-[#43A047] to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>

                  <div
                    className={`flex justify-between items-center cursor-pointer text-3xl md:text-4xl lg:text-5xl font-black uppercase transition-all duration-75 ease-in-out ${
                      active === nav.name
                        ? "text-2c drop-shadow-lg"
                        : "text-strong hover:text-2c"
                    }`}
                    onClick={() => nav.children && handleToggle(nav.name)}
                  >
                    {nav.link && !nav.children ? (
                      <a href={nav.link} onClick={() => setOpen(false)}>
                        <TextMaskReveal
                          startDelay={0.1}
                          fontSize="text-3xl md:text-4xl lg:text-5xl"
                          text={nav.name}
                        />
                      </a>
                    ) : (
                      <div className="hover:drop-shadow-md transition-all">
                        <TextMaskReveal
                          startDelay={0.1}
                          fontSize="text-3xl md:text-4xl lg:text-5xl"
                          text={nav.name}
                        />
                      </div>
                    )}

                    {nav.children && (
                      <Plus
                        className={`transition-all duration-500 ${
                          active === nav.name ? "rotate-45 scale-125" : ""
                        }`}
                      />
                    )}
                  </div>

                  <AnimatePresence>
                    {active === nav.name && nav.children && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="pl-4 pt-5 space-y-4 text-lg md:text-xl lg:text-2xl text-strong">
                          {nav.children.map((child) =>
                            child.group ? (
                              <li key={child.group}>
                                <span className="text-sm uppercase tracking-widest text-gray-400 mb-2 block">
                                  {child.group}
                                </span>
                                <ul className="space-y-2">
                                  {child.items.map((item) => (
                                    <li
                                      key={item.name}
                                      className="hover:text-strong uppercase flex justify-start items-center gap-2 cursor-pointer transition-all duration-500 hover:translate-x-2"
                                    >
                                      <a
                                        href={item.link}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-2"
                                      >
                                        <Dot className="text-2c" />
                                        <TextMaskReveal
                                          startDelay={0.1}
                                          fontSize="text-lg md:text-xl lg:text-2xl"
                                          text={item.name}
                                        />
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            ) : (
                              <li
                                key={child.name}
                                className="hover:text-strong uppercase flex justify-start items-center gap-2 cursor-pointer transition-all duration-500 hover:translate-x-2"
                              >
                                <a
                                  href={child.link}
                                  onClick={() => setOpen(false)}
                                  className="flex items-center gap-2"
                                >
                                  <Dot className="text-2c" />
                                  <TextMaskReveal
                                    startDelay={0.1}
                                    fontSize="text-lg md:text-xl lg:text-2xl"
                                    text={child.name}
                                  />
                                </a>
                              </li>
                            ),
                          )}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
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
                text="Dhaka Office:"
                fontSize="text-xl"
                className="uppercase font-semibold text-strong transition-all duration-300 group-hover:text-2c"
                splitByWord={false}
              />

              <TextMaskReveal
                startDelay={0.1}
                text="278/3, Manikdi, Sheikh Tamim Road, Dhaka Cantonment, Dhaka - 1206"
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
                className="uppercase font-semibold text-strong transition-all duration-300 group-hover:text-2c"
                splitByWord={false}
              />
              <TextMaskReveal
                startDelay={0.1}
                text="hello@mydevola.com"
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
                className="uppercase font-semibold text-strong transition-all duration-300 group-hover:text-2c"
                splitByWord={false}
              />
              <TextMaskReveal
                startDelay={0.1}
                text="+880 1703 300440"
                fontSize="text-base"
                className="text-gray-300"
                splitByWord={true}
              />
            </div>

            {/* ✅ Get Subscribed Section */}
            {/* <div className="mt-8 pt-6 border-t border-muted">
            <TextMaskReveal
              startDelay={0.1}
              text="Get Subscribed!"
              fontSize="text-2xl"
              className="uppercase font-semibold text-strong mb-4"
              splitByWord={false}
            />
            <EmailInput />
          </div> */}

            {/* ✅ Social Icons */}
            <div className="flex justify-start items-center gap-3 mt-10">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                <motion.div
                  key={idx}
                  className="bg-linear-to-br from-[#1B6B2A] via-[#43A047] to-[#8BC34A] w-fit h-fit p-3 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <Icon size={20} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NavbarContent;
