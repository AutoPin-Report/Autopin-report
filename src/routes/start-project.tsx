import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Upload, Plus, ZoomIn, ZoomOut, RotateCcw, Trash2, FileDown, ImageDown, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/start-project")({
  head: () => ({
    meta: [
      { title: "Start Project — AutoPin Report" },
      { name: "description", content: "Upload drawings, pin photo evidence on the exact location, add notes and export a professional PDF report." },
      { property: "og:title", content: "Start a new AutoPin project" },
      { property: "og:description", content: "Drawing upload, location pinning, photo capture and PDF export — all in one workspace." },
    ],
  }),
  component: StartProject,
});

type Floor = { id: string; name: string; drawingUrl?: string };
type Pin = { id: string; floorId: string; x: number; y: number; location: string; note: string };

const QUICK = ["GF", "Level 01", "Level 02", "Level 03", "Level 04", "Level 05", "Level 06", "Roof"];
const REPORT_TYPES = [
  "Lux Report - Emergency",
  "Lux Report - General",
  "Inspection Report",
  "QA Evidence",
  "Snagging Report",
  "Commissioning",
  "Handover Pack",
];

function StartProject() {
  const [project, setProject] = useState({ name: "", details: "", company: "", address: "", block: "" });
  const [logo, setLogo] = useState<string>("");
  const [floors, setFloors] = useState<Floor[]>([]);
  const [floorName, setFloorName] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [reportType, setReportType] = useState(REPORT_TYPES[0]);
  const [pins, setPins] = useState<Pin[]>([]);
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [zoom, setZoom] = useState(1);

  const drawingFileRef = useRef<HTMLInputElement>(null);
  const logoFileRef = useRef<HTMLInputElement>(null);

  const current = useMemo(() => floors.find((f) => f.id === selectedFloor), [floors, selectedFloor]);
  const currentPins = pins.filter((p) => p.floorId === selectedFloor);

  function fileToDataUrl(f: File): Promise<string> {
    return new Promise((res, rej) => {
      const r = new FileReader(); r.onload = () => res(String(r.result)); r.onerror = rej; r.readAsDataURL(f);
    });
  }

  async function addFloor() {
    const name = floorName.trim();
    if (!name) return;
    const file = drawingFileRef.current?.files?.[0];
    const drawingUrl = file ? await fileToDataUrl(file) : undefined;
    const id = Math.random().toString(36).slice(2, 9);
    const next = [...floors, { id, name, drawingUrl }];
    setFloors(next);
    setSelectedFloor(id);
    setFloorName("");
    if (drawingFileRef.current) drawingFileRef.current.value = "";
  }

  async function onLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    setLogo(await fileToDataUrl(f));
  }

  function pinOnDrawing(e: React.MouseEvent<HTMLDivElement>) {
    if (!current?.drawingUrl) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const id = Math.random().toString(36).slice(2, 9);
    setPins([...pins, { id, floorId: current.id, x, y, location: location || "Not specified", note }]);
    setLocation(""); setNote("");
  }

  function clearAll() {
    if (!confirm("Clear current demo?")) return;
    setFloors([]); setPins([]); setSelectedFloor(""); setZoom(1);
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* COLUMN 1 — BLOCK SETUP */}
          <section className="lg:col-span-3 rounded-2xl bg-white border border-border p-6">
            <Step n={1} title="Block setup" desc="Add all floor drawings first. This demo opens blank for every new session." />
            <div className="mt-5 space-y-4">
              <Field label="Project name" value={project.name} onChange={(v) => setProject({ ...project, name: v })} placeholder="Example: Project name" />
              <Field label="Project details" value={project.details} onChange={(v) => setProject({ ...project, details: v })} placeholder="Photo evidence report / Project documentation" />
              <Field label="Company name" value={project.company} onChange={(v) => setProject({ ...project, company: v })} placeholder="Example: Company name" />
              <Field label="Company address" textarea value={project.address} onChange={(v) => setProject({ ...project, address: v })} placeholder="Company address shown on PDF report" />

              <div>
                <label className="text-sm font-semibold text-navy">Company logo</label>
                <input ref={logoFileRef} type="file" accept="image/*" onChange={onLogo} className="mt-2 block w-full text-sm" />
                <div className="mt-2 text-xs text-muted-foreground">{logo ? "Logo uploaded." : "No logo uploaded yet."}</div>
                {logo && <img src={logo} alt="logo" className="mt-2 h-10" />}
              </div>

              <Field label="Block name" value={project.block} onChange={(v) => setProject({ ...project, block: v })} placeholder="Example: Block A / Block 01" />

              <div className="pt-2 border-t border-border">
                <div className="text-sm font-semibold text-navy">Floor name</div>
                <input value={floorName} onChange={(e) => setFloorName(e.target.value)} placeholder="Example: Level 04 / Basement / Roof"
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {QUICK.map((q) => (
                    <button key={q} onClick={() => setFloorName(q)}
                      className="text-xs font-semibold rounded-md border border-border bg-secondary px-2 py-1.5 hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]">
                      + {q}
                    </button>
                  ))}
                </div>

                <div className="mt-3 text-sm font-semibold text-navy">Upload drawing</div>
                <input ref={drawingFileRef} type="file" accept="image/*,.pdf" className="mt-2 block w-full text-sm" />
                <div className="text-xs text-muted-foreground mt-1">PDF, JPG or PNG supported.</div>

                <button onClick={addFloor} className="btn-orange mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold">
                  <Plus className="h-4 w-4" /> Add drawing / floor
                </button>
              </div>

              {floors.length === 0 ? (
                <div className="text-xs text-muted-foreground pt-2">No floors uploaded yet.</div>
              ) : (
                <ul className="pt-2 space-y-1.5">
                  {floors.map((f) => (
                    <li key={f.id}>
                      <button onClick={() => setSelectedFloor(f.id)}
                        className={`w-full text-left rounded-lg px-3 py-2 text-sm border ${selectedFloor === f.id ? "border-[color:var(--brand-orange)] bg-[color:var(--brand-orange)]/5 text-navy font-bold" : "border-border bg-secondary/50 text-foreground/80"}`}>
                        {f.name} {f.drawingUrl ? "" : "· (no drawing)"}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* COLUMN 2 — CHOOSE FLOOR & PIN */}
          <section className="lg:col-span-6 rounded-2xl bg-white border border-border p-6">
            <Step n={2} title="Choose floor & pin" desc="Select report type, choose floor, tap location, then capture photo evidence." />

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <select value={selectedFloor} onChange={(e) => setSelectedFloor(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-semibold">
                <option value="">Choose floor</option>
                {floors.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
              <select value={reportType} onChange={(e) => setReportType(e.target.value)}
                className="rounded-lg border border-border bg-[color:var(--brand-orange)]/10 px-3 py-2.5 text-sm font-semibold text-navy">
                {REPORT_TYPES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>

            <input value={location} onChange={(e) => setLocation(e.target.value)}
              placeholder="Location: lift lobby, corridor, apartment, riser, wall area, room reference"
              className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2}
              placeholder="Optional note/comment for the report: issue found, area complete, before/after note, inspection comment"
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />

            <div className="mt-3 flex items-center gap-2">
              <button onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)))}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-bold"><ZoomOut className="h-3.5 w-3.5" /> Zoom</button>
              <span className="text-xs font-bold text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom((z) => Math.min(3, +(z + 0.1).toFixed(2)))}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-bold"><ZoomIn className="h-3.5 w-3.5" /> Zoom</button>
              <button onClick={() => setZoom(1)}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-bold"><RotateCcw className="h-3.5 w-3.5" /> Reset</button>
            </div>

            <div className="mt-3 rounded-lg bg-[color:var(--brand-orange)]/10 border border-[color:var(--brand-orange)]/30 px-3 py-2 text-xs font-semibold text-navy">
              {current?.drawingUrl ? "Tap the drawing to add a photo pin." : "Upload drawings, choose a floor, then tap the drawing to add a photo pin."}
            </div>

            <div className="mt-3 relative rounded-xl border-2 border-dashed border-border bg-secondary/40 overflow-hidden" style={{ aspectRatio: "4/3" }}>
              {current?.drawingUrl ? (
                <div onClick={pinOnDrawing}
                  className="absolute inset-0 cursor-crosshair"
                  style={{ backgroundImage: `url(${current.drawingUrl})`, backgroundSize: `${zoom * 100}%`, backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                  {currentPins.map((p, i) => (
                    <div key={p.id} className="absolute -translate-x-1/2 -translate-y-full" style={{ top: `${p.y}%`, left: `${p.x}%` }}>
                      <div className="flex flex-col items-center">
                        <div className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg" style={{ background: "var(--brand-orange)" }}>{i + 1}</div>
                        <div className="h-2 w-0.5" style={{ background: "var(--brand-orange)" }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                  <Upload className="h-8 w-8" />
                  <div className="mt-2 text-sm font-semibold">Upload drawings and choose a floor to start pinning.</div>
                </div>
              )}
            </div>
          </section>

          {/* COLUMN 3 — PHOTOS & EXPORT */}
          <aside className="lg:col-span-3 rounded-2xl bg-white border border-border p-6">
            <Step n={3} title="Photos & export" desc="Report labels include Photo No - Location - Block - Floor - Report Type. Multiple photos can be attached to the same pin." />
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Stat label="Floors" value={floors.length} />
              <Stat label="Photos" value={pins.length} />
            </div>

            <button className="btn-navy mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold">
              <FileDown className="h-4 w-4" /> Generate PDF Report
            </button>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-bold text-navy">
                <ImageDown className="h-3.5 w-3.5" /> Floor Photos
              </button>
              <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-bold text-navy">
                <ImageDown className="h-3.5 w-3.5" /> All Photos
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Photos download with clear file names such as Pin-001_Level-02_Corridor.jpg.</p>

            <button onClick={clearAll} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/30 text-destructive px-3 py-2 text-sm font-bold hover:bg-destructive/5">
              <Trash2 className="h-4 w-4" /> Clear Current Demo
            </button>

            <div className="mt-5 border-t border-border pt-4">
              <div className="text-sm font-bold text-navy">Pins on this floor</div>
              {currentPins.length === 0 ? (
                <div className="text-xs text-muted-foreground mt-2">No photos for this floor yet.</div>
              ) : (
                <ul className="mt-2 space-y-2">
                  {currentPins.map((p, i) => (
                    <li key={p.id} className="rounded-lg bg-secondary px-3 py-2 text-xs">
                      <div className="flex items-center gap-2 font-bold text-navy">
                        <MapPin className="h-3.5 w-3.5 text-[color:var(--brand-orange)]" />
                        Pin-{String(i + 1).padStart(3, "0")} · {p.location}
                      </div>
                      {p.note && <div className="text-muted-foreground mt-1">{p.note}</div>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-white font-black text-sm" style={{ background: "var(--brand-orange)" }}>{n}</div>
        <div className="text-xl font-extrabold text-navy">{title}</div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, textarea }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; textarea?: boolean }) {
  return (
    <div>
      <label className="text-sm font-semibold text-navy">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={2}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/50 p-4 text-center">
      <div className="text-3xl font-black text-navy">{value}</div>
      <div className="mt-0.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  );
}
