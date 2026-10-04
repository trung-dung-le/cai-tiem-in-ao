"use client";

import { useEffect } from "react";

/**
 * Đặt một lần trong trang. Mọi phần tử có thuộc tính `data-reveal` sẽ trồi lên
 * khi được cuộn tới (xem CSS trong globals.css). Nếu JS chưa chạy thì nội dung
 * vẫn hiển thị bình thường.
 */
export function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    // Phần tử đang nằm sẵn trong màn hình (vd. tải lại trang giữa chừng) thì hiện luôn,
    // tránh bị chớp ẩn rồi hiện.
    const vh = window.innerHeight;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add("is-visible");
    }
    document.documentElement.setAttribute("data-reveal-ready", "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    for (const el of els) if (!el.classList.contains("is-visible")) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return null;
}
