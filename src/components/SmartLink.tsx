import type { ComponentProps } from "react";

/** Thẻ `<a>` tự mở tab mới khi link trỏ ra ngoài (ví dụ Facebook). */
export function SmartLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    />
  );
}
