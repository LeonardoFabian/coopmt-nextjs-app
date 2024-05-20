import styles from "./ProductGallery.module.scss";
import { Custom } from "@/components/Custom";

export function ProductGallery(props) {
  console.log("ProductGallery props: ", props);
  const { slides, video, options } = props;

  return (
    <>
      {/* <Custom.EmblaCarouselThumbs slides={slides} options={options} /> */}
      <Custom.SwiperThumbs slides={slides} video={video} />
    </>
  );
}
