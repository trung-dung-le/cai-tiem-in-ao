"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { site, testimonials } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Bubbles } from "./Bubbles";

const avatarTones = ["bg-accent-soft", "bg-[#f3e1f0]", "bg-[#ffe4d6]", "bg-[#e3ecff]", "bg-[#e0f3ea]"];

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  // Mỗi lần bấm trượt đúng một thẻ.
  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.clientWidth + gap), behavior: "smooth" });
  };

  return (
    <section id="danh-gia" className="relative isolate overflow-x-clip bg-surface py-24">
      <Bubbles preset="testimonials" />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading align="center" eyebrow="Đánh giá" title={`Khách nói gì về ${site.name}`} />
        {testimonials.sample && (
          <p className="mx-auto mt-4 w-fit rounded-full border border-dashed border-accent px-4 py-1 text-xs font-medium text-accent">
            Đánh giá mẫu — sẽ được thay bằng đánh giá thật
          </p>
        )}

        <div data-reveal className="relative mt-12">
          <ArrowButton dir={-1} disabled={!canPrev} onClick={() => scroll(-1)} />

          <ul
            ref={trackRef}
            aria-label="Danh sách đánh giá"
            className="no-scrollbar -my-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-6"
          >
            {testimonials.items.map((t, i) => (
              <li
                key={i}
                className="w-full shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <figure className="flex h-full flex-col rounded-3xl bg-background p-7 shadow-[0_12px_30px_-18px_rgba(194,69,122,0.35)]">
                  {t.chat && (
                    // Ảnh chat cắt theo khung, hiện từ đầu đoạn chat.
                    <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl border border-black/5 bg-surface">
                      <Image
                        src={t.chat}
                        alt={`Tin nhắn feedback của ${t.name}`}
                        fill
                        sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                  <figcaption className="flex items-center gap-3">
                    <div
                      className={`relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full font-display text-lg font-bold text-accent ${avatarTones[i % avatarTones.length]}`}
                    >
                      {t.avatar ? (
                        <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
                      ) : (
                        <span aria-hidden="true">{initials(t.name)}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted">Khách qua {t.source}</p>
                    </div>
                  </figcaption>
                  <p className="mt-4 tracking-widest text-accent" role="img" aria-label="5 trên 5 sao">
                    ★★★★★
                  </p>
                  <blockquote className="mt-2 flex-1 leading-relaxed">“{t.quote}”</blockquote>
                  <p className="mt-5 w-fit rounded-full bg-surface px-3 py-1 text-xs text-muted">{t.service}</p>
                </figure>
              </li>
            ))}
          </ul>

          <ArrowButton dir={1} disabled={!canNext} onClick={() => scroll(1)} />
        </div>
      </div>
    </section>
  );
}

function ArrowButton({ dir, disabled, onClick }: { dir: 1 | -1; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === -1 ? "Đánh giá trước" : "Đánh giá tiếp theo"}
      className={`absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-lg transition hover:bg-foreground disabled:pointer-events-none disabled:opacity-0 ${
        dir === -1 ? "-left-3 sm:-left-5" : "-right-3 sm:-right-5"
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === -1 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}
