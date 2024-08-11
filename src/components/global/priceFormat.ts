export default function priceFormat(num: number) {
  if (num < 0) num = -1 * num;
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
