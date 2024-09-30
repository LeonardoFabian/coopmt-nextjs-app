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
  const description = service?.attributes?.description || "";
  const blocks = service?.attributes?.blocks;

  return (
    <>
      <ServiceProvider>
        <Shared.Seo title={title} description={description} />
        <RootLayout>
          <Service.ServiceCover serviceId={service?.id} service={service} />
          <Shared.Separator height={54} />
          <Container isContainer>
            {description && (
              <>
                <h5>Descripción</h5>
                <Shared.Separator height={30} />
                <p>{description}</p>
              </>
            )}
            <Shared.Separator height={54} />
            <BlockRenderer blocks={blocks} />
          </Container>
          <Shared.Separator height={54} />
        </RootLayout>
      </ServiceProvider>
    </>
  );
}
