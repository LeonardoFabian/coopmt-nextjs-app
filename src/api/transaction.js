import { ENV, authFetch } from "@/utils";

export class Transaction {
  async getByLoanId(loanId) {
    console.log("GET TRANSACTION API CALL: ", loanId);
  }
}
