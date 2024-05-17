import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { size, map } from "lodash";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";
import Link from "next/link";

export default function CategoryPage(props) {
  console.log("CategoryPage props: ", props);

  const { category, services, pagination } = props;
  const hasServices = size(services) > 0;

  return (
    <>
      <RootLayout>
        <Shared.PageHeader title={category?.attributes?.name} />
        <Container isContainer>
          <Shared.Separator height={54} />
          {hasServices ? (
            <>
              <Shared.Grid cols={3} gap="30px">
                {map(services, (service) => (
                  <Link
                    key={service?.id}
                    href={`${category.attributes.slug}/${service?.attributes?.slug}`}
                  >
                    <Custom.ServiceCard title={service?.attributes?.title} />
                  </Link>
                ))}
              </Shared.Grid>
              <Shared.Separator height={54} />
              <Shared.Pagination
                currentPage={pagination?.page}
                totalPages={pagination?.pageCount}
              />
            </>
          ) : (
            <Shared.NoResult
              text={`La categoría ${category.attributes.name} aun no tiene servicios.`}
            />
          )}
          <Shared.Separator height={54} />
        </Container>
      </RootLayout>
    </>
  );
}
