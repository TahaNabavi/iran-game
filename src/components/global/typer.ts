import { RefObject } from "react";

export default function inputTyper(
  ref: HTMLInputElement,
  content: string,
  timer = 15
) {
  ref.value = "";
  content
    .split("")
    .map((e, i) => setTimeout(() => (ref.value = ref.value + e), timer * i));
}
export function typer(
  ref: RefObject<HTMLSpanElement>,
  content: string,
  timer = 15
) {
  const span = ref.current;
  if (!span) return;

  span.textContent = "";
  const chars = content.split("");

  let i = 0;
  const intervalId = setInterval(() => {
    if (i >= chars.length) {
      clearInterval(intervalId);
      return;
    }
    span.textContent += chars[i];
    i++;
  }, timer);
}