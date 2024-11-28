import { ENV, authFetch } from "@/utils";

export class Bank {
  /**
   * Retrieves a list of financial institutions from the API.
   *
   * @return {object} The JSON response containing the list of financial institutions.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async getFinancialInstitutions() {
    const populate = `populate=*`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BANKS.FINANCIAL_INSTITUTIONS}?${populate}`;
    try {
      const response = await authFetch(url);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a list of account types from the API.
   *
   * @return {object} The JSON response containing the list of account types.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async getAccountTypes() {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BANKS.ACCOUNTS.TYPES}`;
    try {
      const response = await authFetch(url);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
