import { useParams } from "react-router-dom";
import { servicesData } from "../data/services";
import ClientFeedback from "../components/home/testimonial/Testimonial";
import Images from "../components/services/Images";
import OurProcess from "../components/services/OurProcess";
import ServicesImage from "../components/services/ServicesImage";
import PageHeader from "../components/shared/PageHeader";
import { useSEO } from "../hooks/useSEO";
import { buildCanonicalUrl } from "../constants/seo";

const ServicesDetails = () => {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug) || servicesData[0];

  useSEO({
    title: service.header.title,
    description: service.header.subtitle,
    pathname: `/services/${service.slug}`,
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.header.title,
      provider: {
        "@type": "Organization",
        name: "2 Creative",
      },
      url: buildCanonicalUrl(`/services/${service.slug}`),
      description: service.header.subtitle,
      areaServed: "Riyadh",
    },
  });

  return (
    <div className=" overflow-hidden">
      <h1 className="sr-only">{service.header.title}</h1>
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
