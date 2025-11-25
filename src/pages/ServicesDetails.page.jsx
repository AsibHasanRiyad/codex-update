import ClientFeedback from "../components/home/testimonial/Testimonial";
import ServicesImage from "../components/services/ServicesImage";
import PageHeader from "../components/shared/PageHeader";

const ServicesDetails = () => {
  return (
    <div className=" overflow-hidden">
      <PageHeader />

      <ServicesImage />
      <ClientFeedback />
    </div>
  );
};

export default ServicesDetails;
