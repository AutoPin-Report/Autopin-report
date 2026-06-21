import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — AutoPin Report" },
      { name: "description", content: "Terms of use for the AutoPin Report drawing-based site evidence reporting prototype." },
    ],
  }),
  component: Terms,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-2 text-white/70 leading-relaxed space-y-3 text-[15px]">{children}</div>
    </section>
  );
}

function Terms() {
  return (
    <SiteLayout>
      <div className="relative">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[color:var(--brand-orange)]/15 blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-20">
          <span className="chip-orange">Legal</span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold text-white tracking-tight">Terms &amp; Conditions</h1>
          <p className="mt-3 text-sm text-white/50">Last updated: June 2026</p>

          <div className="mt-10 glass-strong rounded-3xl p-8 sm:p-10 space-y-8">
            <p className="text-white/75 leading-relaxed">
              AutoPin Report is a project documentation tool for creating marked drawing and photo evidence
              reports. By using the prototype, the user accepts the terms below.
            </p>

            <Section title="User permission">
              <p>Users must only upload drawings, photographs and project information they own or have explicit permission to use. Confidential or third-party content must not be uploaded without authorisation.</p>
            </Section>

            <Section title="Report checking">
              <p>Users are responsible for reviewing every generated report before issuing, sharing or submitting it. AutoPin Report assembles content provided by the user; it does not verify accuracy.</p>
            </Section>

            <Section title="Service availability">
              <p>The current product is a prototype intended for demonstration and pilot use. A future hosted version would introduce secure accounts, server-side storage and backups. Availability and features may change without notice.</p>
            </Section>

            <Section title="User content & ownership">
              <p>Users retain ownership of drawings, photographs, notes and reports created using AutoPin Report. AutoPin Report claims no ownership of customer content.</p>
            </Section>

            <Section title="Acceptable use">
              <p>Users must not upload unlawful, infringing, confidential or otherwise unauthorised content, and must not use the prototype to harass, defame or harm others.</p>
            </Section>

            <Section title="Limitation of liability">
              <p>AutoPin Report is provided on an "as is" basis, without warranties of any kind. To the maximum extent permitted by law, AutoPin Report is not liable for losses arising from use of, or inability to use, the prototype, or from reliance on any generated report.</p>
            </Section>

            <Section title="Changes to these terms">
              <p>These terms may be updated as the product evolves. Material changes will be reflected by updating the "last updated" date above.</p>
            </Section>

            <Section title="Contact">
              <p>Questions, feedback, privacy requests or content removal requests can be sent to <a className="text-[color:var(--brand-orange)] hover:underline" href="mailto:Hello.AutoPinhelp@gmail.com">Hello.AutoPinhelp@gmail.com</a>.</p>
            </Section>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
