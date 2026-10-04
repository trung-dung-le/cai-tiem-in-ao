import { benefits } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";
import { Bubbles } from "./Bubbles";

export function Benefits() {
  return (
    <section aria-label="Quyền lợi khi mua sắm" className="relative isolate overflow-x-clip border-y border-line bg-surface">
      <Bubbles preset="benefits" />
      <ul className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((item, i) => (
          <li key={item.title} data-reveal style={revealDelay(i)}>
            <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
            <h3 className="mt-2 font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
