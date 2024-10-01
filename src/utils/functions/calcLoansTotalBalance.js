export function calcLoansTotalBalance(loans) {
  if (!loans || loans.length === 0) return 0;

  return loans.activeLoans.reduce((sum, loan) => sum + loan.totalBalance, 0);
}
