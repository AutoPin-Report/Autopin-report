import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  Check,
  X,
  MapPin,
  FileText,
  Layers,
  Save,
  Smartphone,
  Camera,
  ClipboardCheck,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Zap,
  Upload,
  FileCheck2,
  Building2,
  MonitorSmartphone,
  Download,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoPin Report — Pin. Capture. Generate. Done." },
      {
        name: "description",
        content:
          "Drawing-based site evidence reporting for engineers, contractors and site teams. Pin photos directly on drawings and generate professional PDF reports in minutes.",
      },
      { property: "og:title", content: "AutoPin Report — Pin. Capture. Generate. Done." },
      {
        property: "og:description",
        content: "Pin evidence on drawings, capture photos with notes, and export professional PDF reports in minutes.",
      },
    ],
  }),
  component: Home,
});

const features = [
  { icon: MapPin, title: "Pin Photos Directly on Drawings", desc: "Drop precise location pins on PDF or image floor plans — every photo tied to an exact spot on the drawing." },
  { icon: FileText, title: "Generate Professional PDF Reports", desc: "One click exports a structured PDF with marked drawings, full-resolution photos and your inspection notes." },
  { icon: Layers, title: "Multi-Floor Project Management", desc: "Organise drawings by block, floor and zone. Switch between levels without losing context or evidence." },
  { icon: Save, title: "Save & Continue Later", desc: "Project state is preserved automatically in your browser. Pick up exactly where you left off." },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Designed for the site, not just the desk. Capture, pin and review evidence directly from your phone or tablet." },
  { icon: ClipboardCheck, title: "Multiple Report Types", desc: "Tailored layouts for LUX readings, inspections, snagging, QA, commissioning and handover packs." },
];

const honest = [
  { icon: MapPin, label: "Pin photos directly on drawings" },
  { icon: FileCheck2, label: "Generate professional PDF reports" },
  { icon: MonitorSmartphone, label: "Browser-based — no install" },
  { icon: Layers, label: "Multi-floor project support" },
  { icon: Save, label: "Save and continue later" },
  { icon: Download, label: "Photos export with clear filenames" },
];

const steps = [
  { n: "01", icon: Upload, title: "Upload Drawing", desc: "Drop in a PDF, JPG or PNG floor plan. Organise it by block, floor and zone instantly." },
  { n: "02", icon: Camera, title: "Add Photo Pins", desc: "Tap the exact location on your drawing, attach photos and add inspection notes from any device." },
  { n: "03", icon: FileCheck2, title: "Generate Report", desc: "Export a professionally formatted PDF with marked drawings, photos and notes — in under a minute." },
];

