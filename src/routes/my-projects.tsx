import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, RotateCcw, FileDown, Trash2, FolderOpen } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/my-projects")({
  head: () => ({
    meta: [
      { title: "My Projects — AutoPin Report" },
      { name: "description", content: "Save current progress, continue later, generate the report, or delete a saved project. Stored locally in your browser for the prototype." },
      { property: "og:title", content: "My Projects — AutoPin Report" },
      { property: "og:description", content: "Local browser prototype to save and reload your AutoPin Report projects." },
    ],
  }),
  component: MyProjects,
});

const STORAGE_KEY = "autopin.projects.v1";

type SavedProject = { name: string; savedAt: string };

function MyProjects() {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("Your saved projects are stored only in this browser for prototype testing.");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProjects(JSON.parse(raw));
    } catch {}
  }, []);

  function persist(next: SavedProject[]) {
    setProjects(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  }

  function save() {
    const trimmed = name.trim();
    if (!trimmed) { setStatus("Please enter a project save name."); return; }
    const next = [{ name: trimmed, savedAt: new Date().toISOString() }, ...projects.filter((p) => p.name !== trimmed)];
    persist(next);
    setStatus(`Saved "${trimmed}" to this browser.`);
    setSelected(trimmed);
  }
  function continueLater() {
    if (!selected) { setStatus("Choose a saved project to continue."); return; }
    setStatus(`Loaded "${selected}". Open Start Project to keep working.`);
  }
  function del() {
    if (!selected) { setStatus("Choose a saved project to delete."); return; }
    persist(projects.filter((p) => p.name !== selected));
    setStatus(`Deleted "${selected}".`);
    setSelected("");
  }

  return (
    <SiteLayout>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          <span className="chip-orange">Project Workspace</span>
          <h1 className="mt-4 text-4xl sm:text-6xl font-black">My Projects</h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Save your current progress, continue later, generate the report, or delete a saved project. User login and team sharing will be added together in the real cloud version.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
        <div className="rounded-3xl bg-white border border-border shadow-sm p-6 sm:p-10">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[color:var(--brand-orange)]">
            <FolderOpen className="h-4 w-4" /> Local prototype save
          </div>

          <div className="mt-6 grid gap-5">
            <div>
              <label className="text-sm font-semibold text-navy">Project save name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Example: Block A — Lux Report"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-orange)]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-navy">Saved projects</label>
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-orange)]"
              >
                <option value="">Select saved project</option>
                {projects.map((p) => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <button onClick={save} className="btn-orange inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold">
                <Save className="h-4 w-4" /> Save Progress
              </button>
              <button onClick={continueLater} className="btn-navy inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold">
                <RotateCcw className="h-4 w-4" /> Continue Later
              </button>
              <Link to="/start-project" className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold border border-border bg-secondary text-navy hover:bg-secondary/70">
                <FileDown className="h-4 w-4" /> Generate Report
              </Link>
              <button onClick={del} className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold border border-destructive/30 text-destructive hover:bg-destructive/5">
                <Trash2 className="h-4 w-4" /> Delete Project
              </button>
            </div>

            <p className="text-xs text-muted-foreground pt-2">{status}</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
