import React from "react";
import PageHeader from "../components/shared/PageHeader";
import AboutHero from "../components/about/AboutHero";
import CompanyHistory from "../components/about/CompanyHistory";
import { useSEO } from "../hooks/useSEO";
import { buildCanonicalUrl } from "../constants/seo";

const About = () => {
  useSEO({
    title: "About",
    description:
      "Learn about 2 Creative, our journey, team values, and mission to deliver high-impact digital and design solutions.",
    pathname: "/about-us",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About 2 Creative",
      url: buildCanonicalUrl("/about-us"),
      description:
        "Company history and mission of 2 Creative digital solutions agency.",
    },
  });

  return (
    <div className=" overflow-hidden">
      <h1 className="sr-only">About 2 Creative</h1>
      <PageHeader />
      <AboutHero />
      <CompanyHistory />
    </div>
  );
};

export default About;
