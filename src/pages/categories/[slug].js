import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";
import Link from "next/link";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Category as CategoryCtrl, Service } from "@/api";
import { useRouter } from "next/router";
import { size, map } from "lodash";
import { notFound } from "next/navigation";

export default function CategoryPage(props) {
  const router = useRouter();
  const { category, services, pagination } = props;
  console.log("CategoryPage props: ", props);
  const hasServices = size(services) > 0;

  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  const title = category?.attributes?.name;
  const description = category?.attributes?.description || "";

  return (
    <>
      <Shared.Seo title={title} description={description} />
      <RootLayout>
        <Shared.PageHeader title={category?.attributes?.name} />
        <Container isContainer>
          <Shared.Separator height={54} />
          {hasServices ? (
            <>
              <Shared.Grid cols={3} gap="30px">
                {map(services, (service) => {
                  console.log("service: ", service);
                  return (
                    <Link
                      key={service?.id}
                      href={`/services/${service?.attributes?.slug}`}
                    >
                      <Custom.ServiceCard
                        title={service?.attributes?.title}
                        icon={service?.attributes?.icon?.icons}
                      />
                    </Link>
                  );
                })}
              </Shared.Grid>
              <Shared.Separator height={54} />
              <Shared.Pagination
                currentPage={pagination?.page}
                totalPages={pagination?.pageCount}
              />
            </>
          ) : (
            <Shared.NoResult
              text={`La categoría ${category?.attributes?.name} aun no tiene servicios.`}
            />
          )}
          <Shared.Separator height={54} />
        </Container>
      </RootLayout>
    </>
  );
}

export async function getStaticPaths() {
  const categoryController = new CategoryCtrl();
  try {
    const categories = await categoryController.find();

    if (!categories?.data || categories?.data?.length === 0) {
      // return { notFound: true };
      console.warn("Categories not found");
      return {
        paths: [],
        fallback: true,
      };
      // throw new Error("Categories not found");
    }

    const paths = categories?.data?.map((category) => ({
      params: { slug: category?.attributes?.slug },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.log("Error al obtener las categorías: ", error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }) {
  const categoryController = new CategoryCtrl();
  const serviceController = new Service();

  try {
    const categoryData = await categoryController.getBySlug(params.slug);

    if (!categoryData?.data || categoryData?.data?.length === 0) {
      return { notFound: true };
      // throw new Error("Category not found");
    }

    console.log("categoryData: ", categoryData);

    const services = await serviceController.getByCategory(
      categoryData?.data[0]?.attributes?.slug || "",
      1
    );
    console.log("services: ", services);

    return {
      props: {
        category: categoryData.data[0],
        services: services?.data || [],
        pagination: services.meta.pagination || {},
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error getting category: ", error);
    return {
      notFound: true,
    };
  }
}
