import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const slides = [
    {
      title: "Discover Ancient Treasures",
      text: "Explore rare historical artifacts from different civilizations.",
      image:
        "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?q=80&w=1200",
    },

    {
      title: "Track Priceless History",
      text: "Learn about the origin, discovery, and present location of artifacts.",
      image:
        "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1200",
    },

    {
      title: "Preserve Cultural Heritage",
      text: "Add your own artifact records and contribute to historical knowledge.",
      image:
        "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=1200",
    },
  ];

  return (
    <div className="mb-16 mt-16">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3500,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className="rounded-3xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[520px] bg-cover bg-center flex items-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${slide.image})`,
              }}
            >
              <div className="max-w-3xl px-8 md:px-16 text-white">
                <motion.h1
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl font-extrabold mb-5"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl mb-8"
                >
                  {slide.text}
                </motion.p>

                <motion.button
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="btn bg-yellow-500 hover:bg-yellow-600 border-none text-black font-bold px-8"
                >
                  Explore Now
                </motion.button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;