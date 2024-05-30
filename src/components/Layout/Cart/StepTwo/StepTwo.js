import styles from "./StepTwo.module.scss";
import { Shared } from "@/components/Shared";
import { Address } from "./Address";
import { Payment } from "./Payment";
import { Summary } from "./Summary";
import { useState } from "react";

export function StepTwo(props) {
  const { products } = props;
  const [addressSelected, setAddressSelected] = useState(null);

  return (
    <div className={styles.stepTwo}>
      <div className={styles.left}>
        <Address
          addressSelected={addressSelected}
          setAddressSelected={setAddressSelected}
        />
        <Shared.Separator height={54} />
        {addressSelected && <Payment />}
      </div>
      <div className={styles.right}>
        <Summary />
      </div>
    </div>
  );
}
