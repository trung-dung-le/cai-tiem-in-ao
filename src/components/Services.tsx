import { services } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";
import { Photo } from "./Photo";
import { SectionHeading } from "./SectionHeading";
import { Bubbles } from "./Bubbles";

const tones = ["bg-accent-soft", "bg-surface", "bg-[#f3e1f0]"];

export function Services() {
  return (
    <section id="dich-vu" className="relative isolate overflow-hidden">
      <Bubbles preset="services" />
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading
          eyebrow="Dịch vụ"
          title="Tiệm in gì cho bạn?"
          body="Dù là một chiếc áo làm quà hay cả chục chiếc cho lớp, tiệm đều làm tỉ mỉ như nhau."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((item, i) => (
            <a key={item.name} href={item.href} data-reveal style={revealDelay(i, 120)} className="group block hover:-translate-y-1.5">
              <div className="relative">
                <Photo
                  src={item.image}
                  alt={item.name}
                  tone={tones[i % tones.length]}
                  className="aspect-[3/4] rounded-3xl transition-[border-radius] duration-500 group-hover:rounded-xl"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-xs font-medium text-accent">
                  {item.tag}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl">{item.name}</h3>
              <p className="mt-1 text-sm text-muted">{item.body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
