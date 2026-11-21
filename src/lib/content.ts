/**
 * Toàn bộ nội dung hiển thị của landing page nằm ở đây.
 * Sửa file này là đủ để đổi text, giá, ảnh — không cần đụng vào component.
 *
 * Ảnh: bỏ file vào thư mục `public/images/` rồi điền đường dẫn vào `image`
 * (ví dụ `/images/ao-nhom.jpg`). Để trống thì component sẽ hiển thị khối màu
 * placeholder thay cho ảnh.
 *
 * CẦN ĐIỀN: các chỗ ghi "Đang cập nhật" và những mục đánh dấu `// TODO` bên dưới
 * là thông tin chưa xác minh được — hãy thay bằng thông tin thật của tiệm.
 */

export const site = {
  name: "Cái Tiệm In Áo",
  tagline: "In áo theo yêu cầu — từ 1 chiếc cũng in",
  description:
    "Cái Tiệm In Áo nhận in áo phông, babytee, áo boxy, áo polo, khăn bandana, túi tote và quà tặng may vải số lượng lớn theo thiết kế riêng của bạn. Có hỗ trợ lên mẫu, xem mockup trước khi in.",
  facebook: "https://www.facebook.com/caitieminao",
  instagram: "https://www.instagram.com/caitieminao", // TODO: kiểm tra lại đúng tài khoản
  threads: "https://www.threads.com/@caitieminao", // TODO: kiểm tra lại đúng tài khoản
  zalo: "https://zalo.me/0869986406",
  phone: "0869 986 406",
  email: "caitieminao@gmail.com",
  address: "Hà Đông, Hà Nội",
  hours: "8:00 - 24:00",
} as const;

export const nav = [
  { label: "Dịch vụ", href: "#dich-vu" },
  { label: "Sản phẩm", href: "#san-pham" },
  { label: "Quy trình", href: "#quy-trinh" },
  { label: "Đánh giá", href: "#danh-gia" },
  { label: "Liên hệ", href: "#lien-he" },
] as const;

export const hero = {
  eyebrow: "In áo theo yêu cầu",
  title: "Mặc lên người",
  titleAccent: "ý tưởng của riêng bạn",
  body: "Gửi cho tiệm một hình vẽ, một câu nói hay chỉ là ý tưởng mơ hồ — tụi mình sẽ lên mẫu, gửi bạn duyệt rồi in thành chiếc áo chỉ bạn mới có.",
  primaryCta: { label: "Nhắn tiệm qua Facebook", href: site.facebook },
  secondaryCta: { label: "Xem quy trình", href: "#quy-trinh" },
  // TODO: thay bằng con số thật của tiệm, hoặc để mảng rỗng [] để ẩn đi.
  stats: [
    { value: "Từ 1 áo", label: "nhận in số lượng ít" },
    { value: "Mockup", label: "duyệt mẫu trước khi in" },
    { value: "Ship", label: "giao hàng tận nơi" },
  ],
  image: "",
} as const;

export const benefits = [
  {
    title: "In từ 1 chiếc",
    body: "Làm quà tặng, áo đôi hay áo cho riêng mình — không cần đặt số lượng lớn.",
  },
  {
    title: "Hỗ trợ lên mẫu",
    body: "Chưa có file thiết kế? Tiệm giúp bạn chỉnh sửa và lên mẫu từ ý tưởng.",
  },
  {
    title: "Duyệt mockup trước",
    body: "Bạn xem hình áo mô phỏng và chốt mẫu xong tiệm mới bắt đầu in.",
  },
  {
    title: "Tư vấn size & chất vải",
    body: "Nhắn tiệm để được gợi ý form áo, màu vải và kiểu in phù hợp.",
  },
] as const;

export const services = [
  {
    name: "Áo thun cá nhân",
    body: "In hình, chữ, ảnh kỷ niệm lên áo thun cho riêng bạn hoặc làm quà tặng.",
    tag: "Từ 1 áo",
    href: "#san-pham",
    image: "/images/ao-thun-ca-nhan.jpg",
  },
  {
    name: "Áo nhóm · Áo lớp",
    body: "Đồng phục cho lớp, nhóm bạn, câu lạc bộ, chuyến đi chơi hay sự kiện.",
    tag: "Theo nhóm",
    href: "#san-pham",
    image: "/images/ao-lop.jpg",
  },
  {
    name: "Áo đôi · Áo gia đình",
    body: "Những thiết kế đi theo cặp, theo bộ cho người thương và cả nhà.",
    tag: "Theo bộ",
    href: "#san-pham",
    image: "/images/ao-doi.jpg",
    focus: "54% 50%",
  },
] as const;

