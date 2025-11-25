/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Facebook, Instagram, Linkedin, Plus, Twitter } from "lucide-react";

import codexLogoWhite from "../../../assets/codex-white-logo.png";
import NavbarContent from "./NavbarContent";
import HamburgerIcon from "./HamburgerIcon";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current - 5) {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = (name) => {
    setActive(active === name ? null : name);
  };

  return (
    <>
      {/* Navbar */}
      <motion.div
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0  bg-transparent border-b border-muted backdrop-blur-3xl px-4 md:px-8 z-1000 "
      >
        <div className="  grid grid-cols-12 py-4 lg:py-0 justify-between items-center">
          <Link className="col-span-6 lg:col-span-2" to={"/"}>
            <img
              className="w-60 pl-4 md:pl-8  lg:px-6 "
              src={codexLogoWhite || "/placeholder.svg"}
              alt="Codex Logo"
            />
          </Link>
          <div className=" lg:col-span-8 hidden lg:flex justify-between px-[10%] items-center border-l border-muted py-7 border-r">
            <div className=" flex justify-center gap-2 text-strong font-semibold items-center">
              <span>Contact</span> <div className=" w-5 bg-strong h-0.5"></div>{" "}
              <span>support@codexitbd.com</span>
            </div>
            <div className="flex justify-start items-center gap-3 ">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                <motion.div
                  key={idx}
                  className=" w-fit h-fit p-3 rounded-full text-strong shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <Icon size={20} c />
                </motion.div>
              ))}
            </div>
          </div>
          <div className=" col-span-6 lg:col-span-2 flex justify-end pr-4 md:pr-8 lg:pr-12 ">
            <HamburgerIcon onClick={() => setOpen(true)} />
          </div>
        </div>
      </motion.div>

      {/* Overlay with Clip-Path Animation */}
      <AnimatePresence>
        {open && (
          <NavbarContent
            active={active}
            handleToggle={handleToggle}
            setOpen={setOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
