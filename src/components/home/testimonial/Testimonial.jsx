import { Quote } from "lucide-react";
import AnimatedDots from "./AnimateDots";
import Earth from "./Globe";
import Marquee from "./Marquee";

const image1 =
  "https://images.unsplash.com/photo-1670008604236-f5f2b23722ef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1441";
const logo =
  "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png";

const testimonials = [
  {
    id: 1,
    name: "Mark Ramirez",
    logo: logo,
    title: "Owner of Lotus Spa",
    content:
      "Their team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding, they've helped us create a cohesive and compelling brand identity.",
    rating: 5,
    image: image1,
  },
  {
    id: 2,
    name: "Thomas Gala",
    logo: logo,
    title: "Founder, Earthish Wellness",
    content:
      "As a fellow creative professional, I have high standards when it comes to design. Kelola not only met but exceeded those standards. Kelola also optimized it for a seamless user experience.",
    rating: 4,
    image: image1,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    logo: logo,
    title: "CEO, Harmony Health",
    content:
      "Their team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding, they've helped us create a cohesive and compelling brand identity.",
    rating: 5,
    image: image1,
  },
  {
    id: 3,
    name: "Steven Sunny",
    logo: logo,
    title: "CEO, Charles Health",
    content:
      "Their team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding, they've helped us create a cohesive and compelling brand identity.",
    rating: 5,
    image: image1,
  },
  {
    id: 1,
    name: "Mark Ramirez",
    logo: logo,
    title: "Owner of Lotus Spa",
    content:
      "Their team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding, they've helped us create a cohesive and compelling brand identity.",
    rating: 5,
    image: image1,
  },
  {
    id: 2,
    name: "Thomas Gala",
    logo: logo,
    title: "Founder, Earthish Wellness",
    content:
      "As a fellow creative professional, I have high standards when it comes to design. Kelola not only met but exceeded those standards. Kelola also optimized it for a seamless user experience.",
    rating: 4,
    image: image1,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    logo: logo,
    title: "CEO, Harmony Health",
    content:
      "Their team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding, they've helped us create a cohesive and compelling brand identity.",
    rating: 5,
    image: image1,
  },
  {
    id: 3,
    name: "Steven Sunny",
    logo: logo,
    title: "CEO, Charles Health",
    content:
      "Their team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding, they've helped us create a cohesive and compelling brand identity.",
    rating: 5,
    image: image1,
  },
  {
    id: 1,
    name: "Mark Ramirez",
    logo: logo,
    title: "Owner of Lotus Spa",
    content:
      "Their team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding, they've helped us create a cohesive and compelling brand identity.",
    rating: 5,
    image: image1,
  },
  {
    id: 2,
    name: "Thomas Gala",
    logo: logo,
    title: "Founder, Earthish Wellness",
    content:
      "As a fellow creative professional, I have high standards when it comes to design. Kelola not only met but exceeded those standards. Kelola also optimized it for a seamless user experience.",
    rating: 4,
    image: image1,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    logo: logo,
    title: "CEO, Harmony Health",
    content:
      "Their team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding, they've helped us create a cohesive and compelling brand identity.",
    rating: 5,
    image: image1,
  },
  {
    id: 3,
    name: "Steven Sunny",
    logo: logo,
    title: "CEO, Charles Health",
    content:
      "Their team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding, they've helped us create a cohesive and compelling brand identity.",
    rating: 5,
    image: image1,
  },
  {
    id: 1,
    name: "Mark Ramirez",
    logo: logo,
    title: "Owner of Lotus Spa",
    content:
      "Their team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding, they've helped us create a cohesive and compelling brand identity.",
    rating: 5,
    image: image1,
  },
  {
    id: 2,
    name: "Thomas Gala",
    logo: logo,
    title: "Founder, Earthish Wellness",
    content:
      "As a fellow creative professional, I have high standards when it comes to design. Kelola not only met but exceeded those standards. Kelola also optimized it for a seamless user experience.",
    rating: 4,
    image: image1,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    logo: logo,
    title: "CEO, Harmony Health",
    content:
      "Their team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding, they've helped us create a cohesive and compelling brand identity.",
    rating: 5,
    image: image1,
  },
  {
    id: 3,
    name: "Steven Sunny",
    logo: logo,
    title: "CEO, Charles Health",
    content:
      "Their team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding, they've helped us create a cohesive and compelling brand identity.",
    rating: 5,
    image: image1,
  },
];

