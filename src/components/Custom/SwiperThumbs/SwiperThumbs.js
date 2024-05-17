import styles from "./SwiperThumbs.module.scss";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import { Shared } from "@/components/Shared";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export function SwiperThumbs(props) {
  const { slides } = props;
  console.log("SwiperThumbs slides: ", slides);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log("thumbsSwiper: ", thumbsSwiper);

  return (
    <>
      <Swiper
        style={{ "--swiper-navigation-color": "#fff" }}
        spaceBetween={10}
        navigation={true}
        modules={[FreeMode, Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className={styles.mainSwiper}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className={styles.mainSwiperSlide}>
            <Shared.Image src={slide.attributes.url} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.swiperThumbs}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className={styles.swiperSlideThumb}>
            <Shared.Image src={slide.attributes.formats.thumbnail.url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
