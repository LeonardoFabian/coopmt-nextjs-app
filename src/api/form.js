import { ENV, authFetch } from "@/utils";

export class Form {
  /**
   * Retrieves the schema for the loan request form.
   *
   * @return {Promise<object>} The schema data for the loan request form.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async getLoanRequestFormSchema() {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.FORMS.LOANS.APPLICATION}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();
      console.log("LoanRequestFormSchema result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
