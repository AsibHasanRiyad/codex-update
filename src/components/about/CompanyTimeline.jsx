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
            This year, we welcomed our first client in South Africa—a key
            milestone in our global expansion and a testament to our
            international impact.
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
            Our team grew to over 60 members, significantly enhancing our
            operational capacity and our ability to take on larger, more complex
            projects.
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
            We earned our ISO Certification, a key achievement that reinforced
            our dedication to quality, security, and operational excellence in
            everything we do.
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
              Going Global
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            A monumental step forward by establishing itself as a
            Europe-Bangladesh joint venture company, broadening our horizons and
            integrating international best practices into our core operations.
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
            Expanded to over 35 members, a direct reflection of our growing
            client base and our commitment to building a passionate, talented
            workforce.
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
              Formal Recognition & BASIS Membership
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            Officially registered with RJSC, solidifying our legal foundation
            and opening doors for greater growth. Joined BASIS, reinforcing our
            commitment to Bangladesh’s expanding IT sector and the local tech
            ecosystem.
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
              Our Story Begins
            </span>
          </div>
          <p className="paragraph text-gray-300 font-medium ">
            Skylark Soft launched with a passionate 5-member team, dedicated to
            crafting specialized software solutions for the garments industry.
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
