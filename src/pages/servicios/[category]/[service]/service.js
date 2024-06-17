import { RootLayout } from "@/layouts";
import { Shared } from "@/components/Shared";
import { Service } from "@/components/Service";
import { Container } from "semantic-ui-react";
import { BlockRenderer } from "@/components/BlockRenderer";
import { ServiceProvider } from "@/contexts";

export default function SingleService(props) {
  console.log("SingleService props: ", props);
  const { service } = props;
  const title = service?.attributes?.title;
  const summary = service?.attributes?.summary;
  const description = service?.attributes?.description;
  const imageSrc =
    service?.attributes?.featuredImage?.data?.attributes?.formats?.large?.url;
  const category = service.attributes.category.data.attributes.name;
  const categoryLink = `/servicios/${service.attributes.category.data.attributes.slug}`;
  const blocks = service?.attributes?.blocks;

  return (
    <>
      <ServiceProvider>
        <Shared.Seo title={title} description={description} />
        <RootLayout>
          <Service.ServiceCover
            heading={title}
            subheading={summary}
            label={category}
            labelPermalink={categoryLink}
            imageSrc={imageSrc}
            link="#"
            linkText="Solicitar"
          />
          <Shared.Separator height={54} />
          <Container isContainer>
            <h5>Descripción</h5>
            <Shared.Separator height={30} />
            <p>{description}</p>
            <Shared.Separator height={54} />
            <BlockRenderer blocks={blocks} />
          </Container>
          <Shared.Separator height={54} />
        </RootLayout>
      </ServiceProvider>
    </>
  );
}
