"use client";

import Image from "next/image";
import { useState } from "react";
import { nav, site } from "@/lib/content";
import { SmartLink } from "./SmartLink";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-2.5 font-display text-2xl font-bold text-accent">
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-line bg-white">
            <Image src="/images/logo.jpg" alt="" fill sizes="44px" loading="eager"className="scale-[1.35] object-cover" />
          </span>
          {site.name}
        </a>

        <nav aria-label="Điều hướng chính" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-muted transition hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SmartLink
          href={site.facebook}
          className="hidden rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-foreground md:inline-block"
        >
          Đặt in ngay
        </SmartLink>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          className="-mr-2 p-2 md:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Điều hướng di động" className="border-t border-line bg-background md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="block py-3 text-base">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
