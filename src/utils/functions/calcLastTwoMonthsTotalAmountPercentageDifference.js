/**
 * Calculate the percentage difference between the total amount of the current month
 * and the previous month.
 *
 * @param {number} currentMonthAmount - The total amount of the current month.
 * @param {number} previousMonthAmount - The total amount of the previous month.
 *
 * @returns {object} An object containing the percentage difference and the
 *   status of the percentage difference.
 *
 *   - `percentage`: The percentage difference as a number. If the difference is
 *     0, the value is 0. If the previous month's value is 0, the value is 100 if
 *     the current month's value is positive, 0 if the current month's value is
 *     zero, or -100 if the current month's value is negative.
 *   - `status`: A string indicating whether the percentage difference is an
 *     increase ("+"), a decrease ("-"), or unchanged ("=").
 */
export function calcLastTwoMonthsTotalAmountPercentageDifference(
  currentMonthAmount,
  previousMonthAmount
) {
  if (previousMonthAmount === 0) {
    return {
      percentage: currentMonthAmount > 0 ? 100 : 0,
      status: currentMonthAmount > 0 ? "+" : "-",
    };
  }

  const difference = currentMonthAmount - previousMonthAmount;
  const percentage = (difference / previousMonthAmount) * 100;

  return {
    percentage: percentage.toFixed(3),
    status: percentage > 0 ? "+" : percentage < 0 ? "-" : "=",
  };
}
