import type { CSSProperties } from "react";

/**
 * Hình tròn trang trí phía sau nội dung. Section chứa nó cần có
 * `relative isolate overflow-hidden` để hình nằm dưới nội dung và không tràn ngang.
 *
 * Mỗi hình: `c` là class vị trí/kích thước/màu, `float` để trôi lơ lửng nhẹ.
 */
type Bubble = { c: string; float?: boolean; delay?: number };

const ring = "border-2 border-accent bg-accent";
const dot = "bg-accent/35";
const outline = "border-2 border-accent/25";

const presets = {
  hero: [
    { c: "-right-32 -top-24 size-[28rem] bg-accent-soft/70" },
    { c: "-left-28 top-1/2 size-64 bg-[#f3e1f0]/70" },
    { c: `right-[6%] bottom-10 size-28 ${ring}`, float: true },
    { c: `left-[44%] top-32 size-5 ${dot}`, float: true, delay: 1 },
    { c: `left-[6%] top-28 size-3 ${dot}`, float: true, delay: 2 },
  ],
  benefits: [
    { c: `left-[38%] -bottom-8 size-16 ${ring}` },
  ],
  services: [
    { c: "-left-32 top-28 size-80 bg-accent-soft/50" },
    { c: `right-[5%] top-16 size-20 ${ring}`, float: true },
    { c: `right-[28%] top-28 size-3 ${dot}`, float: true, delay: 1.5 },
    { c: "-right-24 bottom-6 size-56 bg-[#f3e1f0]/60" },
  ],
  // Section sản phẩm cao (nhiều hàng) nên rải hình tròn theo % chiều cao.
  products: [
    { c: "-right-28 top-[6%] size-80 bg-accent-soft/50" },
    { c: "-left-36 top-[34%] size-96 bg-[#f3e1f0]/60" },
    { c: "-right-24 top-[60%] size-72 bg-accent-soft/40" },
    { c: "-left-20 bottom-8 size-56 bg-accent/10" },
    { c: `left-[4%] top-[8%] size-24 ${outline}`, float: true, delay: 1 },
    { c: `right-[3%] top-[42%] size-32 ${outline}`, float: true, delay: 3 },
    { c: `left-[46%] bottom-[3%] size-20 ${outline}`, float: true, delay: 2.5 },
    { c: `left-[42%] top-14 size-4 ${dot}`, float: true },
    { c: `left-[2%] top-[55%] size-3 ${dot}`, float: true, delay: 1.5 },
    { c: `right-[30%] top-[33%] size-2.5 ${dot}`, float: true, delay: 0.5 },
    { c: `right-[8%] top-[78%] size-3.5 ${dot}`, float: true, delay: 2 },
    { c: `right-[12%] bottom-20 size-16 ${ring}`, float: true, delay: 2 },
  ],
  process: [
    { c: "-right-24 top-1/3 size-72 bg-[#f3e1f0]/70" },
    { c: "-left-28 bottom-0 size-60 bg-accent-soft/45" },
    { c: `left-[6%] top-20 size-16 ${ring}`, float: true },
    { c: `left-[22%] bottom-16 size-3 ${dot}`, float: true, delay: 1 },
  ],
  testimonials: [
    { c: "-right-20 bottom-0 size-64 bg-accent/10" },
    { c: `right-[10%] top-20 size-24 ${ring}`, float: true },
    { c: `left-[28%] top-16 size-3 ${dot}`, float: true, delay: 1.5 },
  ],
  contact: [
    { c: "-right-32 top-8 size-80 bg-accent-soft/50" },
    { c: "-left-24 bottom-8 size-60 bg-[#f3e1f0]/60" },
    { c: `left-[3%] top-6 size-14 ${ring}`, float: true },
    { c: `right-[20%] top-14 size-3 ${dot}`, float: true, delay: 2 },
  ],
} satisfies Record<string, Bubble[]>;

export function Bubbles({ preset }: { preset: keyof typeof presets }) {
  return (
    <>
      {(presets[preset] as Bubble[]).map((b, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={b.delay ? ({ "--float-delay": `${b.delay}s` } as CSSProperties) : undefined}
          className={`pointer-events-none absolute -z-10 rounded-full ${b.float ? "animate-float" : ""} ${b.c}`}
        />
      ))}
    </>
  );
}
