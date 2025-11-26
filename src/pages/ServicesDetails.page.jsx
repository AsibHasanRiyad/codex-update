import ClientFeedback from "../components/home/testimonial/Testimonial";
import Images from "../components/services/Images";
import OurProcess from "../components/services/OurProcess";
import ServicesImage from "../components/services/ServicesImage";
import PageHeader from "../components/shared/PageHeader";

const ServicesDetails = () => {
  return (
    <div className=" overflow-hidden">
      <PageHeader />
      <ServicesImage />
      <OurProcess />
      <Images />
      <ClientFeedback />
    </div>
  );
};

export default ServicesDetails;
