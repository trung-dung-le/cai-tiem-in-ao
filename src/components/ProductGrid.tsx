"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { formatPrice, products, site } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";
import { OPEN_PRODUCT_EVENT, type OpenProductDetail } from "@/lib/openProduct";
import { Photo } from "./Photo";
import { SmartLink } from "./SmartLink";

type Product = (typeof products)[number];

function priceLabel(price: Product["price"]) {
  if (price === null) return "Liên hệ báo giá";
  return typeof price === "string" ? price : `Từ ${formatPrice(price)}`;
}

/** `row`: các tag cùng `row` được xếp chung một hàng trên lưới. */
const FLAGS = {
  allday: { label: "All days – All nights", icon: "☀", row: "allday", className: "bg-[#fff1d6] text-[#8a4f00]" },
  winter: { label: "Winter", icon: "❄", row: "winter", className: "bg-[#e0efff] text-[#2b5f93]" },
  accessories: { label: "Accessories", icon: "✿", row: "extras", className: "bg-[#f3e1f0] text-[#8e4a9e]" },
  gifts: { label: "Gifts", icon: "♥", row: "extras", className: "bg-[#ffe1e8] text-[#b8304f]" },
} as const;

const rowOf = (item: Product) => (item.flag ? FLAGS[item.flag].row : undefined);

/** Gom các sản phẩm liền nhau cùng hàng (theo tag) thành một hàng riêng. */
function groupByFlag(items: readonly Product[]) {
  const groups: Product[][] = [];
  for (const item of items) {
    const last = groups.at(-1);
    if (last && rowOf(last[0]) === rowOf(item)) last.push(item);
    else groups.push([item]);
  }
  return groups;
}

