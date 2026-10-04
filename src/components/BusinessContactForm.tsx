"use client";

import { useActionState, useState } from "react";
import {
  sendBusinessContact,
  type BusinessContactState,
} from "@/app/actions/business-contact";
import { businessContact, site } from "@/lib/content";

const initialState: BusinessContactState = { status: "idle", message: "" };

/** Form gửi email hợp tác cho doanh nghiệp (gửi qua Server Action). */
export function BusinessContactForm() {
  // Tăng key để làm mới form khi muốn gửi thêm yêu cầu khác.
  const [formKey, setFormKey] = useState(0);
  return <FormBody key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}

function FormBody({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(sendBusinessContact, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-3xl bg-surface p-8 text-center">
        <p className="font-medium">{state.message}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-5 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-foreground"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  const err = state.errors ?? {};
  const v = state.values ?? {};

  return (
    <form action={formAction} noValidate className="grid gap-4 sm:grid-cols-2">
      {/* Ô bẫy bot — ẩn với người dùng. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <Field label="Tên doanh nghiệp" name="company" required error={err.company} defaultValue={v.company} autoComplete="organization" className="sm:col-span-2" />
      <Field label="Người liên hệ" name="name" required error={err.name} defaultValue={v.name} autoComplete="name" />
      <Field label="Số điện thoại" name="phone" type="tel" error={err.phone} defaultValue={v.phone} autoComplete="tel" />
      <Field label="Email công việc" name="email" type="email" required error={err.email} defaultValue={v.email} autoComplete="email" className="sm:col-span-2" />

      <label className="block text-sm">
        <span className="font-medium">
          Loại yêu cầu <span className="text-accent">*</span>
        </span>
        <select
          name="requestType"
          required
          defaultValue={v.requestType ?? ""}
          aria-invalid={!!err.requestType}
          className={inputClass(!!err.requestType)}
        >
          <option value="" disabled>
            Chọn một mục
          </option>
          {businessContact.requestTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {err.requestType && <span className="mt-1 block text-xs text-accent">{err.requestType}</span>}
      </label>

      <Field label="Số lượng dự kiến" name="quantity" placeholder="VD: 50 áo" error={err.quantity} defaultValue={v.quantity} />

      <label className="block text-sm sm:col-span-2">
        <span className="font-medium">
          Nội dung <span className="text-accent">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={4}
          maxLength={5000}
          defaultValue={v.message}
          placeholder="Mô tả yêu cầu: mẫu áo, chất liệu, thời gian cần hàng…"
          aria-invalid={!!err.message}
          className={`${inputClass(!!err.message)} resize-y`}
        />
        {err.message && <span className="mt-1 block text-xs text-accent">{err.message}</span>}
      </label>

      {state.status === "error" && (
        <p aria-live="polite" className="rounded-2xl bg-accent-soft px-4 py-3 text-sm sm:col-span-2">
          <MessageWithEmailLink message={state.message} values={v} />
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-foreground disabled:opacity-60 sm:col-span-2"
      >
        {pending ? "Đang gửi…" : "Gửi email"}
      </button>
    </form>
  );
}

/**
 * Biến email của tiệm trong thông báo lỗi thành link `mailto:`, điền sẵn tiêu đề
 * và nội dung khách đã nhập để họ gửi trực tiếp bằng ứng dụng email.
 */
function MessageWithEmailLink({
  message,
  values,
}: {
  message: string;
  values: NonNullable<BusinessContactState["values"]>;
}) {
  const idx = message.indexOf(site.email);
  if (idx === -1) return message;

  const subject = `[Hợp tác] ${values.requestType || "Liên hệ"}${values.company ? ` – ${values.company}` : ""}`;
  const body = [
    values.company && `Doanh nghiệp: ${values.company}`,
    values.name && `Người liên hệ: ${values.name}`,
    values.phone && `Điện thoại: ${values.phone}`,
    values.quantity && `Số lượng dự kiến: ${values.quantity}`,
    values.message && `\n${values.message}`,
  ]
    .filter(Boolean)
    .join("\n");
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

  return (
    <>
      {message.slice(0, idx)}
      <a href={href} className="font-semibold text-accent underline underline-offset-2 hover:text-foreground">
        {site.email}
      </a>
      {message.slice(idx + site.email.length)}
    </>
  );
}

function inputClass(invalid: boolean) {
  return `mt-1.5 block w-full rounded-2xl border bg-white px-4 py-2.5 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${
    invalid ? "border-accent" : "border-line"
  }`;
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  className = "",
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  className?: string;
  autoComplete?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="font-medium">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        aria-invalid={!!error}
        className={inputClass(!!error)}
        {...rest}
      />
      {error && <span className="mt-1 block text-xs text-accent">{error}</span>}
    </label>
  );
}
