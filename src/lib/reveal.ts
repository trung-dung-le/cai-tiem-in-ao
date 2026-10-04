import type { CSSProperties } from "react";

/** Độ trễ cho phần tử thứ `i` trong một nhóm `data-reveal`, để các thẻ hiện lần lượt. */
export function revealDelay(i: number, step = 90): CSSProperties {
  return { "--reveal-delay": `${i * step}ms` } as CSSProperties;
}
