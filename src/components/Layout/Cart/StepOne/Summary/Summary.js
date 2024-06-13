import styles from "./Summary.module.scss";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { forEach, size } from "lodash";
import { fn } from "@/utils";
import numeral from "numeral";

export function Summary(props) {
  const { products } = props;
  const router = useRouter();
  const [totals, setTotals] = useState(null);

  useEffect(() => {
    let totals = {
      original: 0,
      discount: 0,
      price: 0,
    };

    forEach(products, (product) => {
      // console.log("Summary product: ", product);
      const price = fn.calcDiscount(
        product.attributes.price,
        product.attributes.discount
      );

      totals = {
        original: totals.original + product.attributes.price * product.quantity,
        discount:
          totals.discount +
          (product.attributes.price - price) * product.quantity,
        price: totals.price + price * product.quantity,
      };

      setTotals(totals);
      console.log("Totals: ", totals);
    });
  }, [products]);

  if (!totals || size(products) === 0) return null;

  const goToStepTwo = () => {
    router.replace({ query: { ...router.query, step: 2 } });
  };

  return (
    <div className={styles.summary}>
      <h5 className={styles.heading}>Resumen</h5>

      <div className={styles.cartTotal}>
        <h6 className={styles.cartTotalHeading}>Total del carrito</h6>

        <div className={styles.totals}>
          <div className={styles.subtotal}>
            <span>Subtotal</span>
            <span>{`RD$${numeral(totals.original.toFixed(2)).format(
              "0,0.00"
            )}`}</span>
          </div>
          <div className={styles.discount}>
            <span>Descuento</span>
            <span>{`-RD$${numeral(totals.discount.toFixed(2)).format(
              "0,0.00"
            )}`}</span>
          </div>
          <div className={styles.total}>
            <span>Total</span>
            <span>{`RD$${numeral(totals.price.toFixed(2)).format(
              "0,0.00"
            )}`}</span>
          </div>
        </div>

        <div className={styles.actions} onClick={goToStepTwo}>
          <Button primary fluid>
            Proceder a pagar
          </Button>
        </div>

        <Link href="/">Ver otros productos</Link>
      </div>
    </div>
  );
}
