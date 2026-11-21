/** Sự kiện để nơi khác (ví dụ popup Dịch vụ) yêu cầu lưới sản phẩm mở chi tiết một sản phẩm. */
export const OPEN_PRODUCT_EVENT = "open-product";

export type OpenProductDetail = { product: string; variant?: string };

export function openProduct(detail: OpenProductDetail) {
  window.dispatchEvent(new CustomEvent<OpenProductDetail>(OPEN_PRODUCT_EVENT, { detail }));
}
