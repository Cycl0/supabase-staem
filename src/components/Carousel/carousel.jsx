import React, { useState, useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import "./carousel.scss";

function Carousel(props) {
  const { games } = props;
  const [swiper, setSwiper] = useState();
  useEffect(() => {
    setSwiper(document.querySelector(".swiper").swiper);
  }, []);

  const size = useWindowSize();
  const offsetTranslate = 21 - (size.width / 64 - 20) + 6310 / size.width;

  return (
    <Swiper
      effect="coverflow"
      modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
      slidesPerView={3}
      spaceBetween={250}
      rewind={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={500}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="w-[130rem] mt-10 cursor-grab h-96 select-none"
      style={{
        overflowX: "clip",
        overflowY: "visible",
        transform: `translateX(-${offsetTranslate}%)`,
      }}
    >
      {games.map((game, index) => {
        return (
          <SwiperSlide
            key={index}
            className="cursor-pointer h-full flex justify-center items-center"
          >
            {({ isActive, isNext, isVisible }) => {
              if (isVisible) {
                if (isActive) {
                  return (
                    <div
                      onClick={() => window.open(game.link)}
                      className="min-w-[51.3rem] h-full transition-all duration-300 ease-in-out opacity-90 hover:opacity-100 hover:scale-105"
                    >
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover rounded-3xl"
                        style={{
                          boxShadow: "0px 13px 50px 6px hsl(0deg 0% 0% / 0.34)",
                        }}
                      />
                    </div>
                  );
                } else if (isNext) {
                  return (
                    <div onClick={() => swiper.slideNext(500)} className="h-80">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover rounded-3xl opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out"
                      />
                    </div>
                  );
                } else {
                  return (
                    <div onClick={() => swiper.slidePrev(500)} className="h-80">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover rounded-3xl opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out"
                      />
                    </div>
                  );
                }
              }
            }}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Carousel;
