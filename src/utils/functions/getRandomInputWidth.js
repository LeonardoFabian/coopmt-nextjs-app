export function getRandomInputWidth() {
  const widths = [3, 4, 5, 6];
  return widths[Math.floor(Math.random() * widths.length)];
}
