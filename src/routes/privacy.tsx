import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AutoPin Report" },
      { name: "description", content: "How AutoPin Report handles project information, uploaded drawings and photos, GDPR rights and local browser storage." },
    ],
  }),
  component: Privacy,
});

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-2 text-white/70 leading-relaxed space-y-3 text-[15px]">{children}</div>
    </section>
  );
}

function Privacy() {
  return (
    <SiteLayout>
      <div className="relative">
        <div className="absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-[color:var(--brand-orange)]/15 blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-20">
          <span className="chip-orange">Legal</span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold text-white tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-sm text-white/50">Last updated: June 2026</p>

          <div className="mt-10 glass-strong rounded-3xl p-8 sm:p-10 space-y-8">
            <p className="text-white/75 leading-relaxed">
              This page is maintained by the AutoPin Report team to explain how the prototype handles project
              information. AutoPin Report is a tool for creating photo-based project reports from drawings and site
              images. This document is not legal advice or a certification.
            </p>

            <Section title="Information used">
              <p>The prototype may process project names, company details, uploaded drawings, photographs, notes and the PDF reports generated from them, so that users can produce a finished report.</p>
            </Section>

            <Section title="Customer content">
              <p>Drawings, photos, notes and generated reports remain the user's content. The user is responsible for ensuring they have permission to upload and use that content.</p>
            </Section>

            <Section title="Local browser storage">
              <p>This prototype stores saved projects locally in the user's browser using browser storage technologies (for example <code className="text-[color:var(--brand-orange-soft)] bg-white/5 px-1.5 py-0.5 rounded">localStorage</code>). Project data is not transmitted to or stored on AutoPin Report servers unless a future hosted version explicitly states otherwise.</p>
            </Section>

            <Section title="Data use">
              <p>Uploaded content is used to create reports, organise projects and improve the service. Customer content is not sold to third parties.</p>
            </Section>

            <Section id="gdpr" title="GDPR rights">
              <p>Where the General Data Protection Regulation (GDPR) applies, users may have rights including the right of access, rectification, restriction of processing, objection, data portability and the right to erasure (Article 17). Because data is held locally in the browser, users can exercise erasure directly by deleting projects in the app or by clearing browser storage.</p>
              <p>Requests relating to any data held by AutoPin Report outside the browser may be sent to <a className="text-[color:var(--brand-orange)] hover:underline" href="mailto:Hello.AutoPinhelp@gmail.com">Hello.AutoPinhelp@gmail.com</a>.</p>
            </Section>

            <Section title="Cookies & analytics">
              <p>The prototype does not set marketing or advertising cookies. Essential browser storage is used solely to save and reopen the user's own projects.</p>
            </Section>

            <Section title="Data removal">
              <p>Users can delete locally stored projects using the delete controls inside the application, or by clearing site data for this domain in their browser.</p>
            </Section>

            <Section title="Privacy contact">
              <p>Privacy and data protection questions can be sent to <a className="text-[color:var(--brand-orange)] hover:underline" href="mailto:Hello.AutoPinhelp@gmail.com">Hello.AutoPinhelp@gmail.com</a>.</p>
            </Section>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
