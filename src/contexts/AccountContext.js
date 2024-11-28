import { createContext, useState, useEffect } from "react";
import { useAuth } from "@/hooks";
import { Account, Transaction, Loan } from "@/api";

const accountController = new Account();
const loanController = new Loan();

// context
export const AccountContext = createContext();

// provider
export function AccountProvider(props) {
  const { children } = props;
  const { user } = useAuth();

  // console.log("AccountContext user: ", user);

  const [accounts, setAccounts] = useState([]);
  const [contributionBalance, setContributionBalance] = useState(null);
  const [contributionTotalSavings, setContributionTotalSavings] =
    useState(null);
  const [contributionTotalWithdrawals, setContributionTotalWithdrawals] =
    useState(null);
  const [activeLoans, setActiveLoans] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // const activeLoans = async (user) => {
  //   const memberId = user.memberId;

  //   console.log("memberId: ", memberId);
  //   try {
  //     const response = await loanController.getUserActiveLoans(user.memberId);
  //     console.log("activeLoans: ", response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchUserData = async () => {
    if (!user || !user.memberId) {
      console.log("User or memberId is not available.");
      return;
    }

    try {
      // get active loans
      const activeLoansResponse = await loanController.getUserActiveLoans(
        user.memberId
      );
      console.log("activeLoans: ", activeLoansResponse);
      setActiveLoans(activeLoansResponse);

      // get contribution account balance
      const contributionBalanceResponse =
        await accountController.getContributionBalance(user.memberId);
      console.log("contributionBalance: ", contributionBalanceResponse);
      setContributionBalance(contributionBalanceResponse);

      // get contribution total savings
      const contributionTotalSavingsResponse =
        await accountController.getTotalSavings(user.memberId);
      console.log(
        "contributionTotalSavings: ",
        contributionTotalSavingsResponse
      );
      setContributionTotalSavings(contributionTotalSavingsResponse);

      // get contribution total withdrawals
      const contributionTotalWithdrawalsResponse =
        await accountController.getTotalWithdrawals(user.memberId);
      console.log(
        "contributionTotalWithdrawals: ",
        contributionTotalWithdrawalsResponse
      );
      setContributionTotalWithdrawals(contributionTotalWithdrawalsResponse);
    } catch (error) {
      console.error("Error fetching user account data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // const getAccountTransactions = async (
  //   user,
  //   limit = 10,
  //   offset = 0,
  //   orderBy = "FECHA",
  //   orderDir = "DESC"
  // ) => {
  //   if (!user || !user.memberId) {
  //     console.log("User or memberId is not available.");
  //     return;
  //   }

  //   try {
  //     const response = await accountController.getAccountTransactions(
  //       user.memberId,
  //       limit,
  //       offset,
  //       orderBy,
  //       orderDir
  //     );
  //     console.log("getAccountTransactions: ", response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const data = {
    accounts,
    contributionBalance, // COMPLETE
    contributionTotalSavings, // COMPLETE
    contributionTotalWithdrawals, // COMPLETE
    activeLoans, // TODO verificar balance, a Joel Lahoz no le da el balance exacto
    requests: null, // solicitudes de prestamo, cambio de aportes, solicitud de reenganche, etc el usuario con status
    recentTransactions: null, // transacciones recientes
    // getAccountTransactions(), // ver momivientos de la cuenta de aportes
    checkLoan: null, // consultar un prestamo
    applications, // si el usuario tiene solicitudes
    courses, // si el usuario tiene cursos
    beneficiaries: null, // consultar beneficiarios
    notifications, // si el usuario tiene notificaciones
    uploadDocument: null, // si el usuario tiene que subir algun documento
    checkBalance: null, // obtener balance de la cuenta
    checkProductRequirements: null, // consultar requisitos del servicio/producto al momento de solicitar para saber si el usuario cumple
    requestLoan: null, // solicitar prestamo
    requestLoanRestructuring: null, // solicitar reenganche TODO: verificar como se escribe
    requestChangeContributionAmount: null, // solicitar cambio de aportes
    requestQuotation: null, // solicitar cotizacion de un producto
    requestCourseEnrollment: null, // inscribirse en un curso
    checkEnrollment: null, // comprobar que el usuario esta inscrito en un curso
    requestEventRegistration: null, // registrarse en un evento
    checkRegistration: null, // comprueba si el usuario esta inscrito en algun evento
    rateService: null, // valorar un servicio
    generateAccountStatement: null, // generar estado de cuenta TODO: verificar que asi se escribe
    generateReport: null, // generar reporte
    exportToPDF: null, // exportar reporte en PDF
    exportToXLS: null, // exportar reporte en excel
    exportToCSV: null, // exportar reporte en CSV
    // loading,
  };

  // if (loading) return null;

  return (
    <AccountContext.Provider value={data}>{children}</AccountContext.Provider>
  );
}
