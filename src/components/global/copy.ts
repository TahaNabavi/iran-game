import { MouseEvent } from "react";

export default function copyToClipboard(event: MouseEvent<HTMLButtonElement>) {
  const text = event.currentTarget.innerText;
  navigator.clipboard.writeText(text).then(
    () => console.log("Text copied to clipboard"),
    (err) => console.error("Error copying text to clipboard:", err)
  );
}
