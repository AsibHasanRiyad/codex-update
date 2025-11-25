import React from "react";
import PageHeader from "../components/shared/PageHeader";
import AboutHero from "../components/about/AboutHero";
import CompanyHistory from "../components/about/CompanyHistory";

const About = () => {
  return (
    <div className=" overflow-hidden">
      <PageHeader />
      <AboutHero />
      <CompanyHistory />
    </div>
  );
};

export default About;
