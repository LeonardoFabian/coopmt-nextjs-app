import styles from "./Summary.module.scss";
import { useState, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { Cart } from "@/api";
import { useAuth, useCart } from "@/hooks";
import { fn } from "@/utils";
import numeral from "numeral";
import { Shared } from "@/components/Shared";

export function Summary(props) {
  const { products, addressSelected } = props;
  const [total, setTotal] = useState(null);
  console.log("Total a pagar: ", total);

  useEffect(() => {
    let totalTemp = 0;

    forEach(products, (product) => {
      const price = fn.calcDiscount(
        product.attributes.price,
        product.attributes.discount
      );
      totalTemp += price * product.quantity;
    });

    setTotal(totalTemp.toFixed(2));
  }, [products]);

  return (
    <div className={styles.summary}>
      <h5 className={styles.heading}>Resumen</h5>

      <div className={styles.cartProducts}>
        <h6 className={styles.cartProductsHeading}>Productos</h6>

        {map(products, (product) => (
          <div key={product.id} className={styles.product}>
            <div>
              <p className={styles.title}>{product.attributes.title}</p>
              <span>{product.attributes.supplier.data.attributes.name}</span>
            </div>
            <span className={styles.price}>
              {product.quantity > 0 && `${product.quantity} x `}
              {`RD$${numeral(
                fn
                  .calcDiscount(
                    product.attributes.price,
                    product.attributes.discount
                  )
                  .toFixed(2)
              ).format("0,0.00")}`}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.cartTotal}>
        <div className={styles.totalToPay}>
          <span>Total</span>
          <span>{`RD$${numeral(total).format("0,0.00")}`}</span>
        </div>

        <Button primary fluid disabled={!addressSelected}>
          <Icon name="credit card outline" /> Pagar
        </Button>
      </div>

      {/* <div className={styles.cartTotal}>
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
      </div> */}
    </div>
  );
}
