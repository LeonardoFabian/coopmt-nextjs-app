import styles from "./HeroSection.module.scss";
import Link from "next/link";
import { Container, Button } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";
import classNames from "classnames";
import { useState, useEffect } from "react";

export function HeroSection({ block }) {
  //   const { heading, subheading, image, link } = block;
  const { slides } = block;
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  if (!block) return null;

  // detect mobile or tablet screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768); // change to true if you want to show the menu on mobile screens
    };

    handleResize(); // call once on component mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={classNames(styles.heroSection, {
        ["ui"]: !isMobileScreen,
        ["fluid"]: !isMobileScreen,
        ["container"]: !isMobileScreen,
      })}
    >
      <>
        {
          <Custom.EmblaCarousel slides={slides?.data} />

          /* <Shared.Image
        src={image.url}
        alt="Background"
        className={styles.background}
      />
      <Container isContainer className={styles.wrapper}>
        <div className={styles.content}>
          <h1>{heading}</h1>
          <h5>{subheading}</h5>
          <Link href={link.url}>
            <Button primary>{link.label}</Button>
          </Link>
        </div>
      </Container> */
        }
      </>
    </div>
  );
}
