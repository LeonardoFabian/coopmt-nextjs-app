export function calcDiscount(price, discount) {
  if (!discount) return price;

  const discountAmount = (price * discount) / 100;
  console.log("Price: ", price);
  console.log("Discount amount: ", discountAmount);

  const finalPrice = price - discountAmount;

  return finalPrice;
}
