import styles from "./ProductGallery.module.scss";
import { Custom } from "@/components/Custom";

export function ProductGallery(props) {
  const { slides, options } = props;

  return (
    <>
      {/* <Custom.EmblaCarouselThumbs slides={slides} options={options} /> */}
      <Custom.SwiperThumbs slides={slides} />
    </>
  );
}
