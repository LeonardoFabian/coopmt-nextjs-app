import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { size, map } from "lodash";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";
import Link from "next/link";

export default function SupplierPage(props) {
  console.log("SupplierPage props: ", props);

  const { supplier, products, pagination } = props;
  const hasProducts = size(products) > 0;

  return (
    <>
      <RootLayout>
        <Shared.PageHeader title={supplier?.attributes?.name} />
        <Container isContainer>
          <Shared.Separator height={54} />
          {hasProducts ? (
            <>
              <Shared.Grid cols={3} gap="30px">
                {map(products, (product) => (
                  <Link
                    key={product.id}
                    href={`/productos/${supplier?.attributes?.slug}/${product?.attributes?.slug}`}
                  >
                    <Custom.ProductCard
                      productId={product?.id}
                      title={product?.attributes?.title}
                      image={product?.attributes?.image}
                      price={product?.attributes?.price}
                      discount={product?.attributes?.discount}
                      supplier={product?.attributes?.supplier}
                    />
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
            <p>No result</p>
          )}
          <Shared.Separator height={54} />
        </Container>
      </RootLayout>
    </>
  );
}
