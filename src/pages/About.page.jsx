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
      "Learn about Devola, a Dhaka-based digital solutions company delivering web development, custom software, ecommerce, mobile apps, cloud hosting, VPS, and IT infrastructure services.",
    pathname: "/about-us",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Devola",
      url: buildCanonicalUrl("/about-us"),
      description: "Company history and mission of Devola digital solutions.",
    },
  });

  return (
    <div className=" overflow-hidden">
      <h1 className="sr-only">About Devola</h1>
      <PageHeader
        title="About Devola"
        subtitle="Devola is a future-focused digital solutions company helping businesses grow through web development, custom software, ecommerce, mobile apps, cloud hosting, and IT infrastructure services."
      />
      <AboutHero />
      <CompanyHistory />
    </div>
  );
};

export default About;
