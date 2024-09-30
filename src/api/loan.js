import { ENV, authFetch } from "@/utils";

export class Loan {
  async getUserActiveLoans(memberId) {
    // console.log("memberId: ", memberId);
    const params = `memberId=${memberId}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ACCOUNT.LOANS.ACTIVE}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      console.log("getUserActiveLoans result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
