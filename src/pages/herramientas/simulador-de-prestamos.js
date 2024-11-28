import styles from "./herramientas.module.scss";
import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Block } from "@/components/Block";
import { Icon } from "semantic-ui-react";
import classNames from "classnames";
import numeral from "numeral";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function SimuladorDePrestamosPage() {
  const [amount, setAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [monthlyInterestRate, setMonthlyInterestRate] = useState(0);

  const [term, setTerm] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const [paymentType, setPaymentType] = useState("insoluto");
  const [paymentPeriod, setPaymentPeriod] = useState("mensual");

  const router = useRouter();

  const handleBack = () => {
    router.back();
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

  const calculateMonthlyInterestRate = (value) => {
    console.log("Tasa anual: ", value);
    setInterestRate(value);
    // Convierte la tasa anual a la tasa mensual usando la fórmula de interés compuesto
    const monthlyRate = parseFloat(value) / 12 / 100;
    setMonthlyInterestRate(monthlyRate);
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

  const calculateLoan = () => {
    const r = interestRate / 100 / 12; // tasa de interes mensual
    const n = term; // plazo en meses
    const p = amount; // monto del prestamo

    let monthlyPayment = 0;
    let totalInterestSum = 0;
    let totalPaymentSum = 0;
    const schedule = [];

    if (paymentType === "insoluto") {
      // calculo para el metodo de saldo insoluto amortizacion francesa
      monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyPayment(monthlyPayment);

      // plan de amortizacion insoluto
      let balance = p;
      for (let i = 1; i <= n; i++) {
        const interestForMonth = balance * r;
        const principalForMonth = monthlyPayment - interestForMonth;
        balance -= principalForMonth;

        balance = Math.max(0, parseFloat(balance.toFixed(2)));

        totalInterestSum += interestForMonth;

        schedule.push({
          month: i,
          monthlyPayment: monthlyPayment,
          principalForMonth: principalForMonth,
          interestForMonth: interestForMonth,
          remainingBalance: balance > 0 ? balance : 0,
        });
      }
    } else if (paymentType === "absoluto") {
      const capitalPerMonth = p / n;
      for (let i = 1; i <= n; i++) {
        const interestForMonth = p * r;
        monthlyPayment = capitalPerMonth + interestForMonth;

        totalInterestSum += interestForMonth;

        const remainingBalance = Math.max(
          0,
          parseFloat((p - capitalPerMonth * i).toFixed(2))
        );

        schedule.push({
          month: i,
          monthlyPayment: monthlyPayment,
          principalForMonth: capitalPerMonth,
          interestForMonth: interestForMonth,
          remainingBalance: remainingBalance > 0 ? remainingBalance : 0,
        });
      }

      setMonthlyPayment(monthlyPayment);
    }

    totalPaymentSum = parseFloat(p) + totalInterestSum;

    setTotalInterest(totalInterestSum);
    setTotalPayment(parseFloat(totalPaymentSum));

    setAmortizationSchedule(schedule);
  };

  const columns = [
    { field: "id", headerName: "No. Cuota", flex: 1 },
    {
      field: "monthlyPayment",
      headerName: "Cuota Mensual",
      flex: 2,
      editable: false,
    },
    {
      field: "principalForMonth",
      headerName: "Capital",
      flex: 2,
      editable: false,
    },
    {
      field: "interestForMonth",
      headerName: "Interés",
      flex: 2,
      editable: false,
    },
    {
      field: "remainingBalance",
      headerName: "Saldo",
      flex: 2,
      editable: false,
    },
  ];

  let rows = [];

  if (amortizationSchedule) {
    amortizationSchedule.forEach((item, index) => {
      const amortizationMonthlyPayment = `RD$${numeral(
        item.monthlyPayment
      ).format("0,0.00")}`;
      const amortizationPrincipalForMonth = `RD$${numeral(
        item.principalForMonth
      ).format("0,0.00")}`;
      const amortizationInterestForMonth = `RD$${numeral(
        item.interestForMonth
      ).format("0,0.00")}`;
      console.log(item.remainingBalance);
      const amortizationRemainingBalance = `RD$${numeral(
        item.remainingBalance
      ).format("0,0.00")}`;

      rows.push({
        id: item.month,
        monthlyPayment: amortizationMonthlyPayment,
        principalForMonth: amortizationPrincipalForMonth,
        interestForMonth: amortizationInterestForMonth,
        remainingBalance: amortizationRemainingBalance,
      });
    });
  }

  return (
    <RootLayout title="Simulador de Prestamos">
      <div className={styles.simuladorDePrestamos}>
        <div className={styles.header}>
          <Container isContainer>
            <div className={styles.headerOptions}>
              <button onClick={handleBack}>
                <Block.MaterialIcon icon="arrow_back" height="24px" />
                Volver atras
              </button>
            </div>
            <h2 className={styles.title}>Simulador de Prestamos</h2>
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
                    onClick={calculateLoan}
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
                        <p>{`RD$${numeral(totalPayment).format("0,0.00")}`}</p>
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

            {monthlyPayment ? (
              <div className={styles.amortizationSchedule}>
                <div className={styles.amortizationScheduleWrapper}>
                  <h5 className={styles.title}>Tabla de Amortización</h5>
                  <Box sx={{ height: "100%", width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 12 },
                        },
                      }}
                      pageSizeOptions={[12, 24, 36, 48, 60]}
                      checkboxSelection={false}
                      disableRowSelectionOnClick
                    />
                  </Box>
                  <p>
                    Esta tabla de amortización es una proyección la cual puede
                    variar por diversas razones, tales como:
                  </p>
                  <p>
                    Atrasos de parte del cliente respecto al calendario de pagos
                    definido, pagos incompletos, cambios en la fecha estipulada
                    de pago a solicitud del cliente, cambios imprevistos en los
                    días laborales, que pudieran cambiar la fecha efectiva de
                    uno o más pagos, aumento o reducción de la tasa de interés,
                    abonos extraordinarios, entre otras.
                  </p>
                </div>
              </div>
            ) : null}

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
