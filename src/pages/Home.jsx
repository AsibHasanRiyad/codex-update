import DevelopmentProject from "../components/home/DevelopmentProject.component";
import Hero from "../components/home/Hero.component";
import HomeVideo from "../components/home/HomeVideo.component";
import Stats from "../components/home/Stats.section";
import FactsSection from "../components/home/FactsSection";
import ClientFeedback from "../components/home/testimonial/Testimonial";
import BeamCircle from "../components/ui/BeamCircle";
import { useSEO } from "../hooks/useSEO";

const Home = () => {
  useSEO({
    title: "Home",
    description:
      "2 Creative helps businesses grow with web development, mobile apps, cloud engineering, digital marketing, UX/UI, interior design, and smart IoT solutions.",
    pathname: "/",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "2 Creative Home",
      url: `${window.location.origin}/`,
      description:
        "Digital solutions company offering web, app, cloud, design, marketing, and IoT services.",
    },
  });

  return (
    <div>
      <div className="relative overflow-hidden h-full w-full">
        <h1 className="sr-only">2 Creative Digital Solutions Agency</h1>
        <Hero />
        <BeamCircle />
        <HomeVideo />
        <DevelopmentProject />
        <Stats />
        <FactsSection />
        <ClientFeedback />
      </div>
    </div>
  );
};

export default Home;
