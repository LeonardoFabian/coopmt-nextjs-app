import styles from "./Header.module.scss";
import { useRouter } from "next/router";
import { Icon, Container } from "semantic-ui-react";
import classNames from "classnames";
import { map } from "lodash";

export function Header() {
  const {
    query: { step = 1 },
  } = useRouter();

  const currentStep = step;

  const steps = [
    {
      number: 1,
      title: "Datos personales",
    },
    {
      number: 2,
      title: "Información laboral",
    },
    {
      number: 3,
      title: "Beneficiarios",
    },
    {
      number: 4,
      title: "Acuerdos",
    },
    {
      number: 5,
      title: "Confirmación",
    },
  ];
  return (
    <div className={styles.affiliationFormHeader}>
      <Container isContainer className={styles.wrapper}>
        <div className={styles.steps}>
          {map(steps, (step) => (
            <div
              key={step.number}
              className={classNames(styles.step, {
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
      </Container>
    </div>
  );
}
