import Image from "next/image";

/**
 * Ảnh sản phẩm/bộ sưu tập. Khi `src` rỗng thì hiển thị khối màu placeholder
 * để trang vẫn đẹp trước khi có ảnh thật.
 */
export function Photo({
  src,
  alt,
  className = "",
  sizes = "100vw",
  preload = false,
  tone = "bg-surface",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
  tone?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${tone} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-end p-4"
        >
          <span className="font-display text-sm text-muted/70">{alt}</span>
        </div>
      )}
    </div>
  );
}