function Home() {
  useScrollReveal();
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* deep navy → black gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1c33] via-[#06121f] to-[#020812] pointer-events-none" />
        {/* blueprint grid */}
        <div className="absolute inset-0 blueprint-bg pointer-events-none" />
        {/* noise texture */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
          }}
        />
        {/* glows */}
        <div className="absolute -top-32 -right-40 h-[44rem] w-[44rem] rounded-full bg-[color:var(--brand-orange)]/30 blur-[160px] pointer-events-none animate-glow-breathe" />
        <div className="absolute top-1/3 -left-40 h-[32rem] w-[32rem] rounded-full bg-blue-500/15 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-[80%] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          <div className="lg:col-span-6 animate-rise">
            <span className="chip-orange">
              <Sparkles className="h-3.5 w-3.5" /> Project Evidence Reporting
            </span>
            <h1 className="mt-6 text-[2.75rem] sm:text-6xl lg:text-[4.25rem] font-bold leading-[1.02] tracking-tight text-white">
              Pin. Capture. Generate.{" "}
              <span className="relative inline-block text-gradient-orange">
                Done.
                <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[color:var(--brand-orange)] via-[#ff9a3c] to-transparent" />
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/70 max-w-lg leading-relaxed">
              Drawing-based site evidence reporting for engineers, contractors and site teams.
              Pin photos directly on your drawings, then export professional PDF reports in minutes.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 relative">
              <span className="absolute -inset-6 -z-10 rounded-full bg-[color:var(--brand-orange)]/25 blur-3xl" aria-hidden />
              <a
                href="/autopin-app/index.html"
                className="btn-orange inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold"
              >
                Start Project <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/how-it-works"
                className="btn-ghost-light inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold"
              >
                See How It Works
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-white/55">
              <span className="font-medium text-white/70">Browser-based</span>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span className="font-medium text-white/70">Drawing-based</span>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span className="font-medium text-white/70">PDF reports in minutes</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <HeroVisual />
          </div>
        </div>
      </section>


      {/* HONEST VALUE STRIP */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 -mt-4 reveal">
        <div className="lux-card rounded-2xl px-6 py-6">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 mb-4">
            Built for real site reporting
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {honest.map((h) => (
              <div key={h.label} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand-orange)]/15 text-[color:var(--brand-orange)] border border-[color:var(--brand-orange)]/25">
                  <h.icon className="h-3.5 w-3.5" />
                </span>
                <span className="text-[13px] font-medium text-white/80 leading-snug">{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="max-w-2xl reveal">
          <span className="chip-orange">Features</span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Everything you need to <span className="text-gradient-orange">report on site</span>
          </h2>
          <p className="mt-4 text-white/65 text-lg">
            Built for the way real engineering teams capture evidence — fast, structured, and tied to drawings.
          </p>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal group lux-card rounded-2xl p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[color:var(--brand-orange)]/45 hover:shadow-[0_30px_60px_-20px_rgba(255,122,0,0.35)]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-[color:var(--brand-orange)]/25 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/12 to-white/0 border border-white/12 group-hover:from-[color:var(--brand-orange)]/35 group-hover:border-[color:var(--brand-orange)]/50 transition">
                  <f.icon className="h-5 w-5 text-[color:var(--brand-orange-soft)]" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative mx-auto max-w-7xl px-4 sm:px-6 py-28">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="chip-orange">How it works</span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Three steps to a <span className="text-gradient-orange">finished report</span>
          </h2>
          <p className="mt-4 text-white/65 text-lg">From drawing to deliverable in less time than it takes to make a coffee.</p>
        </div>

        <div className="mt-20 relative">
          {/* Animated connector */}
          <svg
            className="hidden lg:block absolute top-10 left-[12%] right-[12%] w-[76%] h-8 pointer-events-none"
            viewBox="0 0 800 32"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="conn" x1="0" x2="1">
                <stop offset="0" stopColor="rgba(255,122,0,0)" />
                <stop offset="0.5" stopColor="rgba(255,122,0,0.7)" />
                <stop offset="1" stopColor="rgba(255,122,0,0)" />
              </linearGradient>
            </defs>
            <path d="M 20 16 Q 200 -10 400 16 T 780 16" stroke="url(#conn)" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
          </svg>

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="reveal lux-card rounded-3xl p-8 relative transition-transform duration-300 hover:-translate-y-1.5"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="absolute -top-4 left-8 text-xs font-bold tracking-[0.3em] text-[color:var(--brand-orange)] bg-[color:var(--navy-deep)] px-3 py-1 rounded-full border border-[color:var(--brand-orange)]/30">
                  STEP {s.n}
                </div>
                <div className="mt-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--brand-orange)] to-[#ff5500] shadow-[0_10px_30px_-8px_rgba(255,122,0,0.65)]">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-white/65 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* COMPARISON */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 py-28">
        <div className="relative lux-card rounded-[2rem] p-8 sm:p-12 overflow-hidden">
          <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-[color:var(--brand-orange)]/20 blur-[110px]" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/15 blur-[110px]" />
          <div className="relative text-center max-w-2xl mx-auto reveal">
            <span className="chip-orange">Why teams choose AutoPin</span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Traditional reporting vs <span className="text-gradient-orange">AutoPin Report</span>
            </h2>
          </div>
          <div className="relative mt-12 grid md:grid-cols-2 gap-6">
            <div className="reveal rounded-3xl p-8 border border-white/10 bg-white/[0.025] relative">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold uppercase tracking-wider text-white/40">Traditional</div>
                <Clock className="h-5 w-5 text-white/30" />
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-white/80">Slow, scattered, manual</h3>
              <ul className="mt-6 space-y-3.5">
                {[
                  "Hundreds of photos in unsorted folders",
                  "Manual Word/Excel report compilation",
                  "Difficult to trace location from a photo",
                  "Hours spent assembling each report",
                  "Inconsistent formatting between teams",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-white/55">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
                      <X className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal rounded-3xl p-8 lux-card relative overflow-hidden ring-1 ring-[color:var(--brand-orange)]/30">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[color:var(--brand-orange)]/30 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <div className="text-sm font-bold uppercase tracking-wider text-[color:var(--brand-orange)]">AutoPin Report</div>
                <Zap className="h-5 w-5 text-[color:var(--brand-orange)]" />
              </div>
              <h3 className="relative mt-3 text-2xl font-semibold text-white">Fast, structured, professional</h3>
              <ul className="relative mt-6 space-y-3.5">
                {[
                  "Every photo pinned to an exact drawing location",
                  "Professional PDF generated in one click",
                  "Multi-floor, multi-block project organisation",
                  "Reports ready in minutes, not hours",
                  "Consistent, branded output every time",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-white/90 font-medium">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-orange)] text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="flex items-end justify-between flex-wrap gap-4 reveal">
          <div className="max-w-xl">
            <span className="chip-orange">Use cases</span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-white tracking-tight">
              One platform. <span className="text-gradient-orange">Every site report.</span>
            </h2>
          </div>
          <Building2 className="h-12 w-12 text-white/10" />
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { t: "Site Reports", d: "General project evidence and progress records." },
            { t: "Inspections", d: "Room, floor, plant area and asset checks." },
            { t: "QA Evidence", d: "Structured photo evidence before closing works." },
            { t: "Snagging", d: "Pin defects and comments to exact locations." },
            { t: "Commissioning", d: "Record testing, readings and completed checks." },
            { t: "Handover Packs", d: "Create clean evidence packs for submission." },
          ].map((u, i) => (
            <div
              key={u.t}
              className="reveal group lux-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[color:var(--brand-orange)]/45 hover:shadow-[0_30px_60px_-20px_rgba(255,122,0,0.3)] relative overflow-hidden"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-[color:var(--brand-orange)]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[color:var(--brand-orange)]">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Verified</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{u.t}</h3>
                <p className="mt-1.5 text-sm text-white/65">{u.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 py-28">
        <div className="relative rounded-[2rem] lux-card p-10 sm:p-16 overflow-hidden reveal">
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--brand-orange)]/10 via-transparent to-blue-500/10" />
          <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-[color:var(--brand-orange)]/30 blur-[100px] animate-glow-breathe" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-blue-500/20 blur-[100px]" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="chip-orange">Get started</span>
              <h2 className="mt-5 text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Ready to create your <span className="text-gradient-orange">first report?</span>
              </h2>
              <p className="mt-4 text-white/70 text-lg max-w-md">
                Start with a drawing, add pins, capture evidence and export the report — no credit card required.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 relative">
                <span className="absolute -inset-4 -z-10 rounded-full bg-[color:var(--brand-orange)]/25 blur-2xl" aria-hidden />
                <a href="/autopin-app/index.html" className="btn-orange inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold">
                  Start Project <ArrowRight className="h-4 w-4" />
                </a>
                <Link to="/pricing" className="btn-ghost-light inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative animate-float-slow">
              <div className="absolute -inset-6 rounded-[2rem] bg-[color:var(--brand-orange)]/20 blur-3xl" aria-hidden />
              <div className="relative">
                <ReportCardPreview />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function HeroVisual() {
  // 14s loop choreography:
  //   1s drawing → pins drop (1–6s) with photo cards → PDF pages stack (7–10s)
  //   → green check + "Report Generated" (11–12s) → reset (13–14s)
  const LOOP = "14s";
  const pins = [
    { x: 28, y: 32, n: 1, pinAnim: "apx-pin-7", cardAnim: "apx-card-14", card: { top: "10%", left: "40%", label: "Floor 02 · Office A", file: "IMG_2401.jpg", hue: "from-orange-400/40 to-rose-500/30" } },
    { x: 62, y: 24, n: 2, pinAnim: "apx-pin-21", cardAnim: "apx-card-28", card: { top: "4%",  left: "74%", label: "Conf room · ceiling", file: "IMG_2402.jpg", hue: "from-amber-400/40 to-orange-500/30" } },
    { x: 48, y: 58, n: 3, pinAnim: "apx-pin-35", cardAnim: "apx-card-42", card: { top: "66%", left: "12%", label: "Lobby · LUX reading", file: "IMG_2403.jpg", hue: "from-sky-400/35 to-indigo-500/30" } },
  ];

  return (
    <div className="relative">
      {/* ambient glow + drop shadow */}
      <div className="absolute -inset-10 bg-gradient-to-br from-[color:var(--brand-orange)]/30 via-transparent to-blue-500/20 blur-[110px] rounded-[3rem] opacity-70 animate-glow-breathe pointer-events-none" />
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 h-20 w-[70%] rounded-[50%] bg-black/60 blur-2xl pointer-events-none" />

      {/* product window */}
      <div className="relative lux-card rounded-2xl overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,0.95)]">
        {/* browser bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-auto flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] text-white/60 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            autopin.report / project-a
          </div>
        </div>

        {/* toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.02] text-[11px]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[color:var(--brand-orange)]/15 text-[color:var(--brand-orange-soft)] border border-[color:var(--brand-orange)]/30 font-semibold">
              <MapPin className="h-3 w-3" /> Add Pin
            </span>
            <span className="px-2 py-1 rounded-md text-white/55">Upload</span>
            <span className="px-2 py-1 rounded-md text-white/55">Notes</span>
          </div>
          <span className="text-white/40 font-mono">level-02-floor-plan.pdf</span>
        </div>

        {/* stage */}
        <div
          className="relative aspect-[4/3] bg-[#091624] overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          {/* floor drawing */}
          <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <g stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none">
              <rect x="20" y="20" width="360" height="260" rx="2" />
              <line x1="180" y1="20" x2="180" y2="160" />
              <line x1="180" y1="160" x2="280" y2="160" />
              <line x1="280" y1="160" x2="280" y2="280" />
              <line x1="20" y1="180" x2="180" y2="180" />
              <path d="M 180 100 A 20 20 0 0 0 200 120" stroke="rgba(255,122,0,0.7)" />
              <path d="M 80 180 A 20 20 0 0 1 100 200" stroke="rgba(255,122,0,0.7)" />
            </g>
            <g fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">
              <text x="80" y="100">OFFICE A</text>
              <text x="240" y="90">CONF</text>
              <text x="60" y="230">LOBBY</text>
              <text x="220" y="230">PLANT</text>
            </g>
          </svg>

          {/* cursor moving between pins */}
          <div
            className="absolute top-0 left-0 pointer-events-none"
            style={{ animation: `apx-cursor ${LOOP} cubic-bezier(.4,0,.2,1) infinite` }}
          >
            <svg width="18" height="22" viewBox="0 0 18 22" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              <path d="M2 2 L2 17 L6 13 L9 20 L11 19 L8 12 L14 12 Z" fill="#fff" stroke="#0b1d31" strokeWidth="1.2" />
            </svg>
          </div>

          {/* pins */}
          {pins.map((p) => (
            <div
              key={p.n}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                marginLeft: -18,
                marginTop: -42,
                animation: `${p.pinAnim} ${LOOP} cubic-bezier(.34,1.56,.64,1) infinite`,
              }}
            >
              <div className="relative flex flex-col items-center">
                <div className="relative h-9 w-9 rounded-full bg-gradient-to-br from-[color:var(--brand-orange)] to-[#ff5500] flex items-center justify-center text-[11px] font-bold text-white animate-pin-glow ring-2 ring-[color:var(--navy-deep)]">
                  {p.n}
                </div>
                <div className="h-3 w-0.5 bg-[color:var(--brand-orange)]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-orange)]" />
              </div>
            </div>
          ))}

          {/* photo evidence cards */}
          {pins.map((p) => (
            <div
              key={`c${p.n}`}
              className="absolute w-[34%] max-w-[160px] origin-top-left"
              style={{
                top: p.card.top,
                left: p.card.left,
                animation: `${p.cardAnim} ${LOOP} cubic-bezier(.22,.61,.36,1) infinite`,
              }}
            >
              <div className="rounded-lg bg-[#0e2238] border border-white/15 p-1.5 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.8)]">
                <div className={`relative h-12 rounded-md overflow-hidden bg-gradient-to-br ${p.card.hue}`}>
                  <div className="absolute inset-0 mix-blend-overlay opacity-60" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.35), transparent 60%), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.4), transparent 60%)" }} />
                  <span className="absolute top-1 left-1 inline-flex items-center px-1 py-px rounded bg-[color:var(--brand-orange)] text-white text-[8px] font-bold">PIN {p.n.toString().padStart(2, "0")}</span>
                </div>
                <div className="mt-1 px-0.5">
                  <div className="text-[9px] font-semibold text-white leading-tight truncate">{p.card.label}</div>
                  <div className="text-[8px] font-mono text-white/45 truncate">{p.card.file}</div>
                </div>
              </div>
            </div>
          ))}

          {/* PDF stack — assembles in lower-right */}
          <div className="absolute bottom-3 right-3 w-[38%] max-w-[180px] aspect-[3/4]">
            {[
              { anim: "apx-page-52", z: 1, off: 0 },
              { anim: "apx-page-60", z: 2, off: 6 },
              { anim: "apx-page-68", z: 3, off: 12 },
            ].map((pg, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-md bg-white shadow-[0_12px_28px_-8px_rgba(0,0,0,0.7)] border border-white/30"
                style={{
                  zIndex: pg.z,
                  marginLeft: pg.off,
                  marginTop: -pg.off,
                  animation: `${pg.anim} ${LOOP} cubic-bezier(.22,.61,.36,1) infinite`,
                }}
              >
                <div className="p-2 h-full flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="h-1.5 w-8 rounded-full bg-[color:var(--brand-orange)]" />
                    <div className="text-[7px] font-mono text-slate-400">PG {i + 1}</div>
                  </div>
                  <div className="mt-1.5 space-y-1">
                    <div className="h-1 w-3/4 rounded-full bg-slate-300" />
                    <div className="h-1 w-1/2 rounded-full bg-slate-200" />
                  </div>
                  <div className="mt-2 flex-1 rounded-sm bg-slate-100 relative overflow-hidden">
                    <div className="absolute inset-1 grid grid-cols-3 gap-0.5">
                      <span className="bg-slate-200 rounded-[1px]" />
                      <span className="bg-slate-300 rounded-[1px]" />
                      <span className="bg-slate-200 rounded-[1px]" />
                    </div>
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[color:var(--brand-orange)]" />
                  </div>
                  <div className="mt-1.5 space-y-0.5">
                    <div className="h-[3px] w-full rounded-full bg-slate-200" />
                    <div className="h-[3px] w-5/6 rounded-full bg-slate-200" />
                    <div className="h-[3px] w-2/3 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* generating progress bar */}
          <div className="absolute bottom-3 left-3 right-[44%] max-w-[200px]">
            <div className="flex items-center justify-between text-[9px] font-semibold text-white/70 mb-1">
              <span className="inline-flex items-center gap-1">
                <FileText className="h-2.5 w-2.5" /> Generating report
              </span>
              <span className="font-mono text-white/45">12 pages</span>
            </div>
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[color:var(--brand-orange)] to-[#ff5500]"
                style={{ animation: `apx-progress ${LOOP} linear infinite` }}
              />
            </div>
          </div>

          {/* success badge */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/40 backdrop-blur px-3 py-1.5"
            style={{ animation: `apx-text ${LOOP} ease-out infinite` }}
          >
            <span
              className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white"
              style={{ animation: `apx-check ${LOOP} cubic-bezier(.34,1.56,.64,1) infinite` }}
            >
              <Check className="h-3 w-3" strokeWidth={4} />
            </span>
            <span className="text-[12px] font-semibold text-emerald-200">Report Generated</span>
          </div>
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/10 bg-white/[0.02] text-[11px] text-white/55">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live demo
            </span>
            <span>Drawing → Pin → Photo → PDF</span>
          </div>
          <span className="font-mono text-white/40">14s loop</span>
        </div>
      </div>
    </div>
  );
}



function ReportCardPreview() {
  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[color:var(--brand-orange)] to-[#ff5500] flex items-center justify-center text-white font-bold text-xs">
          PDF
        </div>
        <div>
          <div className="font-semibold text-white">Inspection_Report.pdf</div>
          <div className="text-xs text-white/50">Generated · Level 02 · 8 pins</div>
        </div>
        <span className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
      </div>
      <div className="mt-5 space-y-2.5">
        {[
          "Pin-001 — Lobby — Level 02",
          "Pin-002 — Corridor — Level 02",
          "Pin-003 — Plant Room — Roof",
          "Pin-004 — Office A — Level 02",
        ].map((r) => (
          <div key={r} className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm">
            <span className="font-medium text-white/85">{r}</span>
            <Check className="h-4 w-4 text-[color:var(--brand-orange)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
