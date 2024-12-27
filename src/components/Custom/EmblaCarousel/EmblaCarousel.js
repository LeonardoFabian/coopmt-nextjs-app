import styles from "./EmblaCarousel.module.scss";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import Link from "next/link";
import { map } from "lodash";
import { Shared } from "@/components/Shared";
import { Block } from "@/components/Block";
import { Button, Container } from "semantic-ui-react";
import { BlockRenderer } from "@/components/BlockRenderer";
import classNames from "classnames";
import { ENV } from "@/utils";
// import useEmblaCarousel from "embla-carousel-react/components/useEmblaCarousel";

export function EmblaCarousel({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnFocusIn: true }),
    Fade(),
  ]);

  console.log("Slides: ", slides);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleMouseEnter = () => {
    // detener el autoplay al pasar el mouse por encima del carrusel
    emblaApi?.plugins().autoplay?.stop();
  };

  const handleMouseLeave = () => {
    // detener el autoplay al pasar el mouse por encima del carrusel
    emblaApi?.plugins().autoplay?.play();
  };

  return (
    <>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          <>
            {map(slides, (slide) => (
              <div
                key={`embla-carousel-${slide.id}`}
                className={styles.emblaSlide}
                style={{
                  background: `linear-gradient(135deg, hsl(128, 51%, 47%, 0.85), hsl(45, 100%, 54%, 0.45)), url(${ENV.SERVER_HOST}${slide?.image?.url}) no-repeat center center / cover`,
                }}
              >
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                {/* {slide?.image?.url && (
              
                <Shared.Image
                  src={slide.image.url}
                  alt="Background"
                  className={styles.background}
                />
           
         
                
              )} */}
                <Container isContainer className={styles.wrapper}>
                  <div className={styles.content}>
                    {slide?.heading && (
                      <h1
                        className={classNames(styles.heading, {
                          [styles.light]: slide?.textColor === "light",
                          [styles.primary]: slide?.textColor === "primary",
                          [styles.accent]: slide?.textColor === "accent",
                        })}
                      >
                        {slide.heading}
                      </h1>
                    )}
                    {slide?.subheading && (
                      <h5
                        className={classNames(styles.subheading, {
                          [styles.light]: slide?.textColor === "light",
                          [styles.primary]: slide?.textColor === "primary",
                          [styles.accent]: slide?.textColor === "accent",
                        })}
                      >
                        {slide.subheading}
                      </h5>
                    )}
                    <div className={styles.actions}>
                      {map(slide.blocks, (block) => {
                        switch (block.__component) {
                          case "components.link":
                            return (
                              <Block.Link
                                key={`embla-carousel-link-${block.id}`}
                                block={block}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                              />
                            );
                            break;
                          case "components.page-link":
                            return (
                              <Block.PageLink
                                key={`embla-carousel-page-link-${block.id}`}
                                block={block}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                              />
                            );
                            break;
                          default:
                            return null;
                            break;
                        }
                      })}
                    </div>
                  </div>
                </Container>
              </div>
            ))}
          </>
        </div>
      </div>
      {/* <button className={styles.emblaPrev} onClick={scrollPrev}>
        Prev
      </button>
      <button className={styles.emblaNext} onClick={scrollNext}>
        Next
      </button> */}
    </>
  );
}
