import { useParams } from "react-router-dom";
import { servicesData } from "../data/services";
import ClientFeedback from "../components/home/testimonial/Testimonial";
import Images from "../components/services/Images";
import OurProcess from "../components/services/OurProcess";
import ServicesImage from "../components/services/ServicesImage";
import PageHeader from "../components/shared/PageHeader";

const ServicesDetails = () => {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug) || servicesData[0];

  return (
    <div className=" overflow-hidden">
      <PageHeader
        title={service.header.title}
        subtitle={service.header.subtitle}
      />
      <ServicesImage image={service.heroImage} />
      <OurProcess
        tagline={service.processTagline}
        intro={service.processIntro}
        processSteps={service.processSteps}
      />
      <Images
        sectionTitle={service.projectsSectionTitle}
        projects={service.projects}
      />
      <ClientFeedback />
    </div>
  );
};

export default ServicesDetails;
