import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/autopin-full-logo.png.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { href: "/autopin-app/index.html#projects", label: "My Projects" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="AutoPin Report — Home">
      <span className="relative inline-flex items-center rounded-xl bg-white px-2 py-1.5 shadow-[0_8px_22px_-10px_rgba(255,122,0,0.55)] ring-1 ring-white/15">
        <img src={logoAsset.url} alt="AutoPin Report" className="h-7 w-auto" />
        <span className="pointer-events-none absolute -inset-1 rounded-xl bg-[color:var(--brand-orange)]/25 blur-md opacity-0 group-hover:opacity-100 transition" />
      </span>
    </Link>
  );
}

function NavItem({ item, onClick, mobile }: { item: (typeof nav)[number]; onClick?: () => void; mobile?: boolean }) {
  const { location } = useRouterState();
  const base = mobile
    ? "px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:bg-white/5"
    : "px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all";
  if ("href" in item) {
    return (
      <a href={item.href} onClick={onClick} className={`${base} ${mobile ? "" : "text-white/65 hover:text-white"}`}>
        {item.label}
      </a>
    );
  }
  const active = location.pathname === item.to;
  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={`${base} ${mobile ? "" : active ? "bg-white/10 text-white" : "text-white/65 hover:text-white"}`}
    >
      {item.label}
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 bg-[color:var(--navy-deep)]/70 backdrop-blur-xl border-b border-white/5" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Logo />
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-1.5 py-1.5 backdrop-blur">
          {nav.map((n) => <NavItem key={n.label} item={n} />)}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="/autopin-app/index.html"
            className="btn-orange hidden sm:inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            Start Project
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-white/10 bg-white/5 text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="relative md:hidden border-t border-white/10 bg-[color:var(--navy-deep)]/95 backdrop-blur-xl">
          <div className="px-4 py-4 flex flex-col gap-1">
            {nav.map((n) => <NavItem key={n.label} item={n} mobile onClick={() => setOpen(false)} />)}
            <a
              href="/autopin-app/index.html"
              onClick={() => setOpen(false)}
              className="btn-orange mt-2 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold sm:hidden"
            >
              Start Project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-black/40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 text-sm text-white/60 max-w-sm leading-relaxed">
            Drawing-based site evidence reporting for engineers, contractors and site teams.
            Pin photos directly on drawings, then generate professional PDF reports in minutes.
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Product</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="text-white/60 hover:text-white transition">Home</Link></li>
            <li><a href="/autopin-app/index.html" className="text-white/60 hover:text-white transition">Start Project</a></li>
            <li><a href="/autopin-app/index.html#projects" className="text-white/60 hover:text-white transition">My Projects</a></li>
            <li><Link to="/how-it-works" className="text-white/60 hover:text-white transition">How It Works</Link></li>
            <li><Link to="/pricing" className="text-white/60 hover:text-white transition">Pricing</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Legal</div>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">Terms &amp; Conditions</Link></li>
            <li><Link to="/privacy" hash="gdpr" className="hover:text-white transition">GDPR Rights</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Contact</div>
          <p className="text-sm text-white/60">For demos, feedback, pilot projects and support.</p>
          <a
            href="mailto:Hello.AutoPinhelp@gmail.com"
            className="mt-3 inline-flex items-center gap-2 text-sm text-white hover:text-[color:var(--brand-orange)] transition"
          >
            Hello.AutoPinhelp@gmail.com
          </a>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <div>© 2026 AutoPin Report.</div>
          <div>Users should only upload drawings, photos and project information they are allowed to use.</div>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