/**
 * `price` là giá tham khảo (đồng). Để `null` thì hiển thị "Liên hệ báo giá".
 * TODO: điền giá thật của tiệm.
 */
/**
 * - `image`: ảnh bìa hiện trên lưới sản phẩm.
 * - `gallery`: thêm ảnh để xem trong popup chi tiết (ảnh bìa luôn hiện đầu tiên).
 * - `description`: mô tả ngắn hiện trong popup.
 * - `variants` / `variantLabel`: các lựa chọn (chất liệu, màu sắc…). Có mục này thì ảnh bìa
 *   được chia thành từng dải, mỗi dải là ảnh một lựa chọn; popup hiện ảnh từng lựa chọn kèm tên.
 *   - `color`: màu chữ riêng của lựa chọn (tên trong mô tả cũng được tô màu này).
 *   - `swatch`: chấm màu hiện cạnh tên — dùng cho lựa chọn màu sắc.
 *   - `focus`: vị trí món đồ trong ảnh (CSS object-position, ví dụ "50% 70%") để dải
 *     trên ảnh bìa canh đúng vào món đồ thay vì vào nền.
 *   - `note`: lựa chọn không có ảnh (để `image` rỗng) — popup hiện lời nhắn này thay cho ảnh,
 *     và lựa chọn đó không nằm trong ảnh bìa chia dải. Dùng cho mục "Khác".
 *   - `price`: giá riêng của lựa chọn — popup đổi giá theo lựa chọn đang xem.
 * - `sizes` / `sizeNote`: các kích thước có sẵn và ghi chú thêm, hiện trong popup.
 */
