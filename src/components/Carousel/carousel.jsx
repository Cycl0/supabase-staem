import React, { useState, useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
  A11y,
} from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
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

  const [isCurrent, setIsCurrent] = useState(false);

  const size = useWindowSize();

  const activeSlide = (game) => {
    return (
      <div className="min-w-[51.3rem] h-full transition-all duration-300 ease-in-out opacity-90 hover:opacity-100 hover:scale-105">
        <MakeAnimated
          className="slider-container"
          animation="flash"
          color="#fff"
          size={20}
          delay={500}
          action={() => {
            if (isCurrent) {
              window.open(game.link);
            } else {
              // wait for animation to finish
              setTimeout(() => {
                setIsCurrent(true);
              }, 500);
            }
          }}
        >
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover rounded-3xl select-none"
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
        className="h-80"
      >
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover rounded-3xl opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out select-none"
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
        className="h-80"
      >
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover rounded-3xl opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out select-none"
          draggable="false"
        />
      </div>
    );
  };

  return (
    <Swiper
      effect="coverflow"
      modules={[Autoplay, Navigation, Pagination, EffectCoverflow, A11y]}
      slidesPerView={3}
      spaceBetween={250}
      rewind={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      onSlideChange={() => {
        setIsCurrent(false);
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
        overflow: "visible",
        left: "49%",
        transform: "translateX(-50.7%)",
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
                  return <MakeAnimated>{activeSlide(game)}</MakeAnimated>;
                } else if (isNext) {
                  return nextSlide(game);
                } else {
                  return prevSlide(game);
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
