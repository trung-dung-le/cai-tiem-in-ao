import { serviceGroups } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";
import { SectionHeading } from "./SectionHeading";
import { Bubbles } from "./Bubbles";
import { ServicesCard } from "./ServicesCard";

export function Services() {
  return (
    <section id="dich-vu" className="relative isolate overflow-hidden">
      <Bubbles preset="services" />
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading
          eyebrow="Dịch vụ"
          title="Tiệm in gì cho bạn?"
          body="Dù là một chiếc áo làm quà hay cả chục chiếc cho lớp, Tiệm đều làm tỉ mỉ như nhau."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {serviceGroups.map((group, i) => (
            <div key={group.name} data-reveal style={revealDelay(i, 120)}>
              <ServicesCard group={group} id={`dich-vu-${i}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
