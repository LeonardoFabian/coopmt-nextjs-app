import styles from "./ProductsGrid.module.scss";
import Link from "next/link";
import { map } from "lodash";
import { Shared } from "@/components/Shared";
import { Custom } from "@/components/Custom";
import { fn } from "@/utils";

export function ProductsGrid(props) {
  //   console.log("ProductsGrid props: ", props);

  const { products } = props;
  console.log(products);

  return (
    <Shared.Grid cols={3} gap="30px">
      {map(products, (item) => {
        const product = item?.attributes?.product?.data;

        return (
          <Custom.ProductCard
            key={product?.id}
            productId={product?.id}
            title={product?.attributes?.title}
            slug={product?.attributes?.slug}
            image={product?.attributes?.image}
            price={product?.attributes?.price}
            discount={product?.attributes?.discount}
            supplier={product?.attributes?.supplier}
          />
        );
      })}
    </Shared.Grid>
  );
}