export const products: readonly {
  name: string;
  category: string;
  /** Số (đồng) sẽ hiện "Từ 150.000đ"; chữ thì hiện nguyên văn (ví dụ "Từ 6xk"); null là "Liên hệ báo giá". */
  price: number | string | null;
  /** Ghi chú nhỏ hiện dưới giá trong popup. */
  priceNote?: string;
  badge: string | null;
  /**
   * Tag hiện ở góc ảnh: "allday" (All days – All nights), "winter" (Winter),
   * "accessories" (Accessories), "gifts" (Gifts).
   * Các sản phẩm liền nhau cùng hàng được xếp chung một hàng riêng trên lưới
   * (Accessories và Gifts dùng chung một hàng).
   */
  flag?: "allday" | "winter" | "accessories" | "gifts";
  image: string;
  gallery?: readonly string[];
  description: string;
  variantLabel?: string;
  variants?: readonly { name: string; image: string; color?: string; swatch?: string; focus?: string; note?: string; price?: string }[];
  sizes?: readonly string[];
  sizeNote?: string;
}[] = [
  { name: "Áo phông oversize", category: "Áo", price: "Xem chi tiết trong ảnh", priceNote: "Giá áo phụ thuộc vào số lượng đặt in.", badge: "Phổ biến", flag: "allday", image: "/images/ao-phong-oversize-den.jpg", gallery: [], description: "Áo phông form oversize rộng rãi, in hình, chữ hoặc ảnh theo thiết kế riêng của bạn. Nhận in từ 1 chiếc. Có 2 chất liệu: cotton 100% co giãn 2 chiều và phông su.",
    // Ảnh minh hoạ từ Pexels (miễn phí dùng thương mại) — nên thay bằng ảnh áo thật của tiệm.
    variantLabel: "Chất liệu",
    variants: [
      { name: "Cotton 100% co giãn 2 chiều", image: "/images/ao-phong-cotton.jpg", color: "#c2457a", price: "Giá in lẻ: 219,000 VND / áo" }, // hồng đậm
      { name: "Phông su", image: "/images/ao-phong-phong-su.jpg", color: "#8e4a9e", price: "Giá in lẻ: 155,000 VND / áo" }, // tím mauve
    ],
  },
  // Ảnh babytee, boxy, polo là ảnh minh hoạ từ Pexels (miễn phí dùng thương mại) — nên thay bằng ảnh áo thật của tiệm.
  { name: "Áo babytee", category: "Áo", price: null, badge: null, flag: "allday", image: "/images/ao-babytee.jpg", gallery: [], description: "Áo babytee form ôm, ngắn xinh xắn — hợp in hình nhỏ, chữ dễ thương." },
  { name: "Áo boxy", category: "Áo", price: null, badge: null, flag: "allday", image: "/images/ao-boxy.jpg", gallery: [], description: "Áo boxy form rộng, vai xuôi, mặc thoải mái — hợp in hình lớn mặt trước hoặc sau lưng." },
  { name: "Áo polo", category: "Áo", price: null, badge: null, flag: "allday", image: "/images/ao-polo-den.jpg", gallery: [], description: "Áo polo có cổ, lịch sự — phù hợp làm đồng phục công ty, nhóm, sự kiện." },
  // Ảnh 3 áo mùa đông là ảnh minh hoạ từ Pexels (miễn phí dùng thương mại) — nên thay bằng ảnh áo thật của tiệm.
  { name: "Áo long sleeves", category: "Áo", price: null, badge: null, flag: "winter", image: "/images/ao-long-sleeves.jpg", gallery: [], description: "Áo thun dài tay, mặc riêng hay khoác trong đều hợp — in hình, chữ theo thiết kế riêng của bạn." },
  { name: "Áo sweater", category: "Áo", price: null, badge: null, flag: "winter", image: "/images/ao-sweater.jpg", gallery: [], description: "Áo sweater cổ tròn ấm áp cho ngày se lạnh — in hình, chữ theo thiết kế riêng của bạn." },
  { name: "Áo hoodie", category: "Áo", price: null, badge: null, flag: "winter", image: "/images/ao-hoodie.jpg", gallery: [], description: "Áo hoodie có mũ, form rộng thoải mái — hợp làm áo nhóm, áo lớp mùa đông với hình in mặt trước hoặc sau lưng." },
  { name: "Khăn bandana", category: "Phụ kiện", price: null, badge: null, flag: "accessories", image: "", gallery: [], description: "Khăn bandana in họa tiết theo yêu cầu, dùng buộc tóc, đeo cổ hoặc làm quà tặng. Có 3 chất liệu: satin bóng mượt, lụa latin mềm mát và lụa vân xước có vân nổi.",
    // Ảnh vải minh hoạ từ Pexels (miễn phí dùng thương mại) — nên thay bằng ảnh khăn thật của tiệm.
    variantLabel: "Chất liệu",
    variants: [
      { name: "Lụa satin", image: "/images/bandana-satin.jpg", color: "#c2457a" }, // hồng đậm
      { name: "Lụa latin", image: "/images/bandana-latin.jpg", color: "#8e4a9e" }, // tím mauve
      { name: "Lụa vân xước", image: "/images/bandana-van-xuoc.jpg", color: "#b8503a" }, // cam đất
    ],
    sizes: ["50 × 50 cm", "60 × 60 cm", "70 × 70 cm"],
    sizeNote: "Cần kích thước khác? Tiệm nhận làm theo yêu cầu với số lượng lớn.",
  },
  { name: "Túi tote", category: "Phụ kiện", price: null, badge: null, flag: "accessories", image: "", gallery: [], description: "Túi tote vải in hình theo thiết kế riêng, tiện dụng đi học, đi làm, đi chơi. Có 4 màu: trắng, mộc, đen và nâu.",
    // Ảnh túi minh hoạ từ Pexels (miễn phí dùng thương mại) — nên thay bằng ảnh túi thật của tiệm.
    variantLabel: "Màu sắc",
    variants: [
      { name: "Trắng", image: "/images/tote-trang.jpg", swatch: "#ffffff", focus: "60% 72%" },
      { name: "Mộc", image: "/images/tote-moc.jpg", swatch: "#efe6d2", focus: "42% 50%" },
      { name: "Đen", image: "/images/tote-den.jpg", swatch: "#1f1a1c", focus: "50% 66%" },
      { name: "Nâu", image: "/images/tote-nau.jpg", swatch: "#b07a45", focus: "40% 58%" },
    ],
    sizes: ["R34 × D38 cm (rộng × dài)"],
  },
  { name: "Quà tặng may vải", category: "Quà tặng", price: null, badge: "Số lượng lớn", flag: "gifts", image: "", gallery: [], description: "Các loại quà tặng may từ vải in logo, thông điệp riêng — scrunchies, băng đô, khăn twilly, túi tote, túi rút… Nhận đặt số lượng lớn cho sự kiện, doanh nghiệp.",
    // Ảnh minh hoạ từ Pexels (miễn phí dùng thương mại) — nên thay bằng ảnh sản phẩm thật của tiệm.
    variantLabel: "Gợi ý quà tặng",
    variants: [
      { name: "Scrunchies", image: "/images/qua-scrunchies.jpg", focus: "62% 28%" },
      { name: "Băng đô", image: "/images/qua-bang-do.jpg", focus: "55% 22%" },
      { name: "Khăn twilly", image: "/images/qua-khan-twilly.jpg", focus: "72% 55%" },
      { name: "Túi tote", image: "/images/tote-moc.jpg", focus: "42% 50%" },
      { name: "Túi rút", image: "/images/qua-tui-rut.jpg", focus: "45% 50%" },
      { name: "Khác", image: "", note: "Bạn có ý tưởng món quà khác? Nhắn tiệm để được tư vấn may theo yêu cầu." },
    ],
  },
];

