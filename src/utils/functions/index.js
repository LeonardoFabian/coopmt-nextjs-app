import { calcDiscount } from "./calcDiscount";
import { calcLoansTotalBalance } from "./calcLoansTotalBalance";
import { calcTotalByQuantity } from "./calcTotalByQuantity";
import { getStringInitials } from "./getStringInitials";
import { formatDate } from "./formatDate";
import { getFirstWordForString } from "./getFirstWordForString";
import { getCurrentDateTime } from "./getCurrentDateTime";
import { getCurrentDateTimeInHumansReadable } from "./getCurrentDateTimeInHumansReadable";
import { getCurrentYear } from "./getCurrentYear";
import { calcLastTwoMonthsTotalAmountPercentageDifference } from "./calcLastTwoMonthsTotalAmountPercentageDifference";
import { calcSingleLoanInstallmentTotalAmount } from "./calcLoanInstallmentTotalAmount";
import { toUpper } from "./toUpper";
import { getRandomInputWidth } from "./getRandomInputWidth";
// import checkMembership from "./checkMembership";

export const fn = {
  calcDiscount,
  calcLoansTotalBalance,
  calcTotalByQuantity,
  getStringInitials,
  formatDate,
  getFirstWordForString,
  getCurrentDateTime,
  getCurrentDateTimeInHumansReadable,
  getCurrentYear,
  calcLastTwoMonthsTotalAmountPercentageDifference,
  calcSingleLoanInstallmentTotalAmount,
  toUpper,
  getRandomInputWidth,
  // checkMembership,
};
