import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { developmentProjects } from "../../data";
import DevelopmentProjectCard from "./DevelopmentProjectCard.component";

// Group projects into slides of 6
const groupProjectsIntoSlides = (projects, itemsPerSlide) => {
  const slides = [];
  for (let i = 0; i < projects.length; i += itemsPerSlide) {
    slides.push(projects.slice(i, i + itemsPerSlide));
  }
  return slides;
};

const DevelopmentProject = () => {
  const slides = groupProjectsIntoSlides(developmentProjects, 6);

  return (
    <div className="container relative mx-auto px-4 md:px-8 py-8 md:py-12">
      <style>
        {`
          .development-swiper .swiper-pagination {
            position: relative;
            margin-top: 40px;
            display: flex;
            justify-content: center;
            gap: 8px;
          }
          
          .development-swiper .swiper-pagination-bullet {
            width: 30px;
            height: 8px;
            border-radius: 4px;
            background: #ffffff;
            opacity: 1;
            transition: all 0.3s ease;
          }
          
          .development-swiper .swiper-pagination-bullet-active {
            background: #009866;
           
          }
        `}
      </style>

      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        className="development-swiper"
      >
        {slides.map((slideProjects, slideIdx) => (
          <SwiperSlide key={slideIdx}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {slideProjects.map((project, idx) => (
                <DevelopmentProjectCard key={idx} {...project} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DevelopmentProject;