export const process = {
  eyebrow: "Quy trình đặt in",
  title: "Bốn bước là có áo mặc",
  steps: [
    {
      title: "Gửi ý tưởng",
      body: "Nhắn tiệm qua Facebook: hình ảnh, câu chữ, màu áo, size và số lượng bạn muốn.",
    },
    {
      title: "Duyệt mockup",
      body: "Tiệm lên mẫu và gửi hình mô phỏng. Bạn góp ý đến khi ưng thì chốt.",
    },
    {
      title: "In áo",
      body: "Áo được in theo đúng mẫu đã duyệt, kiểm tra kỹ từng chiếc trước khi đóng gói.",
    },
    {
      title: "Nhận hàng",
      body: "Tiệm gửi áo tận nơi hoặc bạn ghé lấy. Mặc lên và khoe thôi!",
    },
  ],
  image: "",
} as const;

/**
 * Đánh giá khách hàng (hiển thị dạng carousel có nút trái/phải).
 * - `avatar`: đường dẫn ảnh trong public/images/, để trống thì hiện chữ cái đầu của tên.
 * - `source`: kênh khách nhắn cho tiệm (Facebook / Zalo).
 * - `chat`: ảnh chụp đoạn chat của khách trong public/images/feedback/, hiện ở đầu thẻ.
 *   Để trống thì thẻ chỉ có chữ.
 *
 * Trích từ tin nhắn thật của khách (chỉ sửa chính tả, viết tắt cho dễ đọc).
 */
export const testimonials = {
  sample: false,
  items: [
    { name: "Thu H.", source: "Facebook", service: "Áo thun", avatar: "", chat: "/images/feedback/chat-thu-huong.jpg", quote: "Áo in đẹp lắm ạ. Màu lên chuẩn, vải dày dặn, đứng form nữa, vượt ngoài mong đợi của em luôn. Cảm ơn Cái Tiệm In Áo nhiều và chúc tiệm ngày càng đắt khách nhé ạ!" },
    { name: "Hoàng Dương", source: "Facebook", service: "Khăn bandana", avatar: "", chat: "/images/feedback/chat-hoang-duong-2.jpg", quote: "Trời ơi 10 điểm!" },
    { name: "Hoàng Dương", source: "Facebook", service: "Khăn bandana", avatar: "", chat: "/images/feedback/chat-hoang-duong-1.jpg", quote: "Khăn tiệm in được chị Jiyeon cầm nè, còn khen khăn in đẹp nữa." },
    { name: "Thanh Hà", source: "Zalo", service: "Áo thun & tạp dề", avatar: "", chat: "/images/feedback/chat-thanh-ha-feedback.jpg", quote: "Gửi tiệm coi nè, feedback chất lượng nhó :)))))" },
    { name: "Ngọc Anh", source: "Facebook", service: "Khăn bandana satin", avatar: "", chat: "/images/feedback/chat-ngoc-anh-2.jpg", quote: "Sốp ơi 10 điểm! Quá đẹp, quá ưng." },
    { name: "Ngọc Anh", source: "Facebook", service: "Khăn bandana", avatar: "", chat: "/images/feedback/chat-ngoc-anh-3.jpg", quote: "Ui đẹp quá aaa, vẫn tin tưởng sốp như ngày nào!" },
    { name: "Ngọc Anh", source: "Facebook", service: "Khăn bandana satin", avatar: "", chat: "/images/feedback/chat-ngoc-anh-1.jpg", quote: "Đẹp quá!" },
    { name: "Khách hàng", source: "Facebook", service: "Áo in ảnh gia đình", avatar: "", chat: "/images/feedback/chat-khach-ao-gia-dinh.jpg", quote: "Áo in đẹp với chất lượng lắm, cảm ơn shop nhiều. Em cần gấp mà shop cũng hỗ trợ nhiệt tình ạ." },
    { name: "An An", source: "Zalo", service: "Áo thun", avatar: "", chat: "/images/feedback/chat-an-an.jpg", quote: "Em nhận được hàng rồi shop ơi, in sắc nét, vải đẹp lắm ạ." },
    { name: "Phương Lê", source: "Facebook", service: "Áo thun", avatar: "", chat: "/images/feedback/chat-phuong-le.jpg", quote: "Gói hàng an toàn lắm ạ. Mọi người mua hàng cũng khen chất vải với hình in tốt ạ." },
    { name: "Hiệp Trần", source: "Zalo", service: "Áo thun", avatar: "", chat: "/images/feedback/chat-hiep-tran.jpg", quote: "Uầy, áo còn đẹp hơn áo công ty chị luôn :)))" },
    { name: "Nguyễn Nhi", source: "Facebook", service: "Túi tote", avatar: "", chat: "/images/feedback/chat-nguyen-nhi.jpg", quote: "Mình nhận được rồi nhé, túi đẹp!" },
    { name: "Nhật Hạ", source: "Facebook", service: "Áo thun", avatar: "", chat: "/images/feedback/chat-nhat-ha.jpg", quote: "Áo chất đẹp lắm nha shop!" },
    { name: "Khách hàng", source: "Facebook", service: "Áo thun", avatar: "", chat: "/images/feedback/chat-khach-ao.jpg", quote: "Áo oke lắm nha, tui cảm ơn ❤️" },
  ],
} as const;