/** Lưới sản phẩm; bấm vào một sản phẩm để mở popup xem chi tiết. */
export function ProductGrid() {
  const [active, setActive] = useState<Product | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  // Nơi khác (popup Dịch vụ) yêu cầu mở một sản phẩm: cuộn tới thẻ rồi mở popup đúng lựa chọn.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onOpen = (e: Event) => {
      const { product: name, variant } = (e as CustomEvent<OpenProductDetail>).detail;
      const product = products.find((p) => p.name === name);
      if (!product) return;
      const leading = [product.image, ...(product.gallery ?? [])].filter(Boolean).length;
      const v = variant ? (product.variants ?? []).findIndex((x) => x.name === variant) : -1;
      document
        .querySelector(`[data-product="${CSS.escape(product.name)}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      clearTimeout(timer);
      timer = setTimeout(() => {
        setStartIndex(v >= 0 ? leading + v : 0);
        setActive(product);
      }, 600);
    };
    window.addEventListener(OPEN_PRODUCT_EVENT, onOpen);
    return () => {
      window.removeEventListener(OPEN_PRODUCT_EVENT, onOpen);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="mt-12 space-y-10">
        {groupByFlag(products).map((group) => (
          <ul key={group[0].name} className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {group.map((item, i) => (
              <li key={item.name} data-product={item.name} data-reveal style={revealDelay(i)} className="scroll-mt-24 hover:-translate-y-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setStartIndex(0);
                    setActive(item);
                  }}
                  aria-haspopup="dialog"
                  className="group block w-full cursor-pointer text-left"
                >
                  <div className="relative">
                    {item.variants?.length && !item.image ? (
                      <VariantSplit variants={item.variants.filter((v) => v.image)} topChips={Number(!!item.badge) + Number(!!item.flag)} className="aspect-[3/4] rounded-2xl" sizes="(min-width: 1024px) 25vw, 50vw" />
                    ) : (
                      <Photo
                        src={item.image}
                        alt={item.name}
                        tone="bg-background"
                        className="aspect-[3/4] rounded-2xl"
                        sizes="(min-width: 1024px) 25vw, 50vw"
                      />
                    )}
                    {(item.badge || item.flag) && (
                      <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
                        {item.badge && (
                          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">{item.badge}</span>
                        )}
                        {item.flag && <FlagChip flag={item.flag} />}
                      </div>
                    )}
                    <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-accent opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                      Xem chi tiết
                    </span>
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-wider text-muted">{item.category}</p>
                  <h3 className="mt-1 font-medium group-hover:text-accent">{item.name}</h3>
                  <p className="mt-1 font-semibold text-accent">{priceLabel(item.price)}</p>
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <ProductDialog key={`${active?.name}-${startIndex}`} product={active} startIndex={startIndex} onClose={() => setActive(null)} />
    </>
  );
}

function ProductDialog({ product, startIndex = 0, onClose }: { product: Product | null; startIndex?: number; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(startIndex);

  const images: Slide[] = product
    ? [
        ...[product.image, ...(product.gallery ?? [])].filter(Boolean).map((src) => ({ src })),
        ...(product.variants ?? []).map((v) => ({ src: v.image, caption: v.name, color: v.color, note: v.note, price: v.price })),
      ]
    : [];
  // Chưa có ảnh thì vẫn hiện 1 khối placeholder.
  const slides = images.length ? images : [{ src: "" }];
  const current = slides[index];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (product) {
      if (!dialog.open) dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [product]);

  const go = (step: number) => setIndex((i) => (i + step + slides.length) % slides.length);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // Bấm ra vùng tối bên ngoài để đóng.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => {
        if (slides.length < 2) return;
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      aria-labelledby="product-dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-4xl overflow-visible rounded-3xl bg-background p-0 text-foreground shadow-2xl backdrop:bg-foreground/50 backdrop:backdrop-blur-sm"
    >
      {product && (
        <div className="grid max-h-[90dvh] overflow-y-auto md:grid-cols-2">
          <div className="p-4 md:p-5">
            <Magnifier src={current.src}>
              {current.note && !current.src ? (
                <NoteCard note={current.note} />
              ) : (
                <Photo
                  key={current.src}
                  src={current.src}
                  alt={current.caption ? `${product.name} — ${current.caption}` : product.name}
                  tone="bg-surface"
                  className="aspect-[3/4] rounded-2xl"
                  sizes="(min-width: 768px) 448px, 100vw"
                />
              )}
              {current.caption && (
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-foreground" style={{ color: current.color }}>
                  {current.caption}
                </span>
              )}
              {slides.length > 1 && (
                <>
                  <SlideButton label="Ảnh trước" onClick={() => go(-1)} className="left-3" d="M15 6l-6 6 6 6" />
                  <SlideButton label="Ảnh sau" onClick={() => go(1)} className="right-3" d="M9 6l6 6-6 6" />
                </>
              )}
            </Magnifier>

            {slides.length > 1 && (
              <ul className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
                {slides.map((slide, i) => (
                  <li key={i} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={slide.caption ? `Xem ${slide.caption}` : `Xem ảnh ${i + 1}`}
                      aria-current={i === index}
                      className={`block overflow-hidden rounded-lg border-2 transition ${i === index ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"}`}
                    >
                      {slide.note && !slide.src ? (
                        <span className="flex h-16 w-12 items-center justify-center bg-accent-soft text-lg font-semibold text-accent">…</span>
                      ) : (
                        <Photo src={slide.src} alt="" className="h-16 w-12" sizes="48px" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col p-6 pt-2 md:p-8 md:pl-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">{product.category}</p>
                <h3 id="product-dialog-title" className="mt-1 font-display text-3xl font-bold leading-tight">
                  {product.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng"
                autoFocus
                className="-mr-2 -mt-1 shrink-0 rounded-full p-2 text-muted transition hover:bg-surface hover:text-foreground"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {(product.badge || product.flag) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {product.badge && (
                  <span className="w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">{product.badge}</span>
                )}
                {product.flag && <FlagChip flag={product.flag} />}
              </div>
            )}

            <p className="mt-4 text-xl font-semibold text-accent">
              {current.price ?? priceLabel(product.price)}
              {current.price && <span className="ml-2 text-sm font-medium text-muted">({current.caption})</span>}
            </p>
            {product.priceNote && (
              <p className="mt-2 flex w-fit items-center gap-2 rounded-lg bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5M12 8h.01" />
                </svg>
                {product.priceNote}
              </p>
            )}
            <p className="mt-4 leading-relaxed text-muted">
              <HighlightVariants text={product.description} variants={product.variants} />
            </p>

            {product.variants?.length ? (
              <div className="mt-6">
                <p className="text-sm font-semibold">{product.variantLabel ?? "Lựa chọn"}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const i = slides.findIndex((sl) => sl.caption === v.name);
                    const active = i === index;
                    const tint = v.color ?? "var(--accent)";
                    return (
                      <li key={v.name}>
                        <button
                          type="button"
                          onClick={() => setIndex(i)}
                          aria-pressed={active}
                          className="flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm font-medium transition hover:border-current"
                          style={{
                            color: v.color,
                            ...(active && { borderColor: tint, backgroundColor: `color-mix(in srgb, ${tint} 12%, white)` }),
                          }}
                        >
                          {v.swatch && <Swatch color={v.swatch} />}
                          {v.name}
                          {v.price && <span className="font-normal text-muted">· {v.price}</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            {product.sizes?.length ? (
              <div className="mt-6">
                <p className="text-sm font-semibold">Kích thước</p>
                <ul className="mt-2 flex w-fit min-w-40 flex-col gap-2">
                  {product.sizes.map((size) => (
                    <li key={size} className="rounded-xl border border-line bg-white px-4 py-2 text-sm font-medium">
                      {size}
                    </li>
                  ))}
                </ul>
                {product.sizeNote && <p className="mt-3 text-sm text-muted">{product.sizeNote}</p>}
              </div>
            ) : null}

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <SmartLink
                href={site.facebook}
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-foreground"
              >
                Nhắn Tiệm đặt in
              </SmartLink>
              <SmartLink
                href={site.zalo}
                className="rounded-full border border-line px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
              >
                Hỏi qua Zalo
              </SmartLink>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

function FlagChip({ flag }: { flag: keyof typeof FLAGS }) {
  const f = FLAGS[flag];
  return (
    <span className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${f.className}`}>
      <span aria-hidden="true">{f.icon}</span>
      {f.label}
    </span>
  );
}

type Slide = { src: string; caption?: string; color?: string; note?: string; price?: string };

/** Khung thay cho ảnh khi lựa chọn không có ảnh (ví dụ mục "Khác"). */
function NoteCard({ note }: { note: string }) {
  return (
    <div className="flex aspect-[3/4] flex-col items-center justify-center gap-5 rounded-2xl bg-surface p-8 text-center">
      <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-accent shadow-sm">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z" />
        </svg>
      </span>
      <p className="max-w-xs font-display text-xl leading-snug">{note}</p>
      <SmartLink
        href={site.facebook}
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-foreground"
      >
        Nhắn Tiệm
      </SmartLink>
    </div>
  );
}
type Variant = NonNullable<Product["variants"]>[number];

function Swatch({ color }: { color: string }) {
  return <span aria-hidden="true" className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-foreground/20" style={{ background: color }} />;
}

/** Tô màu riêng cho tên lựa chọn (có `color`) xuất hiện trong đoạn mô tả, không phân biệt hoa thường. */
function HighlightVariants({ text, variants }: { text: string; variants?: readonly Variant[] }) {
  const colored = variants?.filter((v) => v.color);
  if (!colored?.length) return text;
  const escape = (v: string) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Tên dài trước để "lụa vân xước" không bị cắt thành từ ngắn hơn.
  const names = [...colored].sort((a, b) => b.name.length - a.name.length);
  const pattern = new RegExp(`(${names.map((m) => escape(m.name)).join("|")})`, "gi");
  return text.split(pattern).map((part, i) => {
    const m = colored.find((mat) => mat.name.toLowerCase() === part.toLowerCase());
    return m ? (
      <strong key={i} className="font-semibold" style={{ color: m.color }}>
        {part}
      </strong>
    ) : (
      part
    );
  });
}

const ZOOM = 2.5;
const LENS = 180;

/**
 * Kính lúp soi chi tiết ảnh. Chuột: rê vào ảnh là hiện. Cảm ứng: bấm nút kính lúp
 * rồi chạm, kéo trên ảnh (lúc bật, kéo trên ảnh sẽ không cuộn trang).
 * Ảnh trong khung dùng object-cover nên phải tính phần bị cắt để kính lúp khớp vị trí.
 */
function Magnifier({ src, children }: { src: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [touchMode, setTouchMode] = useState(false);
  const [lens, setLens] = useState<{ x: number; y: number; bg: string; bgPos: string } | null>(null);

  const update = (e: React.PointerEvent) => {
    const box = ref.current;
    const img = box?.querySelector("img");
    if (!box || !img?.naturalWidth) return;
    if (e.pointerType !== "mouse" && !touchMode) return;
    // Rê qua nút (chuyển ảnh, kính lúp) thì ẩn kính lúp.
    if ((e.target as HTMLElement).closest("button")) return setLens(null);

    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return setLens(null);

    const scale = Math.max(rect.width / img.naturalWidth, rect.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const px = x - (rect.width - w) / 2;
    const py = y - (rect.height - h) / 2;
    setLens({
      x,
      y,
      bg: `${w * ZOOM}px ${h * ZOOM}px`,
      bgPos: `${LENS / 2 - px * ZOOM}px ${LENS / 2 - py * ZOOM}px`,
    });
  };

  if (!src) return <div className="relative">{children}</div>;

  return (
    <div
      ref={ref}
      onPointerMove={update}
      onPointerDown={update}
      onPointerLeave={() => setLens(null)}
      onPointerUp={(e) => e.pointerType !== "mouse" && setLens(null)}
      className={`relative select-none ${lens ? "cursor-none" : "cursor-zoom-in"} ${touchMode ? "touch-none" : ""}`}
    >
      {children}

      {lens && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-10 rounded-full border-4 border-white bg-no-repeat shadow-xl ring-1 ring-foreground/10"
          style={{
            width: LENS,
            height: LENS,
            left: lens.x - LENS / 2,
            top: lens.y - LENS / 2,
            backgroundImage: `url("${src}")`,
            backgroundSize: lens.bg,
            backgroundPosition: lens.bgPos,
          }}
        />
      )}

      <button
        type="button"
        onClick={() => {
          setTouchMode((v) => !v);
          setLens(null);
        }}
        aria-pressed={touchMode}
        aria-label={touchMode ? "Tắt kính lúp" : "Bật kính lúp để soi chi tiết"}
        title="Soi chi tiết"
        className={`absolute right-3 top-3 rounded-full p-2 shadow transition [@media(hover:hover)]:hidden ${touchMode ? "bg-accent text-white" : "bg-white/90 text-foreground hover:bg-white"}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="M20 20l-4.2-4.2M11 8.5v5M8.5 11h5" />
        </svg>
      </button>
      {touchMode && !lens && (
        <span className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground/80 px-3 py-1 text-xs text-white">
          Chạm và kéo để soi
        </span>
      )}
    </div>
  );
}

/**
 * Ảnh bìa chia thành các dải chéo xếp từ trên xuống, mỗi dải là ảnh một lựa chọn.
 * Đường chia nghiêng lần lượt lên/xuống cho giống vải xếp lớp. Ảnh của mỗi dải chỉ phủ
 * đúng khung của dải đó, canh theo `focus` để thấy được món đồ.
 */
function VariantSplit({
  variants,
  className,
  sizes,
  topChips = 0,
}: {
  variants: readonly Variant[];
  className: string;
  sizes: string;
  /** Số nhãn (badge, tag) xếp ở góc trên trái — đẩy nhãn dải đầu xuống cho khỏi bị đè. */
  topChips?: number;
}) {
  const n = variants.length;
  // Đường chia thứ k: độ cao (%) ở mép trái và mép phải.
  const lines = Array.from({ length: n + 1 }, (_, k) => {
    if (k === 0) return { l: 0, r: 0 };
    if (k === n) return { l: 100, r: 100 };
    const base = (k / n) * 100;
    // Độ nghiêng tỉ lệ với bề dày dải để khi nhiều dải thì dải không bị bóp nhọn một đầu.
    const tilt = (k % 2 ? 1 : -1) * (100 / n) * 0.2;
    return { l: base + tilt, r: base - tilt };
  });

  return (
    <div className={`relative overflow-hidden bg-background ${className}`}>
      {variants.map((m, i) => {
        const top = lines[i];
        const bottom = lines[i + 1];
        return (
          <div
            key={m.name}
            className="absolute inset-0"
            style={{ clipPath: `polygon(0% ${top.l}%, 100% ${top.r}%, 100% ${bottom.r}%, 0% ${bottom.l}%)` }}
          >
            <div
              className="absolute inset-x-0"
              style={{ top: `${Math.min(top.l, top.r)}%`, bottom: `${100 - Math.max(bottom.l, bottom.r)}%` }}
            >
              <Image
                src={m.image}
                alt=""
                fill
                sizes={sizes}
                className="object-cover transition duration-500 group-hover:scale-105"
                style={{ objectPosition: m.focus }}
              />
            </div>
            <span
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-xs font-semibold shadow-sm"
              style={{
                color: m.color,
                // Dải đầu nhường góc trái cho badge/tag: dời nhãn sang phải và xuống nhẹ (vẫn nằm trong dải).
                left: i === 0 && topChips ? "68%" : "50%",
                top: `${Math.max((top.l + top.r + bottom.l + bottom.r) / 4, i === 0 && topChips ? 11 : 0)}%`,
              }}
            >
              {m.swatch && <Swatch color={m.swatch} />}
              {m.name}
            </span>
          </div>
        );
      })}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {lines.slice(1, -1).map((line, k) => (
          <line key={k} x1="0" y1={line.l} x2="100" y2={line.r} stroke="white" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <span className="sr-only">{variants.map((m) => m.name).join(", ")}</span>
    </div>
  );
}

function SlideButton({ label, onClick, className, d }: { label: string; onClick: () => void; className: string; d: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-foreground shadow transition hover:bg-white ${className}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
    </button>
  );
}
