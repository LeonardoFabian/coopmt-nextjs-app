import styles from "./EmblaCarouselThumbs.module.scss";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback } from "react";
import { Thumb } from "./Thumb";
import { map } from "lodash";
import { Shared } from "@/components/Shared";

export function EmblaCarouselThumbs(props) {
  console.log("EmblaCarouselThumbs props: ", props);
  const { slides, options } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSlide, setSelectedSlide] = useState([]);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      //   alert(index);
      if (!emblaMainApi || !emblaThumbsApi) return emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi)
      return setSelectedIndex(emblaMainApi?.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((slide, index) => {
            console.log("EmblaMainRef index: ", index);

            return (
              <div className="embla__slide" key={selectedIndex}>
                <div className="embla__slide__number">
                  <Shared.Image src={slide?.attributes?.url} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((slide, index) => {
              console.log("Thumb index: ", index);
              return (
                <Thumb
                  key={index}
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
