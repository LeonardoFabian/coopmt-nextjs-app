import styles from "./ServiceCover.module.scss";
import { Container, Button, Icon } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import Link from "next/link";
import { useApplication, useAuth } from "@/hooks";
import { useState } from "react";
import { useRouter } from "next/router";

export function ServiceCover(props) {
  const { serviceId, service } = props;
  const [loading, setLoading] = useState(false);
  console.log("ServiceCover service: ", service);

  const link = "#";
  const linkText = "Solicitar";
  const serviceTitle = service?.attributes?.title;
  const serviceSummary = service?.attributes?.summary;
  const imageUrl = service?.attributes?.featuredImage?.data?.attributes?.url;
  const imageAlt =
    service?.attributes?.featuredImage?.data?.attributes?.alternativeText;
  const category = service?.attributes?.category;
  const categoryName = category?.data?.attributes?.name;
  const categorySlug = category?.data?.attributes?.slug;
  const CTAs = service?.attributes?.cta;

  console.log("SERVICE COVER: ", service);

  // const { fillApplication } = useApplication();
  const { user } = useAuth();
  const router = useRouter();

  const handleUrl = (url) => {
    // setLoading(true);

    router.push(url);

    // if (!user) {
    //   router.push("/auth/login");
    //   return null;
    // }

    // fillApplication(user.id, serviceId);

    // setTimeout(() => {
    //   setLoading(false);
    // }, 500);
  };

  return (
    <Container fluid className={styles.serviceCover}>
      <Shared.Image
        src={imageUrl}
        className={styles.background}
        alt={imageAlt}
      />
      <Container isContainer className={styles.contentWrapper}>
        <div className={styles.header}>
          <Link href={`/categories/${categorySlug}`}>
            <span className={styles.label}>{categoryName}</span>
          </Link>
          <h1 className={styles.heading}>{serviceTitle}</h1>
        </div>
        <p className={styles.subheading}>{serviceSummary}</p>

        {CTAs?.length > 0 && (
          <div className={styles.actions}>
            {CTAs?.map((cta) => (
              <Button
                primary
                fluid
                onClick={() => handleUrl(cta.url)}
                loading={loading}
              >
                <span>{cta.label}</span> <Icon name="arrow right"></Icon>
              </Button>
            ))}
          </div>
        )}
      </Container>
    </Container>
  );
}
