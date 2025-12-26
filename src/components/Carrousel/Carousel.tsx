import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/swiper-bundle.css";

import styles from "./Carousel.module.css";

import { Card } from "../Card/Card";
import { data } from "@/assets/data";

export const Carousel = () => {
  const offer = data.diplomados.filter((i) => i.status === "Ofertados");

  return (
    <div className={styles.carouselContainer}>
      <Swiper
        className={styles.carousel}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        centeredSlides={true}
        spaceBetween={-40}
        grabCursor
        loop
        slidesPerView={"auto"}
      >
        {offer.map((item) => (
          <SwiperSlide key={item.to}>
            <Card
              img={item.img}
              cost={item.price}
              variant={"Main"}
              to={item.to}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
