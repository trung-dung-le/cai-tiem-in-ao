"use client";

import { useEffect, useRef, useState } from "react";
import type { ServiceGroup } from "@/lib/content";
import { openProduct } from "@/lib/openProduct";
import { Photo } from "./Photo";

const tones = ["bg-accent-soft", "bg-surface", "bg-[#f3e1f0]", "bg-accent-soft"];

// Viết sẵn class đầy đủ để Tailwind nhận ra (không ghép chuỗi động).
const dialogCols: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** Một thẻ gộp một nhóm dịch vụ; bấm vào mở popup xem chi tiết từng loại. */
export function ServicesCard({ group, id }: { group: ServiceGroup; id: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  const cover = group.items.slice(0, 4);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group block w-full text-left hover:-translate-y-1.5"
      >
        {/* Ảnh bìa: lưới 2×2; nếu chỉ có 3 ảnh thì ảnh đầu cao gấp đôi. */}
        <div className="relative grid aspect-[3/4] grid-cols-2 grid-rows-2 gap-1 overflow-hidden rounded-3xl transition-[border-radius] duration-500 group-hover:rounded-xl">
          {cover.map((item, i) => (
            <Photo
              key={item.name}
              src={item.image}
              alt={item.name}
              tone={tones[i % tones.length]}
              focus={item.focus}
              className={`h-full ${cover.length === 3 && i === 0 ? "row-span-2" : ""} ${cover.length === 1 ? "col-span-2 row-span-2" : ""}`}
              sizes="(min-width: 768px) 400px, 100vw"
              quality={90}
            />
          ))}
          <span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-xs font-medium text-accent">
            {group.tag}
          </span>
          <span className="absolute bottom-4 right-4 rounded-full bg-background px-4 py-2 text-sm font-semibold text-accent shadow">
            Xem chi tiết →
          </span>
        </div>
        <h3 className="mt-4 font-display text-2xl">{group.name}</h3>
        <p className="mt-1 text-sm text-muted">{group.body}</p>
      </button>

      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        aria-labelledby={`${id}-title`}
        className="m-auto w-[calc(100%-2rem)] max-w-5xl rounded-3xl bg-background p-0 text-foreground shadow-2xl backdrop:bg-foreground/50 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div className="max-h-[90dvh] overflow-y-auto p-5 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id={`${id}-title`} className="font-display text-3xl font-bold">
                  {group.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{group.body}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Đóng"
                className="rounded-full p-2 text-muted hover:bg-surface hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className={`mt-6 grid gap-6 ${dialogCols[Math.min(group.items.length, 4)]}`}>
              {group.items.map((item, i) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    setOpen(false);
                    if (item.product) {
                      e.preventDefault();
                      openProduct({ product: item.product, variant: item.variant });
                    }
                  }}
                  className="group block"
                >
                  <div className="relative">
                    <Photo
                      src={item.image}
                      alt={item.name}
                      tone={tones[i % tones.length]}
                      focus={item.focus}
                      className="aspect-[3/4] rounded-3xl transition-[border-radius] duration-500 group-hover:rounded-xl"
                      sizes="(min-width: 768px) 560px, 100vw"
                      quality={90}
                    />
                    {item.tag && (
                      <span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-xs font-medium text-accent">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <h4 className="mt-4 font-display text-2xl">{item.name}</h4>
                  <p className="mt-1 text-sm text-muted">{item.body}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
