import { hero } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";
import { Photo } from "./Photo";
import { SmartLink } from "./SmartLink";
import { Bubbles } from "./Bubbles";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Bubbles preset="hero" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-28 md:grid-cols-2 md:pt-36">
        <div>
          <p className="animate-fade-up inline-block rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            {hero.eyebrow}
          </p>
          <h1 style={revealDelay(1, 120)} className="animate-fade-up mt-5 font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            {hero.title}
            <br />
            <span className="text-accent">{hero.titleAccent}</span>
          </h1>
          <p style={revealDelay(2, 120)} className="animate-fade-up mt-6 max-w-md text-lg text-muted">{hero.body}</p>

          <div style={revealDelay(3, 120)} className="animate-fade-up mt-8 flex flex-wrap gap-3">
            <SmartLink
              href={hero.primaryCta.href}
              className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition hover:bg-foreground"
            >
              {hero.primaryCta.label}
            </SmartLink>
            <SmartLink
              href={hero.secondaryCta.href}
              className="rounded-full border border-accent/30 px-7 py-3 text-sm font-medium transition hover:border-accent"
            >
              {hero.secondaryCta.label}
            </SmartLink>
          </div>

          {hero.stats.length > 0 && (
            <dl style={revealDelay(4, 120)} className="animate-fade-up mt-12 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</dt>
                  <dd className="font-display text-2xl font-bold text-accent sm:text-3xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div style={revealDelay(2, 120)} className="animate-fade-up">
          <Photo
            src={hero.image}
            alt="Áo thun in theo yêu cầu tại Cái Tiệm In Áo"
            className="aspect-[4/5] rounded-[2rem]"
            tone="bg-accent-soft"
            sizes="(min-width: 768px) 50vw, 100vw"
            preload
          />
        </div>
      </div>
    </section>
  );
}
