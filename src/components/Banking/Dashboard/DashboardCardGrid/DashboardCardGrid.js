import styles from "./DashboardCardGrid.module.scss";
import { useAuth } from "@/hooks";
import { useAccount } from "@/hooks";
import { Custom } from "@/components/Custom";
import numeral from "numeral";
import { fn } from "@/utils";

export function DashboardCardGrid() {
  const { user } = useAuth();
  const { contributionBalance, activeLoans } = useAccount();

  console.log("dashboard contributionBalance: ", contributionBalance);
  console.log("dashboard activeLoans: ", activeLoans);

  if (!user) {
    return null;
  }

  const accountsTotalBalance = `RD$${numeral(
    contributionBalance?.data?.balance.toFixed(2)
  ).format("0,0.00")}`;

  const calculatedLoansTotalBalance = fn.calcLoansTotalBalance(activeLoans);
  const loansTotalBalance = `RD$${numeral(
    calculatedLoansTotalBalance.toFixed(2)
  ).format("0,0.00")}`;

  const activeApplicationsRequest = 0;

  // const loansTotalBalance = 0;

  const cards = [
    {
      subtitle: "Balance en Cuentas",
      text: accountsTotalBalance,
      chipContent: +300,
      chipType: "success",
      caption: "Total disponible en cuentas.",
    },
    {
      subtitle: "Préstamos Activos",
      text: loansTotalBalance,
      chipContent: -1300,
      chipType: "danger",
      caption: "Total pendiente en préstamos.",
    },
    {
      subtitle: "Próximos Pagos",
      text: 1500,
      chipContent: "0052",
      chipType: "warning",
      caption: "A pagar en los próximos 30 días.",
    },
    {
      subtitle: "Solicitudes Activas",
      text:
        activeApplicationsRequest == 1
          ? `${activeApplicationsRequest} Solicitud`
          : `${activeApplicationsRequest} Solicitudes`,
      caption: "Solicitudes en revisión.",
    },
  ];

  return (
    <div className={styles.dashboardCardGrid}>
      {cards &&
        cards.map((card, i) => (
          <Custom.MuiXCardPaper
            subtitle={card.subtitle}
            text={card.text}
            chipContent={card.chipContent}
            chipType={card.chipType}
            caption={card.caption}
          />
        ))}
    </div>
  );
}
