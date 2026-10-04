import type { ReactNode } from "react";

/**
 * Thảm cỏ hoa mọc trên một đường viền ngang. Đặt bên trong phần tử `relative`;
 * dải nằm ngay phía trên mép trên của phần tử đó.
 *
 * Cỏ và hoa được sinh ngẫu nhiên nhưng dùng hạt giống cố định (SEED), nên lần
 * render nào cũng ra đúng một thảm giống nhau. Đổi SEED để có thảm khác.
 */

const SEED = 20260925;
const W = 2400; // bề rộng vùng vẽ; màn hình hẹp sẽ thấy phần giữa
const H = 64;
const GROUND = H; // đường kẻ nằm ở đáy SVG

const GRASS = ["#8fbf9f", "#a9d1b2", "#76ab88"];
const STEM = "#7fb391";
const PETALS = ["var(--accent)", "var(--accent-soft)", "#e58fb1", "#f3b6cc", "#cdb4e6", "#ffffff", "#fcd77f"];

/** Sinh số ngẫu nhiên có thể lặp lại (mulberry32). */
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => Math.round(n * 10) / 10;

function buildCarpet() {
  const rand = rng(SEED);
  const between = (min: number, max: number) => min + rand() * (max - min);
  const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rand() * arr.length)];

  // Cỏ: gom mỗi màu thành một path để SVG gọn nhẹ.
  const grass = GRASS.map(() => [] as string[]);
  for (let x = -10; x < W + 10; x += between(2.5, 7)) {
    const h = between(7, 24) * (rand() < 0.12 ? 1.4 : 1);
    const lean = between(-7, 7);
    const w = between(1.2, 2.4);
    const tipX = x + lean;
    const tipY = GROUND - h;
    grass[Math.floor(rand() * GRASS.length)].push(
      `M${f(x - w)} ${GROUND}Q${f(x + lean * 0.3)} ${f(GROUND - h * 0.55)} ${f(tipX)} ${f(tipY)}` +
        `Q${f(x + lean * 0.3 + w)} ${f(GROUND - h * 0.5)} ${f(x + w)} ${GROUND}Z`,
    );
  }

  // Hoa: loại, chiều cao, độ nghiêng, màu đều khác nhau.
  const flowers: ReactNode[] = [];
  let key = 0;
  for (let x = between(10, 40); x < W; x += between(14, 40)) {
    const stemH = between(14, H - 14);
    const sway = between(-8, 8);
    const hx = x + sway;
    const hy = GROUND - stemH;
    const petal = pick(PETALS);
    const type = rand();
    const parts: ReactNode[] = [];

    parts.push(
      <path
        key="s"
        d={`M${f(x)} ${GROUND}Q${f(x + sway * 0.2)} ${f(GROUND - stemH * 0.5)} ${f(hx)} ${f(hy)}`}
        stroke={STEM}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />,
    );
    if (rand() < 0.6) {
      const ly = GROUND - stemH * between(0.25, 0.55);
      const side = rand() < 0.5 ? -1 : 1;
      const lx = x + sway * 0.15 + side * 4;
      parts.push(
        <ellipse key="l" cx={f(lx)} cy={f(ly)} rx="5" ry="2.2" fill={pick(GRASS)} transform={`rotate(${side * 30} ${f(lx)} ${f(ly)})`} />,
      );
    }

    if (type < 0.34) {
      // Hoa 5 cánh
      const r = between(3.8, 6.2);
      const rot = between(0, 72);
      for (let k = 0; k < 5; k++) {
        const a = ((rot + k * 72) * Math.PI) / 180;
        parts.push(<circle key={`p${k}`} cx={f(hx + Math.cos(a) * r)} cy={f(hy + Math.sin(a) * r)} r={f(r)} fill={petal} />);
      }
      parts.push(<circle key="c" cx={f(hx)} cy={f(hy)} r={f(r * 0.6)} fill={petal === "#fcd77f" ? "var(--accent)" : "#fcd77f"} />);
    } else if (type < 0.56) {
      // Hoa cúc: nhiều cánh mảnh
      const n = 10 + Math.floor(rand() * 4);
      const len = between(5, 8);
      const color = rand() < 0.5 ? "#ffffff" : petal;
      for (let k = 0; k < n; k++) {
        const deg = (360 / n) * k;
        const a = (deg * Math.PI) / 180;
        const cx = hx + Math.cos(a) * len * 0.7;
        const cy = hy + Math.sin(a) * len * 0.7;
        parts.push(
          <ellipse key={`p${k}`} cx={f(cx)} cy={f(cy)} rx={f(len * 0.55)} ry="1.3" fill={color} transform={`rotate(${f(deg)} ${f(cx)} ${f(cy)})`} />,
        );
      }
      parts.push(<circle key="c" cx={f(hx)} cy={f(hy)} r="2.4" fill="#fcd77f" />);
    } else if (type < 0.74) {
      // Tulip
      const s = between(5, 7.5);
      parts.push(
        <path
          key="t"
          d={`M${f(hx - s)} ${f(hy - s * 0.4)}L${f(hx - s * 0.5)} ${f(hy - s * 1.3)}L${f(hx)} ${f(hy - s * 0.6)}L${f(hx + s * 0.5)} ${f(hy - s * 1.3)}L${f(hx + s)} ${f(hy - s * 0.4)}Q${f(hx + s)} ${f(hy + s * 0.9)} ${f(hx)} ${f(hy + s * 0.9)}Q${f(hx - s)} ${f(hy + s * 0.9)} ${f(hx - s)} ${f(hy - s * 0.4)}Z`}
          fill={petal === "#ffffff" ? "var(--accent)" : petal}
        />,
      );
    } else if (type < 0.88) {
      // Chùm hoa nhỏ
      const n = 3 + Math.floor(rand() * 4);
      for (let k = 0; k < n; k++) {
        parts.push(
          <circle key={`b${k}`} cx={f(hx + between(-5, 5))} cy={f(hy + between(-5, 3))} r={f(between(2, 3.4))} fill={pick(PETALS)} />,
        );
      }
    } else {
      // Nụ hoa
      const s = between(3, 4.6);
      parts.push(<ellipse key="n" cx={f(hx)} cy={f(hy - s * 0.4)} rx={f(s * 0.8)} ry={f(s * 1.3)} fill={petal === "#ffffff" ? "#e58fb1" : petal} />);
      parts.push(<path key="d" d={`M${f(hx - s)} ${f(hy + s * 0.3)}Q${f(hx)} ${f(hy - s * 0.6)} ${f(hx + s)} ${f(hy + s * 0.3)}`} stroke={STEM} strokeWidth="1.6" fill="none" />);
    }

    flowers.push(<g key={key++}>{parts}</g>);
  }

  return { grass: grass.map((d) => d.join("")), flowers };
}

// Tính một lần khi nạp module.
const carpet = buildCarpet();

export function FlowerBorder() {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-x-0 bottom-full h-16 w-full"
    >
      {/* Cỏ phía sau, hoa phía trước */}
      {carpet.grass.map((d, i) => (
        <path key={i} d={d} fill={GRASS[i]} opacity={i === 0 ? 0.9 : 1} />
      ))}
      {carpet.flowers}
    </svg>
  );
}
