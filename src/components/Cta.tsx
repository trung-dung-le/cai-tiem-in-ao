import { cta } from "@/lib/content";
import { SmartLink } from "./SmartLink";

// Icon Facebook lấy path từ Simple Icons (viewBox 24x24).
const facebookPath =
  "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z";

export function Cta() {
  return (
    <section id="dat-in" className="px-5 py-24">
      <div
        data-reveal="zoom"
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-accent-soft via-[#fbe0ea] to-[#f3e1f0] px-6 py-16 text-center shadow-[0_24px_60px_-30px_rgba(194,69,122,0.45)] sm:px-12 sm:py-20"
      >
        {/* Hình tròn trang trí */}
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-accent/10" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[18%] top-10 size-4 rounded-full bg-accent/30" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-12 left-[14%] size-3 rounded-full bg-accent" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.4 6.9H22l-6 4.6 2.3 7.1L12 16.2 5.7 20.6 8 13.5 2 8.9h7.6z" />
            </svg>
            Đặt in ngay hôm nay
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold sm:text-5xl">{cta.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted sm:text-lg">{cta.body}</p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SmartLink
              href={cta.button.href}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:bg-foreground sm:w-auto"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={facebookPath} />
              </svg>
              {cta.button.label}
            </SmartLink>
            <SmartLink
              href={cta.zaloButton.href}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-accent shadow-lg shadow-accent/10 transition hover:-translate-y-0.5 hover:bg-foreground hover:text-white sm:w-auto"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.8L3 21l1.9-4.9A8.4 8.4 0 1 1 21 11.5Z" />
              </svg>
              {cta.zaloButton.label}
            </SmartLink>
          </div>
          <p className="mt-5 text-xs text-muted">{cta.note}</p>
        </div>
      </div>
    </section>
  );
}
