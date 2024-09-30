import { ENV, authFetch } from "@/utils";

export class Account {
  // cuentas del socio
  async getAccounts() {
    console.log("GET ACCOUNTS API CALL");
  }

  /**
   * Retrieves the total savings for a given member ID.
   *
   * @param {string} memberId - The ID of the member to retrieve savings for.
   * @return {object} The total savings data for the member.
   */
  async getTotalSavings(memberId) {
    console.log("getTotalSavings memberId: ", memberId);
    const params = `memberId=${memberId}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.SAVINGS.TOTAL}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      console.log("getTotalSavings result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the total withdrawals for a given member ID.
   *
   * @param {string} memberId - The ID of the member to retrieve withdrawals for.
   * @return {object} The total withdrawals data for the member.
   */
  async getTotalWithdrawals(memberId) {
    console.log("getTotalWithdrawals memberId: ", memberId);
    const params = `memberId=${memberId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.WITHDRAW.TOTAL}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      console.log("getTotalWithdrawals result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the contribution balance for a given member ID.
   *
   * @param {string} memberId - The ID of the member to retrieve the contribution balance for.
   * @return {object} The contribution balance data for the member.
   */
  async getContributionBalance(memberId) {
    console.log("getContributionBalance memberId: ", memberId);
    const params = `memberId=${memberId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.BALANCE}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      console.log("getContributionBalance result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  // cuota de aportes mensual
  async getMonthlyContribution() {
    console.log("GET MONTHLY CONTRIBUTION API CALL");
  }

  // cuota de ahorro mensual
  async getMonthlySavings() {
    console.log("GET MONTHLY SAVINGS API CALL");
  }

  // estado de cuenta historico
  async getAccountStatementHistory() {
    console.log("GET ACCOUNT STATEMENT HISTORY API CALL");
  }

  // descuentos mensuales
  async getMonthlyDiscounts() {
    console.log("GET MONTHLY DISCOUNTS API CALL");
  }

  // todos los prestamos del usuario
  async getLoans() {
    console.log("GET LOANS API CALL");
  }

  // prestamo por id
  async getLoanById(loanId) {
    console.log("GET LOAN BY ID API CALL: ", loanId);
  }

  // estado de cuenta de un prestamo
  async getLoanStatement(loanId) {
    console.log("GET LOAN STATEMENT API CALL: ", loanId);
  }

  // tabla de amortizacion de un prestamo
  async getLoanAmortization(loanId) {
    console.log("GET LOAN AMORTIZATION API CALL: ", loanId);
  }
}
