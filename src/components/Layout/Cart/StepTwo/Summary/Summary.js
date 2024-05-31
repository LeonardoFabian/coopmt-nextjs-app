import styles from "./Summary.module.scss";
import { useState, useEffect } from "react";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { Button, Icon } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { Cart } from "@/api";
import { useAuth, useCart } from "@/hooks";
import { fn } from "@/utils";
import numeral from "numeral";
import { Shared } from "@/components/Shared";
import { useRouter } from "next/router";

const cartController = new Cart();

export function Summary(props) {
  const { products, addressSelected } = props;
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log("Total a pagar: ", total);

  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { deleteAllItems } = useCart();
  const router = useRouter();

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

  const goToStepOne = () => {
    router.replace({ query: { ...router.query, step: 1 } });
  };

  const goToFinalStep = () => {
    router.replace({ query: { ...router.query, step: 3 } });
  };

  const onPay = async () => {
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);
    console.log("onPay stripe createToken: ", result);

    if (result.error) {
      console.error(result.error.message);
    } else {
      const response = await cartController.payment(
        result.token,
        products,
        user.id,
        addressSelected
      );

      if (response.status === 200) {
        // setLoading(false);
        deleteAllItems();
        goToFinalStep();
      } else {
        console.error("Error al realizar el pedido");
      }
    }

    // goToFinalStep();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (!total) return null;

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

        <Button
          primary
          fluid
          disabled={!addressSelected}
          onClick={onPay}
          loading={loading}
        >
          <Icon name="credit card outline" /> Pagar
        </Button>

        <Button fluid onClick={goToStepOne}>
          <Icon name="reply" /> Volver atras
        </Button>
      </div>
    </div>
  );
}
