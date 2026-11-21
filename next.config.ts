import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 là mặc định; 90 dùng cho ảnh cần nét (thẻ dịch vụ).
    qualities: [75, 90],
  },
};

export default nextConfig;
