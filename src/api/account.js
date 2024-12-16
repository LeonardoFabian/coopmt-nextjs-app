import { ENV, authFetch } from "@/utils";

export class Account {
  /**
   * Retrieves a list of contribution change requests associated with a given user ID
   *
   * @param {string} userId - The ID of the user to retrieve contribution change requests for
   * @return {Promise<object[]>} The JSON response containing the list of contribution change requests
   * @throws Will throw an error if the network request fails or the response status is not 200
   */
  async getUserContributionChangeRequests(userId) {
    try {
      const populate = "populate=*";
      const filters = `filters[user][id][$eq]=${userId}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CONTRIBUTION_CHANGE_REQUEST}?${filters}&${populate}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a list of contribution change types from the API.
   *
   * @return {Promise<object[]>} The JSON response containing the list of contribution change types.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async getContributionChangeTypes() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CONTRIBUTION_CHANGE_TYPES}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  // cuentas del socio
  async getAccounts() {
    console.log("GET ACCOUNTS API CALL");
  }

  /**
   * @function getAccountTransactions
   * @description Retrieves transactions for the given account.
   * @param {number} memberId - The member ID.
   * @param {number} [limit=10] - The number of records to return. Defaults to 10.
   * @param {number} [offset=0] - The record offset. Defaults to 0.
   * @param {string} [orderBy="FECHA"] - The field to order by. Defaults to "FECHA".
   * @param {string} [orderDir="DESC"] - The order direction. Defaults to "DESC".
   * @returns {Promise<import("./types").IAccountTransaction[]>}
   */
  async getAccountTransactions(
    memberId,
    limit = 10,
    offset = 0,
    orderBy = "FECHA",
    orderDir = "DESC"
  ) {
    // console.log("getAccountTransactions memberId: ", memberId);
    const params = `memberId=${memberId}&limit=${limit}&offset=${offset}&orderBy=${orderBy}&orderDir=${orderDir}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.TRANSACTIONS.FIND}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log("getAccountTransactions result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function getAccountSavingsTransactions
   * @description Retrieves transactions savings for the given account.
   * @param {number} memberId - The member ID.
   * @param {number} [limit=10] - The number of records to return. Defaults to 10.
   * @param {number} [offset=0] - The record offset. Defaults to 0.
   * @param {string} [orderBy="FECHA"] - The field to order by. Defaults to "FECHA".
   * @param {string} [orderDir="DESC"] - The order direction. Defaults to "DESC".
   * @returns {Promise<import("./types").IAccountTransaction[]>}
   */
  async getAccountSavingsTransactions(
    memberId,
    limit = 10,
    offset = 0,
    orderBy = "FECHA",
    orderDir = "DESC"
  ) {
    // console.log("getAccountSavingsTransactions memberId: ", memberId);
    const params = `memberId=${memberId}&limit=${limit}&offset=${offset}&orderBy=${orderBy}&orderDir=${orderDir}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.TRANSACTIONS.SAVINGS}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log("getAccountSavingsTransactions result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the withdrawals transactions for a given member ID.
   *
   * @param {string} memberId - The ID of the member to retrieve withdrawals transactions for.
   * @param {number} [limit=10] - The maximum number of transactions to retrieve.
   * @param {number} [offset=0] - The offset from which to retrieve transactions.
   * @param {string} [orderBy="FECHA"] - The column by which to order the transactions.
   * @param {string} [orderDir="DESC"] - The direction in which to order the transactions.
   * @return {object} The withdrawals transactions data for the member.
   */
  async getAccountWithdrawalsTransactions(
    memberId,
    limit = 10,
    offset = 0,
    orderBy = "FECHA",
    orderDir = "DESC"
  ) {
    // console.log("getAccountWithdrawalsTransactions memberId: ", memberId);
    const params = `memberId=${memberId}&limit=${limit}&offset=${offset}&orderBy=${orderBy}&orderDir=${orderDir}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.TRANSACTIONS.WITHDRAWALS}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log("getAccountWithdrawalsTransactions result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the monthly discounts for a given member ID.
   *
   * @param {string} memberId - The ID of the member to retrieve monthly discounts for.
   * @return {object} The monthly discounts data for the member.
   */
  async getMonthlyDiscounts(memberId) {
    // console.log("getMonthlyDiscounts memberId: ", memberId);
    const params = `memberId=${memberId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.TRANSACTIONS.DISCOUNTS.MONTHLY}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();
      // console.log("getMonthlyDiscounts result: ", result);
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentYearMonthlyDiscounts(memberId) {
    // console.log("getCurrentYearMonthlyDiscounts memberId: ", memberId);
    const params = `memberId=${memberId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.TRANSACTIONS.DISCOUNTS.CURRENT_YEAR.MONTHLY}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();
      // console.log("getCurrentYearMonthlyDiscounts result: ", result);
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the total savings amount for the last month given a member ID.
   *
   * @param {string} memberId - The ID of the member to retrieve the total savings amount for.
   * @return {object} The total savings amount data for the member.
   */
  async getLastMonthTotalContributionAmount(memberId) {
    // console.log("getLastMonthTotalContributionAmount memberId: ", memberId);
    const params = `memberId=${memberId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.SAVINGS.MONTHLY.TOTAL_AMOUNT}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();
      // console.log("getLastMonthTotalContributionAmount result: ", result);
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the total savings amount for the last two months given a member ID.
   *
   * @param {string} memberId - The ID of the member to retrieve the total savings amount for.
   * @return {object} The total savings amount data for the member.
   */
  async getLastTwoMonthTotalContributionAmount(memberId) {
    // console.log("getLastMonthTotalContributionAmount memberId: ", memberId);
    const params = `memberId=${memberId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.SAVINGS.HISTORY.LAST_TWO_MONTHS}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();
      // console.log("getLastTwoMonthTotalContributionAmount result: ", result);
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the total savings for a given member ID.
   *
   * @param {string} memberId - The ID of the member to retrieve savings for.
   * @return {object} The total savings data for the member.
   */
  async getTotalSavings(memberId) {
    // console.log("getTotalSavings memberId: ", memberId);
    const params = `memberId=${memberId}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.SAVINGS.TOTAL}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log("getTotalSavings result: ", result);

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
    // console.log("getTotalWithdrawals memberId: ", memberId);
    const params = `memberId=${memberId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.WITHDRAW.TOTAL}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log("getTotalWithdrawals result: ", result);

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
    // console.log("getContributionBalance memberId: ", memberId);
    const params = `memberId=${memberId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.BALANCE}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log("getContributionBalance result: ", result);

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
