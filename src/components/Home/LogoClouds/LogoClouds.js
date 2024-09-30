import styles from "./LogoClouds.module.scss";
import { Shared, Image } from "@/components/Shared";
import { Container } from "semantic-ui-react";
import { map } from "lodash";
import Link from "next/link";
import Slider from "react-slick";

export function LogoClouds(props) {
  const { suppliers, heading, subheading } = props;

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    dots: true,
    // dotsClass: styles.dots,
    // arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
    // initialSlide: 0,
    // customPaging: function (index) {
    //   return <Shared.Image src={banners[index].image.url} />;
    // },
  };

  return (
    <Container fluid className={styles.logoClouds}>
      <Container isContainer className={styles.wrapper}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>

        <div className={styles.content}>
          <Slider {...settings}>
            {map(suppliers, (supplier) => (
              <Link
                key={supplier?.id}
                href={`/afiliados/${supplier.slug}`}
                target="_self"
                className={styles.link}
              >
                <Shared.Image
                  src={supplier?.logo?.url}
                  alt={supplier?.logo?.alternativeText || "Imagen"}
                  title={supplier?.name}
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
