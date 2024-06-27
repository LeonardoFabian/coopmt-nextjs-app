import styles from "./FeaturedServices.module.scss";
import { Container, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { Service } from "@/api";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";
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
          <Shared.Grid cols="3" gap="30px" className={styles.servicesWrapper}>
            {map(featuredServices, (service) => (
              <Link
                key={service?.id}
                href={`/servicios/${service?.attributes?.category?.data?.attributes?.slug}/${service?.attributes?.slug}`}
              >
                <Custom.ServiceCard title={service?.attributes?.title} />
              </Link>
            ))}
          </Shared.Grid>
        </div>
        <div className={styles.actions}>
          <Link
            href={link?.url || "/servicios"}
            target={link?.target || "_self"}
          >
            <Button secondary>{link?.label}</Button>
          </Link>
        </div>
      </Container>
    </Container>
  );
}
