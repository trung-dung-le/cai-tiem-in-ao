import { footerLinks, site } from "@/lib/content";
import { SmartLink } from "./SmartLink";
import { FlowerBorder } from "./FlowerBorder";

// Mục nào chưa có dữ liệu (chuỗi rỗng) thì ẩn đi.
const contact = [
  { label: "Địa chỉ", value: site.address },
  { label: "Giờ mở cửa", value: site.hours },
  { label: "Điện thoại", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
].filter((c) => c.value);

// Icon lấy path từ Simple Icons (viewBox 24x24).
const socials = [
  {
    label: "Facebook",
    href: site.facebook,
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    label: "Instagram",
    href: site.instagram,
    path: "M7.03.084c-1.277.06-2.149.264-2.91.563a5.874 5.874 0 0 0-2.124 1.388 5.878 5.878 0 0 0-1.38 2.127C.321 4.926.12 5.8.064 7.076.008 8.354-.005 8.764.001 12.023c.007 3.259.021 3.667.083 4.947.061 1.277.264 2.149.563 2.911.308.789.72 1.457 1.388 2.123a5.872 5.872 0 0 0 2.129 1.38c.763.295 1.636.496 2.913.552 1.278.056 1.689.069 4.947.063 3.257-.007 3.668-.021 4.947-.082 1.28-.06 2.147-.265 2.91-.563a5.881 5.881 0 0 0 2.123-1.388 5.881 5.881 0 0 0 1.38-2.129c.295-.763.496-1.636.551-2.912.056-1.28.07-1.69.063-4.948-.006-3.258-.02-3.667-.081-4.947-.06-1.28-.264-2.148-.564-2.911a5.892 5.892 0 0 0-1.387-2.123 5.857 5.857 0 0 0-2.128-1.38C19.074.322 18.202.12 16.924.066 15.647.009 15.236-.006 11.977 0 8.718.008 8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.736 3.736 0 0 1-1.382-.895 3.695 3.695 0 0 1-.9-1.378c-.165-.423-.363-1.058-.417-2.228-.06-1.264-.072-1.644-.08-4.848-.006-3.204.006-3.583.061-4.848.05-1.169.246-1.805.408-2.228.216-.561.477-.96.895-1.382a3.705 3.705 0 0 1 1.379-.9c.423-.165 1.057-.361 2.227-.417 1.265-.06 1.644-.072 4.848-.08 3.203-.006 3.583.006 4.85.062 1.168.05 1.804.244 2.227.408.56.216.96.475 1.382.895.421.42.681.817.9 1.378.165.422.362 1.056.417 2.227.06 1.265.074 1.645.08 4.848.005 3.203-.006 3.583-.061 4.848-.051 1.17-.245 1.805-.408 2.23-.216.56-.477.96-.896 1.38a3.705 3.705 0 0 1-1.378.9c-.422.165-1.058.362-2.226.418-1.266.06-1.645.072-4.85.079-3.204.007-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 1 0 1.437-1.442 1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.161 6.161 0 1 0 12.323-.024 6.162 6.162 0 0 0-12.323.024M8 12.008A4 4 0 1 1 12.008 16 4 4 0 0 1 8 12.008",
  },
  {
    label: "Threads",
    href: site.threads,
    path: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z",
  },
  {
    // Simple Icons không có Zalo: vẽ bong bóng chat khoét chữ Z (cần evenodd để khoét).
    label: "Zalo",
    href: site.zalo,
    path: "M6 2h12a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4H9.5L5 21v-4.2A4 4 0 0 1 2 13V6a4 4 0 0 1 4-4Zm1.5 3.5v1.7h6.2l-6.2 4.6v1.7h9v-1.7h-6.2l6.2-4.6V5.5h-9Z",
    evenOdd: true,
  },
].filter((s) => s.href);

export function Footer() {
  return (
    <footer id="lien-he" className="relative isolate overflow-x-clip scroll-mt-20 border-t border-line bg-surface">
      <div data-reveal className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <p className="font-display text-3xl font-bold text-accent">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm text-muted">{site.description}</p>
          <dl className="mt-8 space-y-3 text-sm">
            {contact.map((c) => (
              <div key={c.label} className="flex gap-3">
                <dt className="w-24 shrink-0 text-muted">{c.label}</dt>
                <dd>
                  {c.href ? (
                    <SmartLink href={c.href} className="hover:text-accent">
                      {c.value}
                    </SmartLink>
                  ) : (
                    c.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="mt-8 flex gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <SmartLink
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
                    <path d={s.path} fillRule={"evenOdd" in s ? "evenodd" : undefined} />
                  </svg>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerLinks.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <p className="text-sm font-semibold">{group.title}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink href={link.href} className="hover:text-accent">
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="relative border-t border-line">
        <FlowerBorder />
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-muted">
          © 2026 {site.name}. Bảo lưu mọi quyền.
        </p>
      </div>
    </footer>
  );
}
