import styles from "./EmblaCarousel.module.scss";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { map } from "lodash";
import { Shared } from "@/components/Shared";
import { Block } from "@/components/Block";
import { Button, Container } from "semantic-ui-react";
import { BlockRenderer } from "@/components/BlockRenderer";
// import useEmblaCarousel from "embla-carousel-react/components/useEmblaCarousel";

export function EmblaCarousel({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {map(slides, (slide) => (
            <div
              key={`embla-carousel-${slide.id}`}
              className={styles.emblaSlide}
            >
              {slide?.image?.url && (
                <Shared.Image
                  src={slide.image.url}
                  alt="Background"
                  className={styles.background}
                />
              )}
              <Container isContainer className={styles.wrapper}>
                <div className={styles.content}>
                  {slide?.heading && (
                    <h1 className={styles.heading}>{slide.heading}</h1>
                  )}
                  {slide?.subheading && (
                    <h5 className={styles.subheading}>{slide.subheading}</h5>
                  )}
                  <div className={styles.actions}>
                    {map(slide.blocks, (block) => {
                      switch (block.__component) {
                        case "components.link":
                          return (
                            <Block.Link
                              key={`embla-carousel-link-${block.id}`}
                              block={block}
                            />
                          );
                          break;
                        case "components.page-link":
                          return (
                            <Block.PageLink
                              key={`embla-carousel-page-link-${block.id}`}
                              block={block}
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
