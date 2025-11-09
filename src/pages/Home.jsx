import DevelopmentProject from "../components/home/DevelopmentProject.component";
import Hero from "../components/home/Hero.component";
import HomeVideo from "../components/home/HomeVideo.component";
import Stats from "../components/home/Stats.section";
import FactsSection from "../components/home/Test";
import Test from "../components/home/Test";
import ClientFeedback from "../components/home/testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <div className="relative h-full w-full">
        <Hero />
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
