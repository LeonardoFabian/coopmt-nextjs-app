import styles from "./Gallery.module.scss";
import Lightbox from "yet-another-react-lightbox";
import { useState } from "react";
import { Shared } from "@/components/Shared";
import { ENV } from "@/utils";

export function Gallery({ images }) {
  console.log("Gallery props: ", images);

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [];
  images.forEach((image) => {
    slides.push({
      src: `${ENV.SERVER_HOST}${image?.attributes?.url}`,
      alt: image?.attributes?.alternativeText,
    });
  });

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <>
      <div className={styles.gallery}>
        {slides.length > 0 &&
          slides.map((slide, index) => (
            <Shared.Image
              key={index}
              src={slide.src}
              alt={slide.alt}
              onClick={() => handleImageClick(index)}
            />
          ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={currentIndex}
      />
    </>
  );
}
