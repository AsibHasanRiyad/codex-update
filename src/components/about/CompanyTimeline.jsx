import { Timeline } from "./Timeline";

export function CompanyTimeline() {
  const data = [
    {
      title: "2025",
      content: (
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-100 font-semibold">
            <span className=" tracking-wider uppercase text-2xl md:text-3xl lg:text-4xl font-adventure">
              Expanding Horizons
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            Devola expanded its cloud and VPS hosting services with servers at
            Dhaka Colo and DR at ColoAsia, while growing its product portfolio
            with ready-to-deploy CRM, HRM, POS, and e-commerce solutions.
          </p>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-100 font-semibold">
            <span className=" tracking-wider uppercase text-xl md:text-2xl lg:text-3xl font-adventure">
              Infrastructure Mastery
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            Successfully deployed enterprise-level IT infrastructure projects
            including AFIP Wi-Fi (163 APs), DTCA Fiber Network, and BIFCL Zimbra
            mail server, establishing expertise in large-scale deployments.
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <div className="mb-2 flex items-center uppercase gap-2 text-sm text-gray-100 font-semibold">
            <span className=" tracking-wider text-xl md:text-2xl lg:text-3xl font-adventure">
              Software Excellence
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            Launched flagship software products including Synergy HRM,
            WorkPulse, and EduCore, serving businesses across HR management,
            employee monitoring, and education sectors.
          </p>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div>
          <div className="mb-2 flex items-center uppercase gap-2 text-sm text-gray-100 font-semibold">
            <span className=" tracking-wider text-xl md:text-2xl lg:text-3xl font-adventure">
              Growing the Team
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            Built a dedicated team of 20+ professionals across software
            development, network engineering, cloud infrastructure, and digital
            marketing, enabling comprehensive service delivery.
          </p>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-100 font-semibold">
            <span className=" tracking-wider uppercase text-xl md:text-2xl lg:text-3xl font-adventure">
              Service Expansion
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            Expanded beyond web development into custom software, ecommerce
            platforms, and IT infrastructure services, positioning Devola as a
            full-service digital solutions provider.
          </p>
        </div>
      ),
    },
    {
      title: "2018",
      content: (
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-100 font-semibold">
            <span className=" tracking-wider uppercase text-xl md:text-2xl lg:text-3xl font-adventure">
              The Foundation of Devola
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            Devola was founded with a clear vision: deliver digital solutions
            that truly work for businesses. Starting from Dhaka, we began
            building websites and software that help companies operate smarter
            and grow faster.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
