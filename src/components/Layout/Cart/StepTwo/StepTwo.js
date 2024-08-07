import styles from "./StepTwo.module.scss";
import { Shared } from "@/components/Shared";
import { Address } from "./Address";
import { Payment } from "./Payment";
import { Summary } from "./Summary";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ENV } from "@/utils";
import { size } from "lodash";

const stripeInit = loadStripe(ENV.STRIPE_TOKEN);

export function StepTwo(props) {
  const { products } = props;
  const [addressSelected, setAddressSelected] = useState(null);

  if (size(products) < 1) return null;

  return (
    <Elements stripe={stripeInit}>
      <div className={styles.stepTwo}>
        <div className={styles.left}>
          <Address
            addressSelected={addressSelected}
            setAddressSelected={setAddressSelected}
          />
          <Shared.Separator height={30} />
          {addressSelected && <Payment />}
        </div>
        <div className={styles.right}>
          <Summary products={products} addressSelected={addressSelected} />
        </div>
      </div>
    </Elements>
  );
}
