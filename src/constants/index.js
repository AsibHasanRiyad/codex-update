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
        name: "Web Development",
        link: "/services/web-development",
      },
      {
        name: "Mobile Apps",
        link: "/services/mobile-apps",
      },
      {
        name: "Cloud Services",
        link: "/services/cloud-services",
      },
      {
        name: "Digital Marketing",
        link: "/services/digital-marketing",
      },
      {
        name: "UI/UX Design",
        link: "/services/ui-ux-design",
      },
      {
        name: "Smart IoT",
        link: "/services/smart-iot",
      },
    ],
  },
  {
    name: "Blog",
    link: "#",
    children: ["Latest Posts", "Company News", "Tips & Guides"],
  },
  { name: "Contact", link: "/contact", children: null },
];
