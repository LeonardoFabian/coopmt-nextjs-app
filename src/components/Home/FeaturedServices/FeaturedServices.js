import styles from "./FeaturedServices.module.scss";
import { Container, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { Service } from "@/api";
import { Shared } from "@/components/Shared";
import { map } from "lodash";
import Link from "next/link";

const serviceController = new Service();

export function FeaturedServices({ data }) {
  const { heading, subheading, link } = data;

  const [featuredServices, setFeaturedServices] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await serviceController.find();
        console.log("FEATURED SERVICES: ", response);
        setFeaturedServices(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Container fluid className={styles.featuredServices}>
      <Container isContainer className={styles.wrapper}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subHeading}>{subheading}</p>

        <div className={styles.content}>
          <Shared.Grid cols="3" gap="30px">
            {map(featuredServices, (featuredService) => (
              <Shared.Card
                key={featuredService?.id}
                title={featuredService?.attributes?.title}
              />
            ))}
          </Shared.Grid>
        </div>
        <div className={styles.actions}>
          <Link href={link?.url || "/"} target={link?.target || "_self"}>
            <Button primary>{link?.label}</Button>
          </Link>
        </div>
      </Container>
    </Container>
  );
}
