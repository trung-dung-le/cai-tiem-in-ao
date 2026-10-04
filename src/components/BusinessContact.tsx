import { businessContact, site } from "@/lib/content";
import { BusinessContactForm } from "./BusinessContactForm";
import { SectionHeading } from "./SectionHeading";
import { SmartLink } from "./SmartLink";
import { Bubbles } from "./Bubbles";

export function BusinessContact() {
  const { map } = businessContact;

  return (
    <section id="hop-tac" className="relative isolate overflow-hidden">
      <Bubbles preset="contact" />
      <div className="mx-auto max-w-6xl px-5 pb-24">
        <SectionHeading eyebrow="Hợp tác doanh nghiệp" title={businessContact.title} body={businessContact.body} />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div data-reveal="left" className="rounded-[2rem] border border-line bg-background p-6 sm:p-8">
            <BusinessContactForm />
          </div>

          <div data-reveal="right" className="flex min-h-[420px] flex-col overflow-hidden rounded-[2rem] border border-line bg-surface">
            <iframe
              src={map.embed}
              title={`Bản đồ tới ${map.label}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="min-h-[320px] w-full flex-1 border-0"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <p className="font-semibold">{map.label}</p>
                <p className="text-sm text-muted">{map.address}</p>
                <p className="mt-1 text-sm text-muted">
                  Email: <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a>
                </p>
              </div>
              <SmartLink
                href={map.link}
                className="rounded-full border border-accent/40 bg-background px-5 py-2 text-sm font-semibold text-accent transition hover:border-accent"
              >
                Chỉ đường
              </SmartLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
