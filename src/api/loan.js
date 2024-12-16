import { ENV, authFetch } from "@/utils";

export class Loan {
  async sendLoanRequestApplication(userId, data) {
    // console.log("Data: ", data);
    // console.log("userId: ", userId);
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LOAN_REQUEST}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...data,
            user: userId,
            status: 1,
          },
        }),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserLoanRequests(userId) {
    try {
      const populate = `populate=*`;
      const filters = `filters[user][id][$eq]=${userId}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LOAN_REQUEST}?${filters}&${populate}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a list of loan types from the API.
   *
   * @return {Promise<object[]>} The JSON response containing the list of loan types.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async getLoanTypes() {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LOANS.CLASSIFICATIONS}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a list of loan disbursement methods from the API.
   *
   * @return {Promise<object[]>} The JSON response containing the list of loan disbursement methods.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async getLoanDisbursementMethods() {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LOANS.DISBURSEMENT_METHODS}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a list of loan collaterals from the API.
   *
   * @return {Promise<object[]>} The JSON response containing the list of loan collaterals.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async getLoanCollaterals() {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LOANS.COLLATERALS}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserActiveLoans(memberId) {
    // console.log("memberId: ", memberId);
    const params = `memberId=${memberId}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.LOANS.ACTIVE.FIND}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log("getUserActiveLoans result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the details of a given loan ID.
   *
   * @param {string} loanId - The ID of the loan to retrieve the details for.
   * @return {Promise<import("./types").ILoanDetails>} The loan details data.
   */
  async getLoanDetails(loanId) {
    // console.log("loanId: ", loanId);
    const params = `loanId=${loanId}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.LOANS.ACTIVE.FIND_ONE.DETAILS}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log("getLoanDetails result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the details of the next installment of a given loan ID.
   *
   * @param {string} loanId - The ID of the loan to retrieve the details for.
   * @return {Promise<import("./types").ILoanNextInstallmentDetails>} The loan next installment details data.
   */
  async getLoanNextInstallmentDetails(loanId) {
    // console.log("loanId: ", loanId);
    const params = `loanId=${loanId}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.LOANS.ACTIVE.FIND_ONE.INSTALLMENTS.NEXT_ONE.DETAILS}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log("getLoanNextInstallmentDetails result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the details of the next TOP 1 installment of all active loans of a given member ID.
   *
   * @param {string} memberId - The ID of the member to retrieve the next installment details for.
   * @return {Promise<import("./types").IMemberLoansNextInstallmentDetails[]>} The next installment details data for the member.
   */
  async getMemberLoansNextInstallmentDetails(memberId) {
    // console.log("memberId: ", memberId);
    const params = `memberId=${memberId}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.LOANS.ACTIVE.INSTALLMENTS.NEXT_ONE.DETAILS}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log("getMemberLoansNextInstallmentDetails result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the details of the next installments of all active loans of a given member ID.
   *
   * @param {string} memberId - The ID of the member to retrieve the next installment details for.
   * @return {Promise<import("./types").IMemberLoansNextInstallmentDetails[]>} The next installment details data for the member.
   */
  async getMemberActiveLoansNextInstallmentsDetails(memberId) {
    // console.log("memberId: ", memberId);
    const params = `memberId=${memberId}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.LOANS.ACTIVE.INSTALLMENTS.NEXT_ALL.DETAILS}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log(
      //   "getMemberActiveLoansNextInstallmentsDetails result: ",
      //   result
      // );

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the amortization schedule for a given loan ID.
   *
   * @param {string} loanId - The ID of the loan to retrieve the amortization schedule for.
   * @return {Promise<import("./types").IAmortizationSchedule[]>} The amortization schedule data for the loan.
   */
  async getLoanAmortizationSchedule(loanId) {
    // console.log("loanId: ", loanId);
    const params = `loanId=${loanId}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.LOANS.ACTIVE.FIND_ONE.AMORTIZATION_SCHEDULE}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log("getLoanAmortizationSchedule result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the total loans amount for the last month given a member ID.
   *
   * @param {string} memberId - The ID of the member to retrieve the total loans amount for.
   * @return {object} The total loans amount data for the member.
   */
  async getLastMonthTotalLoansAmount(memberId) {
    // console.log("memberId: ", memberId);
    const params = `memberId=${memberId}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.LOANS.MONTHLY.TOTAL_AMOUNT}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log("getLastMonthTotalLoansAmount result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the total loans amount for the last two months given a member ID.
   *
   * @param {string} memberId - The ID of the member to retrieve the total loans amount for.
   * @return {object} The total loans amount data for the member.
   */
  async getLastTwoMonthTotalLoansAmount(memberId) {
    // console.log("memberId: ", memberId);
    const params = `memberId=${memberId}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.LOANS.HISTORY.LAST_TWO_MONTHS}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      // console.log("getLastTwoMonthTotalLoansAmount result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
