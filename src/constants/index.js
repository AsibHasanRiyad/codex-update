export const WHATSAPP_NUMBER = "+8801326560403";

export const navLinks = [
  { name: "Home", link: "/", children: null },
  {
    name: "About",
    link: "/about-us",
  },
  {
    name: "Services",
    children: [
      {
        group: "Digital Development",
        items: [
          { name: "Web Development", link: "/services/web-development" },
          { name: "Custom Software", link: "/services/custom-software" },
          { name: "Ecommerce Development", link: "/services/ecommerce-development" },
          { name: "Mobile App Development", link: "/services/mobile-app-development" },
        ],
      },
      {
        group: "Digital Presence",
        items: [
          { name: "Digital Marketing", link: "/services/digital-marketing" },
          { name: "Domain Registration", link: "/services/domain-registration" },
          { name: "Web Hosting", link: "/services/web-hosting" },
        ],
      },
      {
        group: "Cloud & Infrastructure",
        items: [
          { name: "Shared cPanel Hosting", link: "/services/cloud-hosting" },
          { name: "VPS Solutions", link: "/services/vps-solutions" },
          { name: "Network & IT Infrastructure", link: "/services/network-it-infrastructure" },
        ],
      },
    ],
  },
  { name: "Products", link: "/products", children: null },
  { name: "Case Studies", link: "/case-studies", children: null },
  { name: "Blog", link: "/blog", children: null },
  { name: "Contact", link: "/contact", children: null },
];
