import styles from "./MonthlyDiscountsChart.module.scss";
import { useAuth } from "@/hooks";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Account, Membership } from "@/api";
import { fn } from "@/utils";
import { Custom } from "@/components/Custom";

const accountController = new Account();
const membershipController = new Membership();

export function MonthlyDiscountsChart() {
  const { user } = useAuth();
  console.log("user: ", user);
  const [discounts, setDiscounts] = useState(null);
  const [salary, setSalary] = useState(null);
  const currentYear = fn.getCurrentYear();
  const chartTitle = `Año ${currentYear}`;
  //   const salary = user.

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const discountsResponse =
            await accountController.getCurrentYearMonthlyDiscounts(
              user.memberId
            );
          setDiscounts(discountsResponse.data);

          const membershipDataResponse = await membershipController.check(
            user.username
          );
          console.log("membershipDataResponse: ", membershipDataResponse);
          setSalary(membershipDataResponse?.salary);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [user]);

  if (!discounts) {
    return null;
  }

  // Función para agrupar datos por mes y tipo de transacción
  const groupByMonthAndType = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const date = new Date(item.transactionDate);
      const month = date.getMonth(); // 0 = Enero, 1 = Febrero, etc.

      if (!groupedData[month]) {
        groupedData[month] = {
          aportes: 0,
          prestamos: 0,
          intereses: 0,
          salario: salary,
        };
      }

      if (item.description === "Aportes") {
        groupedData[month].aportes += item.amount;
        groupedData[month].salario -= item.amount;
      } else if (item.description === "Prestamos") {
        groupedData[month].prestamos += item.amount;
        groupedData[month].salario -= item.amount;
      } else if (item.description === "Intereses") {
        groupedData[month].intereses += item.amount;
        groupedData[month].salario -= item.amount;
      }
    });

    return groupedData;
  };

  const groupedDiscounts = groupByMonthAndType(discounts);

  // Construcción de los datos para el gráfico
  const aportesData = [];
  const prestamosData = [];
  const interesesData = [];
  const salarioData = [];

  for (let i = 0; i < 12; i++) {
    aportesData.push(groupedDiscounts[i]?.aportes || 0);
    prestamosData.push(groupedDiscounts[i]?.prestamos || 0);
    interesesData.push(groupedDiscounts[i]?.intereses || 0);
    salarioData.push(groupedDiscounts[i]?.salario || 0);
  }

  const data = {
    labels: [
      "ENE",
      "FEB",
      "MAR",
      "ABR",
      "MAY",
      "JUN",
      "JUL",
      "AGO",
      "SEP",
      "OCT",
      "NOV",
      "DIC",
    ],
    datasets: [
      {
        label: "Aportes",
        data: aportesData,
        backgroundColor: "rgb(47, 53, 143)",
      },
      {
        label: "Prestamos (Capital)",
        data: prestamosData,
        backgroundColor: "rgb(58, 181, 74)",
      },
      {
        label: "Prestamos (Interés)",
        data: interesesData,
        backgroundColor: "rgb(255, 196, 20)",
      },
      {
        label: "Salario Restante",
        data: salarioData,
        backgroundColor: "rgba(161, 218, 166, 0.4)",
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: `${chartTitle}`,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className={styles.monthlyDiscountsChart}>
      <Custom.Chartjs2StackedBar
        title="Descuentos mensuales"
        data={data}
        options={options}
      />
    </div>
  );
}
