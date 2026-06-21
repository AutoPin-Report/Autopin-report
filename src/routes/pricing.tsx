import { createFileRoute } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — AutoPin Report" },
      { name: "description", content: "Simple, premium pricing for drawing-based site evidence reporting. Free prototype, Pro, and Team plans." },
      { property: "og:title", content: "AutoPin Report Pricing" },
      { property: "og:description", content: "Free prototype, Pro, and Team plans for drawing-based site evidence reporting." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  {
    name: "Prototype",
    price: "Free",
    blurb: "Try the workspace in your browser. Data saved locally.",
    cta: "Start free",
    features: ["Browser-only prototype", "Unlimited test pins", "PDF export preview", "Single user"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "£29",
    suffix: "/user / mo",
    blurb: "For inspectors and site engineers running real projects.",
    cta: "Start Pro trial",
    features: ["Cloud project storage", "Multi-block & multi-floor", "Full PDF reports", "Photo evidence packs", "Priority email support"],
    highlight: true,
  },
  {
    name: "Team",
    price: "Talk to us",
    blurb: "Shared projects, roles and team-wide reporting.",
    cta: "Contact sales",
    features: ["Everything in Pro", "Shared workspaces", "Role-based access", "Bulk PDF exports", "Pilot onboarding"],
    highlight: false,
  },
];

function Pricing() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute -top-32 -right-32 h-[30rem] w-[30rem] rounded-full bg-[color:var(--brand-orange)]/20 blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 text-center">
          <span className="chip-orange">Pricing</span>
          <h1 className="mt-5 text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Simple, <span className="text-gradient-orange">project-friendly</span> pricing
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-white/65 text-lg">
            Start with the free browser prototype. Upgrade when you're ready for cloud projects and team reporting.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 pb-24">
        <div className="grid lg:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`group relative rounded-3xl p-8 transition-all hover:-translate-y-1 ${
                t.highlight
                  ? "glass-strong border-[color:var(--brand-orange)]/40 lg:-translate-y-3 hover:glow-orange"
                  : "glass hover:border-white/20"
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[color:var(--brand-orange)] to-[#ff5500] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-[0_10px_25px_-8px_rgba(255,122,0,0.7)]">
                  <Sparkles className="h-3 w-3" /> Most popular
                </div>
              )}
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--brand-orange-soft)]">
                {t.name}
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-5xl font-bold text-white">{t.price}</span>
                {t.suffix && <span className="text-sm text-white/50">{t.suffix}</span>}
              </div>
              <p className="mt-3 text-sm text-white/60">{t.blurb}</p>
              <div className="my-6 h-px bg-white/10" />
              <ul className="space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/80">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-orange)]/15 text-[color:var(--brand-orange)]">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/autopin-app/index.html"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  t.highlight ? "btn-orange" : "btn-ghost-light"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-white/55">
          Need an enterprise pilot? Email{" "}
          <a href="mailto:Hello.AutoPinhelp@gmail.com" className="font-semibold text-white hover:text-[color:var(--brand-orange)] transition">
            Hello.AutoPinhelp@gmail.com
          </a>
          .
        </p>
      </section>
    </SiteLayout>
  );
}