function ClientFeedback() {
  return (
    <>
      <section className="relative -mt-0  h-full min-h-screen   py-14 bg-primary text-white">
        <div>
          <div>
            <h1 className=" text-center text-4xl text-white">
              A dynamic partner helping <br />
              businesses achieve sustainable growth
            </h1>
          </div>
          <div class="flex items-center justify-between max-2xl:w-full max-md:mt-5 md:gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="440"
              height="35"
              viewBox="0 0 440 35"
              fill="none"
              class="mt-9 max-md:w-[80%]"
            >
              <path
                d="M0 34.4616H295.967C299.94 34.4616 303.822 33.2785 307.12 31.063L346.082 4.88779C349.38 2.67239 353.262 1.48926 357.235 1.48926H440"
                stroke="url(#paint0_linear_2916_1196)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_2916_1196"
                  x1="0"
                  y1="17.9754"
                  x2="502.5"
                  y2="17.9754"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#3F454B"></stop>
                  <stop offset="0.540323" stop-color="white"></stop>
                  <stop offset="1" stop-color="#3F454B"></stop>
                </linearGradient>
              </defs>
            </svg>
            <h5 class="px-2 py-2 text-center text-sm font-medium text-white max-md:w-[300%] md:whitespace-nowrap md:px-4 md:text-[17px]">
              Your trusted choice for building a sustainable &amp; successful
              business
            </h5>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="440"
              height="35"
              viewBox="0 0 440 35"
              fill="none"
              class="mt-9 max-md:w-[80%]"
            >
              <path
                d="M440 33.9723H144.033C140.06 33.9723 136.178 32.7892 132.88 30.5738L93.9179 4.39853C90.6203 2.18313 86.7375 1 82.7648 1H0"
                stroke="url(#paint0_linear_2916_1197)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_2916_1197"
                  x1="440"
                  y1="17.4862"
                  x2="-62.5"
                  y2="17.4862"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#3F454B"></stop>
                  <stop offset="0.540323" stop-color="white"></stop>
                  <stop offset="1" stop-color="#3F454B"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-2 right-0 top-0  mask-[radial-gradient(ellipse_40%_50%_at_50%_0%,#000_60%,transparent_110%)]"></div>

        <div className="absolute top-48 flex justify-center w-full">
          <div className="absolute h-fit w-fit ">
            <AnimatedDots />
          </div>
          <Earth className="max-w-[500px] z-0 " />
        </div>
        <div className="relative z-2 sm:pt-28 pt-24">
          <Marquee reverse={false} pauseOnHover className="[--duration:20s]">
            {testimonials?.map((testimonial) => (
              <>
                <div
                  key={testimonial.id}
                  className={`bg-neutral-950 border border-gray-900 sm:w-md w-[20rem] sm:p-6 p-3 rounded-xl transition-all duration-300`}
                >
                  <div className="flex mb-2">
                    <img
                      src={testimonial.logo}
                      alt={testimonial.logo}
                      className="w-28"
                    />
                  </div>
                  <p
                    className={`sm:text-sm text-xs mb-4 text-gray-300 flex gap-1 py-2`}
                  >
                    <Quote className="fill-gray-300 sm:w-5 sm:h-5 w-4 h-4 shrink-0 rotate-180" />
                    {testimonial.content}
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className={`font-medium text-white`}>
                        {testimonial.name}
                      </p>
                      <p className={`text-xs text-gray-400`}>
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </Marquee>
          <Marquee pauseOnHover reverse={true} className="[--duration:20s]">
            {testimonials?.map((testimonial) => (
              <>
                <div
                  key={testimonial.id}
                  className={`bg-neutral-950 border border-gray-900 sm:w-md w-[20rem] sm:p-6 p-3 rounded-xl transition-all duration-300`}
                >
                  <div className="flex mb-2">
                    <img
                      src={testimonial.logo}
                      alt={testimonial.logo}
                      className="w-28"
                    />
                  </div>
                  <p
                    className={`sm:text-sm text-xs mb-4 text-gray-300 flex gap-1 py-2`}
                  >
                    <Quote className="fill-gray-300 sm:w-5 sm:h-5 w-4 h-4 shrink-0 rotate-180" />
                    {testimonial.content}
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className={`font-medium text-white`}>
                        {testimonial.name}
                      </p>
                      <p className={`text-xs text-gray-400`}>
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </Marquee>
        </div>
      </section>
    </>
  );
}

export default ClientFeedback;
