import styles from "./Header.module.scss";
import { map } from "lodash";
import { Icon, Container } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import { useRouter } from "next/router";
import classNames from "classnames";

export function Header() {
  const {
    query: { step = 1 },
  } = useRouter();

  const currentStep = step;

  const steps = [
    {
      number: 1,
      title: "Cesta",
    },
    {
      number: 2,
      title: "Pago",
    },
    {
      number: 3,
      title: "Confirmación",
    },
  ];
  return (
    <div className={styles.cartHeader}>
      <Container isContainer className={styles.wrapper}>
        <div className={styles.title}>
          <Icon name="cart" />
          <h3>Carrito</h3>
        </div>

        <div className={styles.steps}>
          {map(steps, (step) => (
            <div
              key={step.number}
              className={classNames({
                [styles.active]: step.number === Number(currentStep),
                [styles.success]: step.number < Number(currentStep),
              })}
            >
              <span className={styles.number}>
                <Icon name="check" />
                {step.number}
              </span>
              <span className={styles.title}>{step.title}</span>
              <span className={styles.space}></span>
            </div>
          ))}
        </div>

        <div className={styles.certificate}>
          <Icon name="lock" />
          <div>
            <span>Pago seguro</span>
            <span>256-bit SSL Secure</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
