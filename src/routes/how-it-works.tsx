import { createFileRoute } from "@tanstack/react-router";
import { Upload, Layers, MapPin, Camera, StickyNote, FileDown, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — AutoPin Report" },
      { name: "description", content: "Built around your site workflow: upload drawings, pin locations, capture photos, add notes and export a professional PDF report." },
      { property: "og:title", content: "How AutoPin Report Works" },
      { property: "og:description", content: "Six simple steps from drawing upload to a polished PDF evidence report." },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  { n: 1, title: "Upload Drawings", desc: "Import PDF, JPG or PNG floor plans for the entire block.", icon: Upload },
  { n: 2, title: "Select a Floor", desc: "Choose the floor drawing where evidence will be recorded.", icon: Layers },
  { n: 3, title: "Pin the Location", desc: "Mark the exact location on the drawing.", icon: MapPin },
  { n: 4, title: "Capture Evidence", desc: "Take one or multiple photos directly from the pinned location.", icon: Camera },
  { n: 5, title: "Add Notes", desc: "Include comments, observations or inspection notes for each photo.", icon: StickyNote },
  { n: 6, title: "Export Report", desc: "Generate a professional PDF with marked drawings, full photos, notes and photo evidence by report type.", icon: FileDown },
];

function HowItWorks() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-[color:var(--brand-orange)]/20 blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 text-center">
          <span className="chip-orange">How It Works</span>
          <h1 className="mt-5 text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Built around your <span className="text-gradient-orange">site workflow</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-white/65 text-lg">
            Six clear steps from drawing upload to a polished, structured PDF evidence report —
            designed by people who do site reporting every day.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <ol className="relative grid md:grid-cols-2 gap-6">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[color:var(--brand-orange)]/30 to-transparent -translate-x-1/2" />
          {steps.map((s) => (
            <li key={s.n} className="glass-strong rounded-2xl p-7 relative group hover:border-[color:var(--brand-orange)]/40 transition">
              <div className="flex items-start gap-5">
                <div className="shrink-0">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[color:var(--brand-orange)] to-[#ff5500] flex items-center justify-center text-white font-bold text-lg shadow-[0_10px_30px_-8px_rgba(255,122,0,0.6)]">
                    {s.n}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-white">
                    <s.icon className="h-5 w-5 text-[color:var(--brand-orange-soft)]" />
                    <h3 className="text-xl font-semibold">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-white/60 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 text-center">
          <a href="/autopin-app/index.html" className="btn-orange inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold">
            Start Project <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
