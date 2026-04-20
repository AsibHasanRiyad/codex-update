import DevelopmentProject from "../components/home/DevelopmentProject.component";
import Hero from "../components/home/Hero.component";
import HomeVideo from "../components/home/HomeVideo.component";
import Stats from "../components/home/Stats.section";
import FactsSection from "../components/home/FactsSection";
import ClientFeedback from "../components/home/testimonial/Testimonial";
import BlogSection from "../components/home/BlogSection";
import BeamCircle from "../components/ui/BeamCircle";
import { useSEO } from "../hooks/useSEO";
import { buildCanonicalUrl } from "../constants/seo";
import HeroInteractive from "../components/ui/HeroInteractive";

const Home = () => {
  useSEO({
    title: "Home",
    description:
      "Devola helps businesses grow with web development, custom software, ecommerce, mobile apps, digital marketing, cloud hosting, VPS, and IT infrastructure solutions.",
    pathname: "/",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Devola Home",
      url: buildCanonicalUrl("/"),
      description:
        "Digital solutions company offering web development, custom software, ecommerce, mobile apps, cloud hosting, and IT infrastructure.",
    },
  });

  return (
    <div>
      <div className="relative overflow-hidden h-full w-full">
        <h1 className="sr-only">Devola Digital Solutions</h1>
        <Hero />
        <BeamCircle />
        {/* <HeroInteractive /> */}
        <HomeVideo />
        <DevelopmentProject />
        <Stats />
        <FactsSection />
        <ClientFeedback />
        <BlogSection />
      </div>
    </div>
  );
};

export default Home;
