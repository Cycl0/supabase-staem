import React, { useState, useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
  A11y,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MakeAnimated } from "../Animation/animation";
import "swiper/scss";
import "swiper/scss/pagination";
import "./carousel.scss";

function Carousel(props) {
  const { games } = props;
  const [swiper, setSwiper] = useState();
  useEffect(() => {
    setSwiper(document.querySelector(".swiper").swiper);
  }, []);

  const [isCurrent, setIsCurrent] = useState(true);

  const size = useWindowSize();

  const activeSlide = (game) => {
    return (
      <div
        className="w-0 min-w-[51.3rem] transition-all duration-300 ease-linear opacity-90 hover:opacity-100 hover:scale-105"
        style={size.width <= 920 ? { minWidth: size.width * 0.8 + "px" } : {}}
      >
        <MakeAnimated
          className="slider-container"
          animation="flash"
          color="#fff"
          size={20}
          delay={500}
          action={() => {
            if (isCurrent) {
              window.open(game.link);
            }
          }}
        >
          <img
            src={game.image}
            alt={game.title}
            className="w-full object-cover rounded-3xl select-none transiton-all duration-300 ease-linear"
            style={{
              boxShadow: "0px 13px 50px 6px hsl(0deg 0% 0% / 0.34)",
            }}
            draggable="false"
          />
        </MakeAnimated>
      </div>
    );
  };

  const nextSlide = (game) => {
    return (
      <div
        onClick={() => {
          swiper.slideNext(500);
        }}
        className="w-0 min-w-[51.3rem] transiton-all duration-300 ease-linear"
        style={size.width <= 920 ? { minWidth: size.width * 0.8 + "px" } : {}}
      >
        <img
          src={game.image}
          alt={game.title}
          className="w-full object-cover rounded-3xl opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-linear select-none"
          draggable="false"
        />
      </div>
    );
  };

  const prevSlide = (game) => {
    return (
      <div
        onClick={() => {
          swiper.slidePrev(500);
        }}
        className="w-0 min-w-[51.3rem] transiton-all duration-300 ease-linear"
        style={size.width <= 920 ? { minWidth: size.width * 0.8 + "px" } : {}}
      >
        <img
          src={game.image}
          alt={game.title}
          className="w-full object-cover rounded-3xl opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-linear select-none"
          draggable="false"
        />
      </div>
    );
  };

  const SLIDE_WIDTH_HEIGHT_RATIO = 0.467375;

  return (
    <Swiper
      effect="coverflow"
      modules={[Autoplay, Navigation, Pagination, EffectCoverflow, A11y]}
      slidesPerView={3}
      spaceBetween={470}
      rewind={true}
      //autoplay={{
      //delay: 3500,
      //disableOnInteraction: false,
      //pauseOnMouseEnter: true,
      //}}
      onSlideChange={() => {
        setIsCurrent(false);
        // wait for animation to finish
        setTimeout(() => {
          setIsCurrent(true);
        }, 500);
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
      className="w-[130rem] h-auto xl:m-10 sm:m-0 cursor-grab select-none"
      // duplicating style objects otherwise values won't be updated
      style={size.width <= 920 ? {
          // setting dynamic slide minHeight from slide width (80% of the screen width)
          minHeight: size.width * 0.8 * SLIDE_WIDTH_HEIGHT_RATIO + "px",
          overflow: "visible",
          left: "49%",
          transform: "translateX(-50.7%)",
      } : {
          // setting minHeight to avoid the carousel to be too small and screwing up the layout
          minHeight: 383.63 + "px",
          overflow: "visible",
          left: "49%",
          transform: "translateX(-50.7%)",
      }}
    >
      {games.map((game, index) => {
        return (
          <MakeAnimated animation="ripple" color="#fff" size={2} delay={500}>
            <SwiperSlide
              key={index}
              className="cursor-pointer h-full flex justify-center items-center"
            >
              {({ isActive, isNext, isVisible }) => {
                if (isVisible) {
                  if (isActive) {
                    return activeSlide(game);
                  } else if (isNext) {
                    return nextSlide(game);
                  } else {
                    return prevSlide(game);
                  }
                }
              }}
            </SwiperSlide>
          </MakeAnimated>
        );
      })}
    </Swiper>
  );
}

export default Carousel;
