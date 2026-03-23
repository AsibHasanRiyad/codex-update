import { Timeline } from "./Timeline";

export function CompanyTimeline() {
  const data = [
    {
      title: "2025",
      content: (
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-100 font-semibold">
            <span className=" tracking-wider uppercase text-2xl md:text-3xl lg:text-4xl font-adventure">
              Global Footprint
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            2 Creative expanded its service portfolio to support modern brands
            with web development, mobile apps, cloud services, UI/UX design,
            digital marketing, interior design, and smart IoT solutions.
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
              Scaling Up
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            Our delivery capabilities matured through deeper collaboration
            across strategy, design, development, and growth disciplines,
            enabling us to serve more ambitious and complex projects.
          </p>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <div className="mb-2 flex items-center uppercase gap-2 text-sm text-gray-100 font-semibold">
            <span className=" tracking-wider text-xl md:text-2xl lg:text-3xl font-adventure">
              Commitment to Quality
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            We strengthened our internal processes, design systems, and quality
            standards to deliver more consistent user experiences and more
            reliable digital products for clients.
          </p>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div>
          <div className="mb-2 flex items-center uppercase gap-2 text-sm text-gray-100 font-semibold">
            <span className=" tracking-wider text-xl md:text-2xl lg:text-3xl font-adventure">
              Broadening Our Reach
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            We began supporting a wider mix of international-facing brands and
            adopted a more scalable delivery model focused on performance,
            design clarity, and long-term business value.
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
              Growing Stronger
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            With growing demand for creative and technical execution, we
            expanded our capabilities and refined our service approach around
            strategy, delivery, and measurable outcomes.
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
              Stronger Industry Presence
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            This phase marked stronger market positioning, deeper client trust,
            and a clearer commitment to building a recognizable creative and
            technology brand around lasting business partnerships.
          </p>
        </div>
      ),
    },
    {
      title: "2014",
      content: (
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-100 font-semibold">
            <span className=" tracking-wider uppercase text-xl md:text-2xl lg:text-3xl font-adventure">
              The Foundation Of 2 Creative
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            2 Creative began with a simple vision: build meaningful digital and
            design solutions that help businesses communicate better, operate
            smarter, and grow faster in a competitive market.
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
