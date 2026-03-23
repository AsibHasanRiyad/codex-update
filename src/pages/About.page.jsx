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
      "Learn about 2 Creative, a Riyadh-focused digital solutions company delivering web development, mobile apps, cloud services, UI/UX design, digital marketing, interior design, and smart IoT solutions.",
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
      <PageHeader
        title="About 2 Creative"
        subtitle="2 Creative is a future-focused digital solutions company helping businesses grow through web development, mobile apps, cloud engineering, digital marketing, UI/UX design, interior design, and smart IoT services."
      />
      <AboutHero />
      <CompanyHistory />
    </div>
  );
};

export default About;
