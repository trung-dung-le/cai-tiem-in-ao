import { site } from "@/lib/content";
import { ProductGrid } from "./ProductGrid";
import { SectionHeading } from "./SectionHeading";
import { SmartLink } from "./SmartLink";
import { Bubbles } from "./Bubbles";

export function Products() {
  return (
    <section id="san-pham" className="relative isolate overflow-x-clip bg-surface py-24">
      <Bubbles preset="products" />
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Sản phẩm" title="Chọn áo, Tiệm in hình" />
          <SmartLink href={site.facebook} className="text-sm font-medium underline underline-offset-4 hover:text-accent">
            Xem thêm mẫu trên Facebook
          </SmartLink>
        </div>

        <ProductGrid />
      </div>
    </section>
  );
}
