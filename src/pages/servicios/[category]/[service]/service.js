import { RootLayout } from "@/layouts";
import { Shared } from "@/components/Shared";
import { Service } from "@/components/Service";
import { Container } from "semantic-ui-react";

export default function SingleService(props) {
  console.log("SingleService props: ", props);
  const { service } = props;
  const title = service?.attributes?.title;
  const description = service?.attributes?.description;
  const imageSrc =
    service?.attributes?.featuredImage?.data?.attributes?.formats?.large?.url;
  const category = service.attributes.category.data.attributes.name;
  const categoryLink = `/servicios/${service.attributes.category.data.attributes.slug}`;

  return (
    <>
      <Shared.Seo title={title} description={description} />
      <RootLayout>
        <Service.ServiceCover
          heading={title}
          subheading={description}
          label={category}
          labelPermalink={categoryLink}
          imageSrc={imageSrc}
          link="#"
          linkText="Solicitar"
        />
        <Shared.Separator height={54} />
        <Container isContainer>
          <h3>Descripción</h3>
          <Shared.Separator height={30} />
          <p>{description}</p>
        </Container>
        <Shared.Separator height={54} />
      </RootLayout>
    </>
  );
}
