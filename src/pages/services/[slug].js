import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Service as ServiceCtrl } from "@/api";
import { Service as ServiceComponent } from "@/components/Service";

import { useRouter } from "next/router";

export default function Service({ service }) {
  const router = useRouter();
  // const { serviceData } = props;

  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  const title = service?.attributes?.title;
  const description = service?.attributes?.description || "";
  const blocks = service?.attributes?.blocks;

  return (
    <>
      <Shared.Seo title={title} description={description} />
      <RootLayout>
        <ServiceComponent.ServiceCover
          serviceId={service?.id}
          service={service}
        />
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
    </>
  );
}

export async function getStaticPaths() {
  const serviceController = new ServiceCtrl();
  try {
    const services = await serviceController.find();

    if (!services?.data || services.data.length === 0) {
      // return { notFound: true };
      // throw new Error("Services not found");
      console.warn("Services not found");
      return {
        paths: [],
        fallback: true,
      };
    }

    const paths = services?.data?.map((service) => ({
      params: {
        slug: service.attributes.slug,
      },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.log("Error al obtener los servicios: ", error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }) {
  const serviceController = new ServiceCtrl();
  try {
    const serviceData = await serviceController.getBySlug(params.slug);

    if (!serviceData?.data || serviceData?.data?.length === 0) {
      return { notFound: true };
      // throw new Error("Service not found");
    }

    console.log("serviceData: ", serviceData);

    return {
      props: {
        service: serviceData.data[0],
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error getting service: ", error);
    return {
      notFound: true,
    };
  }
}
