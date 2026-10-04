import { process } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";
import { SectionHeading } from "./SectionHeading";
import { Bubbles } from "./Bubbles";

export function Process() {
  return (
    <section id="quy-trinh" className="relative isolate overflow-hidden">
      <Bubbles preset="process" />
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading align="center" eyebrow={process.eyebrow} title={process.title} />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <li key={step.title} data-reveal="zoom" style={revealDelay(i, 120)} className="hover:-translate-y-1.5 hover:border-accent/40 relative rounded-3xl border border-line bg-background p-7">
              <span className="flex size-11 items-center justify-center rounded-full bg-accent-soft font-display text-xl font-bold text-accent">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
