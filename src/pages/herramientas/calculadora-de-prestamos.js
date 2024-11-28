import styles from "./herramientas.module.scss";
import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { useState } from "react";
import numeral from "numeral";
import classNames from "classnames";
import { useRouter } from "next/router";
import { Block } from "@/components/Block";
import { Button, Icon } from "semantic-ui-react";

export default function CalculadoraDePrestamosPage() {
  const [amount, setAmount] = useState(0); // monto del prestamo
  const [interestRate, setInterestRate] = useState(0); // tasa de interes anual
  const [monthlyInterestRate, setMonthlyInterestRate] = useState(0);
  const [term, setTerm] = useState(0); // plazo en meses
  const [paymentType, setPaymentType] = useState("insoluto");
  const [paymentPeriod, setPaymentPeriod] = useState("mensual");
  const [monthlyPayment, setMonthlyPayment] = useState(0); // cuota mensual
  const [totalInterest, setTotalInterest] = useState(0); //  total del interes
  const [totalPayment, setTotalPayment] = useState(0);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const calculateMonthlyInterestRate = (value) => {
    console.log("Tasa anual: ", value);
    setInterestRate(value);
    // Convierte la tasa anual a la tasa mensual usando la fórmula de interés compuesto
    const monthlyRate = parseFloat(value) / 12 / 100;
    setMonthlyInterestRate(monthlyRate);
  };

  const handleClear = () => {
    setAmount(0);
    setInterestRate(0);
    setMonthlyInterestRate(0);
    setTerm(0);
    setPaymentType("insoluto");
    setMonthlyPayment(0);
    setTotalInterest(0);
    setTotalPayment(0);
  };

  // calculo para el metodo de saldo insoluto
  const calculateOutstandingPayment = (
    principal,
    monthlyInterestRate,
    numberOfPayments
  ) => {
    const monthlyPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    const totalInterest = monthlyPayment * numberOfPayments - principal;

    return {
      monthlyPayment,
      totalInterest,
    };
  };

  // calculo para el metodo de saldo absoluto
  const calculateAbsolutePayment = (
    principal,
    monthlyInterestRate,
    numberOfPayments
  ) => {
    const interest = principal * monthlyInterestRate * numberOfPayments;
    const monthlyPayment = (principal + interest) / numberOfPayments;
    const totalInterest = interest;

    return {
      monthlyPayment,
      totalInterest,
    };
  };

  const calculatePayment = () => {
    const principal = parseFloat(amount);
    const numberOfPayments = parseInt(term);

    let results;

    if (paymentType === "insoluto") {
      results = calculateOutstandingPayment(
        principal,
        monthlyInterestRate,
        numberOfPayments
      );
    } else {
      results = calculateAbsolutePayment(
        principal,
        monthlyInterestRate,
        numberOfPayments
      );
    }

    // calculo del pago mensual
    // const monthlyPayment =
    //   (principal * monthlyInterestRate) /
    //   (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    // // calculo del interes total
    // const totalInterest = monthlyPayment * numberOfPayments - principal;

    const totalToPay = principal + results?.totalInterest;

    setMonthlyPayment(results?.monthlyPayment);
    setTotalInterest(results?.totalInterest);
    setTotalPayment(totalToPay);
  };

  const sendViaWhatsapp = () => {
    const message = `Monto del préstamo: RD$${numeral(amount).format("0,0.00")}
      Interés mensual: ${(monthlyInterestRate * 100).toFixed(2)}%
      Plazo: ${term} meses
      Cuota mensual: RD$${numeral(monthlyPayment.toFixed(2)).format("0,0.00")}
      Total a pagar: RD$${numeral(totalPayment.toFixed(2)).format("0,0.00")}
      Intereses: RD$${numeral(totalInterest.toFixed(2)).format("0,0.00")}
    `;

    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <RootLayout title="Calculadora de Prestamos">
      <div className={styles.calculadoraDePrestamos}>
        <div className={styles.header}>
          <Container isContainer>
            <div className={styles.headerOptions}>
              <button onClick={handleBack}>
                <Block.MaterialIcon icon="arrow_back" height="24px" />
                Volver atras
              </button>
            </div>
            <h2 className={styles.title}>Calculadora de Prestamos</h2>
          </Container>
        </div>
        <Container isContainer>
          <div className={styles.content}>
            <div className={styles.calculadoraDePrestamosWrapper}>
              <div className={styles.calculadoraDePrestamosForm}>
                {/* monto */}
                <div className={styles.amount}>
                  <label htmlFor="amount">Monto</label>
                  <input
                    type="number"
                    value={amount}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                {/* tasa */}
                <div className={styles.rate}>
                  <label htmlFor="rate">Tasa de interés (% anual)</label>
                  <input
                    type="number"
                    value={interestRate}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      calculateMonthlyInterestRate(e.target.value)
                    }
                  />
                </div>

                {/* interes mensual */}
                <div className={styles.rate}>
                  <label htmlFor="monthly-rate">Interés mensual</label>
                  <input
                    type="text"
                    className={styles.readOnly}
                    value={`${(monthlyInterestRate * 100).toFixed(1)}%`}
                    readOnly
                  />
                </div>

                {/* periodo de pago */}
                <div className={styles.paymentPeriod}>
                  <label htmlFor="payment-period">Periodicidad de Pagos</label>
                  <div className={styles.radioGroup}>
                    {/* diario */}
                    <div>
                      <input
                        type="radio"
                        id="diario"
                        name="payment-period"
                        value="diario"
                        checked={paymentPeriod === "diario"}
                        onChange={(e) => setPaymentPeriod(e.target.value)}
                        className={classNames(styles.radio, {
                          [styles.checked]: paymentPeriod === "diario",
                        })}
                      />
                      <label htmlFor="diario">Diario</label>
                    </div>
                    {/* semanal */}
                    <div>
                      <input
                        type="radio"
                        id="semanal"
                        name="payment-period"
                        value="semanal"
                        checked={paymentPeriod === "semanal"}
                        onChange={(e) => setPaymentPeriod(e.target.value)}
                        className={classNames(styles.radio, {
                          [styles.checked]: paymentPeriod === "semanal",
                        })}
                      />
                      <label htmlFor="semanal">Semanal</label>
                    </div>
                    {/* quincenal */}
                    <div>
                      <input
                        type="radio"
                        id="quincenal"
                        name="payment-period"
                        value="quincenal"
                        checked={paymentPeriod === "quincenal"}
                        onChange={(e) => setPaymentPeriod(e.target.value)}
                        className={classNames(styles.radio, {
                          [styles.checked]: paymentPeriod === "quincenal",
                        })}
                      />
                      <label htmlFor="quincenal">Quincenal</label>
                    </div>
                    {/* mensual */}
                    <div>
                      <input
                        type="radio"
                        id="mensual"
                        name="payment-period"
                        value="mensual"
                        checked={paymentPeriod === "mensual"}
                        onChange={(e) => setPaymentPeriod(e.target.value)}
                        className={classNames(styles.radio, {
                          [styles.checked]: paymentPeriod === "mensual",
                        })}
                      />
                      <label htmlFor="mensual">Mensual</label>
                    </div>
                  </div>
                </div>

                {/* tipo de pago */}
                <div className={styles.paymentType}>
                  <label htmlFor="payment-type">Tipo de pago</label>
                  <div className={styles.radioGroup}>
                    {/* absoluto */}
                    <div>
                      <input
                        type="radio"
                        id="absoluto"
                        name="payment-type"
                        value="absoluto"
                        checked={paymentType === "absoluto"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className={classNames(styles.radio, {
                          [styles.checked]: paymentType === "absoluto",
                        })}
                      />
                      <label htmlFor="absoluto">Saldo absoluto</label>
                    </div>
                    {/* insoluto */}
                    <div>
                      <input
                        type="radio"
                        id="insoluto"
                        name="payment-type"
                        value="insoluto"
                        checked={paymentType === "insoluto"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className={classNames(styles.radio, {
                          [styles.checked]: paymentType === "insoluto",
                        })}
                      />
                      <label htmlFor="insoluto">Saldo insoluto</label>
                    </div>
                  </div>
                </div>

                {/* plazo */}
                <div className={styles.term}>
                  <label htmlFor="term">Periodicidad de Pagos (meses)</label>
                  <input
                    type="number"
                    value={term}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setTerm(e.target.value)}
                  />
                </div>

                <div className={styles.actions}>
                  {/* boton de limpiar */}
                  <button className={styles.clearButton} onClick={handleClear}>
                    Limpiar campos
                  </button>
                  {/* boton de calcular */}
                  <button
                    disabled={!amount || !interestRate || !term}
                    onClick={calculatePayment}
                    className={classNames(styles.calcButton, {
                      [styles.disabled]: !amount || !interestRate || !term,
                    })}
                  >
                    Calcular
                  </button>
                </div>
              </div>

              {/* result */}
              {monthlyPayment ? (
                <div className={styles.calculadoraDePrestamosResult}>
                  <div className={styles.resultContent}>
                    <h6 className={styles.title}>Resultados</h6>
                    <ul className={styles.data}>
                      <li>
                        <span>Monto</span>
                        <p>{`RD$${numeral(amount).format("0,0.00")}`}</p>
                      </li>
                      <li>
                        <span>Interés mensual</span>
                        <p>{monthlyInterestRate * 100}%</p>
                      </li>
                      <li>
                        <span>Plazo</span>
                        <p>{term} meses</p>
                      </li>
                    </ul>
                    <ul className={styles.result}>
                      <li>
                        <span>Intereses</span>
                        <p>{`RD$${numeral(totalInterest).format("0,0.00")}`}</p>
                      </li>
                      <li>
                        <span>Total a pagar</span>
                        <p>
                          {`RD$${numeral(totalPayment.toFixed(2)).format(
                            "0,0.00"
                          )}`}
                        </p>
                      </li>
                    </ul>
                    <ul className={styles.monthlyPaymentResult}>
                      <li>
                        <span>Cuota mensual</span>
                        <p>
                          {`RD$${numeral(monthlyPayment.toFixed(2)).format(
                            "0,0.00"
                          )}`}
                        </p>
                      </li>
                    </ul>
                  </div>

                  {monthlyPayment && (
                    <div className={styles.actions}>
                      <p>Compartir vía:</p>

                      <ul className={styles.shareOptions}>
                        <li title="Compartir vía WhatsApp">
                          <Icon name="whatsapp" onClick={sendViaWhatsapp} />
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
            <div className={styles.notes}>
              <p>
                Tomar en cuenta, al momento de realizar el calculo, los
                siguientes conceptos:
              </p>

              <ul>
                <li>
                  <strong>Saldo insoluto:</strong> En este método, los intereses
                  se calculan sobre el saldo restante del préstamo cada mes. Es
                  más común en los préstamos bancarios, donde el interés se
                  reduce gradualmente a medida que se paga el préstamo.
                </li>

                <li>
                  <strong>Saldo absoluto:</strong> En este método, los intereses
                  se calculan sobre el monto total del préstamo, lo que
                  significa que la cuota de interés es fija durante todo el
                  período.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </RootLayout>
  );
}
