import { Facebook, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
import codexLogoWhite from "../../assets/codex-white-logo.png";
import footerBg from "../../assets/footer.mp4";
export default function Footer() {
  return (
    <div
      className="relative h-[750px] md:h-[700px] lg:h-[650px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <video
        src={footerBg}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      />

      <div className="fixed bottom-0 bg-lochmara-900 h-[750px] md:h-[700px] lg:h-[650px] w-full text-white">
        {/* Main Footer Content */}
        <div className="h-full flex flex-col justify-between px-8 py-8 md:px-16 lg:py-20">
          {/* Top Section - CTA */}
          <div className="lg:flex flex-col hidden md:flex-row md:items-center md:justify-between gap-8 border-b border-gray-400/30 pb-16">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                  <span className="text-xs">✦</span>
                </div>
                <span className="text-sm font-medium tracking-wider text-gray-200">
                  GET IN TOUCH
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
                LET'S CONNECT
              </h2>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap"
            >
              <span>Contact Us</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          {/* Middle Section - Links & Info */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-gray-400/30">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <img src={codexLogoWhite} className="w-60 mb-4" />
                <p className="text-gray-200 text-sm leading-relaxed">
                  We deliver innovative software solutions that empower
                  businesses to scale and succeed in the digital age.
                </p>
              </div>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full cursor-pointer border border-gray-300/20 flex items-center justify-center hover:border-none hover:bg-white hover:text-lochmara duration-300 transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full cursor-pointer border border-gray-300/20 flex items-center justify-center hover:border-none hover:bg-white hover:text-lochmara duration-300 transition-colors"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full cursor-pointer border border-gray-300/20 flex items-center justify-center hover:border-none hover:bg-white hover:text-lochmara duration-300 transition-colors"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-sm font-semibold tracking-wider text-white mb-6">
                COMPANY
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    Our Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    Our Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="text-sm font-semibold tracking-wider text-white mb-6">
                USEFUL LINKS
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    Blog Grid
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    Blog Standard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    Blog Details
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-semibold tracking-wider text-white mb-6">
                CONTACT US
              </h4>
              <ul className="space-y-4">
                <li>
                  <p className="text-gray-200 text-sm mb-1">Call Us</p>
                  <a
                    href="tel:+1234567890"
                    className="text-white hover:text-gray-300 transition-colors font-medium"
                  >
                    +1 (234) 567-890
                  </a>
                </li>
                <li>
                  <p className="text-gray-200 text-sm mb-1">Location</p>
                  <p className="text-white text-sm">
                    123 Tech Street,
                    <br />
                    San Francisco, CA 94105, USA
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8">
            <p className="text-gray-300/80 text-sm">
              Copyright © 2025 CodexIT. All rights reserved.
            </p>
            <a
              href="#"
              className="text-gray-300/80  hover:text-white transition-colors text-sm"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
