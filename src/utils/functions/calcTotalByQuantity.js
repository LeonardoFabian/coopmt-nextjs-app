export function calcTotalByQuantity(price, quantity) {
  if (quantity < 1) return null;
  if (quantity === 1) return price;

  const total = price * quantity;

  return total;
}
