import styles from "./ProductList.module.scss";
import { Container } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";
import { Product } from "@/api";
import { useState, useEffect } from "react";
import { map } from "lodash";

const productController = new Product();

export function ProductList(props) {
  const { heading, subheading, columns, limit, link } = props;

  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await productController.getRandom(limit);
        console.log("ProductList products response: ", response);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Container fluid className={styles.productList}>
      <Container isContainer className={styles.wrapper}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subHeading}>{subheading}</p>

        <div className={styles.content}>
          <Shared.Grid cols={columns} gap="30px">
            {map(products, (product) => (
              <Custom.ProductCard
                key={`product-list-product-${product?.id}`}
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
        </div>
      </Container>
    </Container>
  );
}