export const cta = {
  title: "Có ý tưởng rồi? Nhắn tiệm liền nè",
  body: "Gửi hình ảnh hoặc mô tả áo bạn muốn, tiệm sẽ phản hồi và báo giá cho bạn.",
  button: { label: "Nhắn tin qua Facebook", href: site.facebook },
  note: "Tiệm trả lời tin nhắn trong giờ làm việc.",
  zaloButton: { label: "Nhắn tin qua Zalo", href: site.zalo },
} as const;

/**
 * Phần "Liên hệ hợp tác" (id #hop-tac): form gửi email bên trái, bản đồ bên phải.
 * Email gửi tới `site.email` (hoặc CONTACT_TO trong .env nếu có).
 */
export const businessContact = {
  title: "Liên hệ hợp tác doanh nghiệp",
  body: "Đặt đồng phục, áo sự kiện hay quà tặng số lượng lớn? Để lại thông tin, tiệm sẽ gửi báo giá qua email cho bạn.",
  requestTypes: [
    "Đồng phục công ty",
    "Áo sự kiện / team building",
    "Quà tặng doanh nghiệp",
    "Hợp tác khác",
  ],
  success: "Đã gửi! Tiệm sẽ phản hồi qua email của bạn sớm nhất có thể.",
  map: {
    label: "Hà Đông, Hà Nội",
    address: "Khu vực Hà Đông, TP. Hà Nội",
    // Nhúng Google Maps không cần API key; đổi query để trỏ tới địa điểm khác.
    embed: "https://www.google.com/maps?q=H%C3%A0+%C4%90%C3%B4ng%2C+H%C3%A0+N%E1%BB%99i&hl=vi&z=13&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=H%C3%A0+%C4%90%C3%B4ng%2C+H%C3%A0+N%E1%BB%99i",
  },
} as const;

export const footerLinks = [
  {
    title: "Dịch vụ",
    links: [
      { label: "Áo thun cá nhân", href: "#dich-vu" },
      { label: "Áo nhóm · Áo lớp", href: "#dich-vu" },
      { label: "Áo đôi · Áo gia đình", href: "#dich-vu" },
      { label: "Babytee · Boxy · Polo", href: "#san-pham" },
      { label: "Bandana · Túi tote", href: "#san-pham" },
      { label: "Quà tặng may vải", href: "#san-pham" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "Quy trình đặt in", href: "#quy-trinh" },
      { label: "Tư vấn size", href: site.facebook },
      { label: "Báo giá", href: site.facebook },
      { label: "Hợp tác doanh nghiệp", href: "#hop-tac" },
    ],
  },
  {
    title: "Theo dõi tiệm",
    links: [
      { label: "Facebook", href: site.facebook },
      { label: "Instagram", href: site.instagram },
      { label: "Threads", href: site.threads },
      { label: "Zalo", href: site.zalo },
    ],
  },
] as const;

/** Định dạng giá theo đồng Việt Nam, ví dụ 150000 → "150.000đ". */
export function formatPrice(value: number) {
  return `${value.toLocaleString("vi-VN")}đ`;
}
