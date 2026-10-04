"use server";

import { after } from "next/server";
import nodemailer from "nodemailer";
import { businessContact, site } from "@/lib/content";

export type BusinessContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<Field, string>>;
  // Giá trị đã nhập, để điền lại form khi có lỗi (React tự reset form sau khi submit).
  values?: Partial<Record<Field, string>>;
};

type Field = "company" | "name" | "email" | "phone" | "requestType" | "quantity" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendBusinessContact(
  _prev: BusinessContactState,
  formData: FormData,
): Promise<BusinessContactState> {
  // Ô ẩn chống bot: người thật không nhìn thấy nên không điền.
  if (String(formData.get("website") ?? "")) {
    return { status: "success", message: businessContact.success };
  }

  const get = (key: Field) => String(formData.get(key) ?? "").trim();
  const data = {
    company: get("company"),
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    requestType: get("requestType"),
    quantity: get("quantity"),
    message: get("message"),
  };

  const errors: BusinessContactState["errors"] = {};
  if (!data.company) errors.company = "Vui lòng nhập tên doanh nghiệp.";
  if (!data.name) errors.name = "Vui lòng nhập tên người liên hệ.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Email không hợp lệ.";
  if (!(businessContact.requestTypes as readonly string[]).includes(data.requestType)) {
    errors.requestType = "Vui lòng chọn loại yêu cầu.";
  }
  if (data.message.length < 10) errors.message = "Nội dung cần ít nhất 10 ký tự.";
  if (data.message.length > 5000) errors.message = "Nội dung quá dài (tối đa 5000 ký tự).";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Vui lòng kiểm tra lại thông tin.", errors, values: data };
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[business-contact] Thiếu cấu hình SMTP trong biến môi trường.");
    return {
      status: "error",
      message: `Hệ thống gửi email đang bảo trì. Vui lòng gửi trực tiếp tới ${site.email}.`,
      values: data,
    };
  }

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    // Mật khẩu ứng dụng Gmail hay được dán kèm dấu cách ("abcd efgh ..."), bỏ đi cho chắc.
    auth: { user: SMTP_USER, pass: SMTP_PASS.replace(/\s/g, "") },
  });

  const rows: [string, string][] = [
    ["Doanh nghiệp", data.company],
    ["Người liên hệ", data.name],
    ["Email", data.email],
    ["Điện thoại", data.phone || "—"],
    ["Loại yêu cầu", data.requestType],
    ["Số lượng dự kiến", data.quantity || "—"],
  ];

  const mail = {
    from: `"${site.name} – Website" <${SMTP_USER}>`,
    to: CONTACT_TO || site.email,
    replyTo: `"${data.name.replace(/"/g, "")}" <${data.email}>`,
    subject: `[Hợp tác] ${data.requestType} – ${data.company}`,
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nNội dung:\n${data.message}`,
    html: `
      <h2>Yêu cầu hợp tác từ website</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#7e5f6b">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <p style="color:#7e5f6b">Nội dung:</p>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
    `,
  };

  // Gửi SMTP mất vài giây (đăng nhập Gmail + gửi), nên báo thành công cho khách ngay
  // rồi gửi mail sau khi đã trả phản hồi. Lỗi thì thử lại 1 lần và ghi log server.
  after(async () => {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        await transporter.sendMail(mail);
        return;
      } catch (err) {
        console.error(`[business-contact] Gửi email thất bại (lần ${attempt}):`, err, {
          company: data.company,
          email: data.email,
        });
      }
    }
  });

  return { status: "success", message: businessContact.success };
}
