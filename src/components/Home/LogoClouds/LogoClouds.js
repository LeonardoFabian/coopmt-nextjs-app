import styles from "./LogoClouds.module.scss";
import { Shared, Image } from "@/components/Shared";
import { Container } from "semantic-ui-react";
import { map } from "lodash";
import Link from "next/link";
import Slider from "react-slick";

export function LogoClouds({ block }) {
  const { heading, subheading, banners } = block;

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    dots: true,
    // dotsClass: styles.dots,
    // arrows: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
    // initialSlide: 0,
    // customPaging: function (index) {
    //   return <Shared.Image src={banners[index].image.url} />;
    // },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <Container fluid className={styles.logoClouds}>
      <Container isContainer className={styles.wrapper}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>

        <div className={styles.content}>
          {/* <Shared.Grid cols="5" gap="30px">
            {map(banners, (banner) => (
              <Link
                key={banner?.id}
                href={banner?.url}
                target={banner?.target || "_self"}
                className={styles.link}
              >
                <Shared.Image
                  src={banner?.image?.url}
                  alt={banner?.image?.alternativeText || "Banner"}
                  title={banner?.title}
                  className={styles.image}
                  height={80}
                />
              </Link>
            ))}
          </Shared.Grid> */}
          <Slider {...settings}>
            {map(banners, (banner) => (
              <Link
                key={banner?.id}
                href={banner?.url}
                target={banner?.target || "_self"}
                className={styles.link}
              >
                <Shared.Image
                  src={banner?.image?.url}
                  alt={banner?.image?.alternativeText || "Banner"}
                  title={banner?.title}
                  className={styles.logoImage}
                  height={80}
                />
              </Link>
            ))}
          </Slider>
        </div>
      </Container>
    </Container>
  );
}
