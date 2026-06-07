import AnimatedDots from "./AnimateDots";
import Earth from "./Globe";
import Marquee from "./Marquee";

const logoModules = import.meta.glob(
  "/src/assets/client-logo/*.png",
  { eager: true }
);
const clientLogos = Object.entries(logoModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, mod]) => mod.default);

const logosRow1 = clientLogos.slice(0, 10);
const logosRow2 = clientLogos.slice(10);

function ClientFeedback() {
  return (
    <>
      <section className="relative -mt-0  h-full min-h-screen   py-14 bg-primary text-white">
        <div>
          <div>
            <h1 className=" text-center text-4xl  text-white">
              A dynamic partner helping <br />
              businesses achieve sustainable growth
            </h1>
          </div>
          <div class=" flex items-center justify-between max-2xl:w-full  max-md:mt-5 md:gap-5">
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

        <div className="absolute top-80 md:top-48 flex justify-center w-full">
          <div className="absolute h-fit w-fit ">
            <AnimatedDots />
          </div>
          <Earth className="max-w-[500px] z-0 " />
        </div>
        <div className="relative z-2 sm:pt-28 pt-24">
          <Marquee reverse={false} pauseOnHover className="[--duration:40s]">
            {logosRow1.map((logo, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3 flex items-center justify-center w-56 h-32 mx-3 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <img
                  src={logo}
                  alt={`client-${i + 1}`}
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
            ))}
          </Marquee>
          <Marquee pauseOnHover reverse={true} className="[--duration:40s] mt-5">
            {logosRow2.map((logo, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3 flex items-center justify-center w-56 h-32 mx-3 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <img
                  src={logo}
                  alt={`client-${i + 11}`}
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </section>
    </>
  );
}

export default ClientFeedback;
