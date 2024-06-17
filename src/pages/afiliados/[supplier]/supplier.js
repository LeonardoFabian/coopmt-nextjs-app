import styles from "./supplier.module.scss";
import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { size, map } from "lodash";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";
import Link from "next/link";
import { BlockRenderer } from "@/components/BlockRenderer";

export default function SupplierPage(props) {
  console.log("SupplierPage props: ", props);

  const { supplier, products, pagination, ads } = props;
  const hasProducts = size(products) > 0;
  const hasBlocks = size(supplier?.blocks) > 0;
  const blocks = supplier?.blocks;

  return (
    <>
      <Shared.Seo
        title={`COOPMT - ${supplier?.name}`}
        description={`${
          supplier?.information?.description || "Suplidor autorizado"
        }`}
      />
      <RootLayout>
        <Shared.PageHeader title={supplier?.name} />
        {hasBlocks && (
          <Container isContainer>
            <div className={styles.supplierPage}>
              <BlockRenderer blocks={blocks} />
            </div>
          </Container>
        )}
        <Container isContainer>
          <Shared.Separator height={54} />
          {hasProducts ? (
            <>
              <Shared.Grid cols={3} gap="30px">
                {map(products, (product) => (
                  <Custom.ProductCard
                    key={product.id}
                    productId={product?.id}
                    title={product?.attributes?.title}
                    slug={product?.attributes?.slug}
                    image={product?.attributes?.image}
                    price={product?.attributes?.price}
                    discount={product?.attributes?.discount}
                    supplier={product?.attributes?.supplier}
                  />
                ))}
              </Shared.Grid>
              <Shared.Separator height={54} />
              <Shared.Pagination
                currentPage={pagination?.page}
                totalPages={pagination?.pageCount}
              />
            </>
          ) : (
            <Shared.NoResult text="Por el momento no hemos publicado algunos de nuestros productos, pero pronto, podrás consultarlos desde aquí." />
          )}
          <Shared.Separator height={54} />
        </Container>
      </RootLayout>
    </>
  );
}
