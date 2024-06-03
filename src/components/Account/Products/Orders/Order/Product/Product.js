import styles from "./Product.module.scss";
import { Shared } from "@/components/Shared";
import Link from "next/link";
import numeral from "numeral";
import { forEach } from "lodash";
import { fn } from "@/utils";

export function Product(props) {
  const { product } = props;
  const title = product.attributes.title;
  const slug = product.attributes.slug;
  const image = product.attributes.image;
  const supplier = product.attributes.supplier.data;
  const price = fn.calcDiscount(
    product.attributes.price,
    product.attributes.discount
  );

  const total = fn.calcTotalByQuantity(price, product.quantity);

  return (
    <div className={styles.product}>
      <div className={styles.wrapper}>
        <Shared.Image src={image.data.attributes.url} />
        <div className={styles.info}>
          <Link href={`/productos/${supplier.attributes.slug}/${slug}`}>
            <h6>{title}</h6>
          </Link>
          <Link
            href={`/productos/${supplier.attributes.slug}`}
            className={styles.supplier}
          >
            <span>{supplier.attributes.name}</span>
          </Link>
        </div>
        <div>
          <span>{product.quantity}</span>
        </div>
        <div className={styles.price}>
          {product.attributes.discount && (
            <div>
              <span className={styles.discount}>
                {`-${product.attributes.discount}%`}
              </span>
            </div>
          )}
          <span>{`RD$${numeral(price.toFixed(2)).format("0,0.00")}`}</span>
          {product.attributes.discount && (
            <>
              <p className={styles.regularPriceText}>{`Precio regular`}</p>
              <p className={styles.regularPrice}>
                {`RD$${numeral(product.attributes.price.toFixed(2)).format(
                  "0,0.00"
                )}`}
              </p>
            </>
          )}
        </div>
        <div className={styles.total}>
          <span>{`RD$${numeral(total.toFixed(2)).format("0,0.00")}`}</span>
        </div>
      </div>
    </div>
  );
}
