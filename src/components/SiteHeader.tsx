import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Menu, X, Vote, ShieldCheck, UserCog, UserRound, ScrollText, ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavLink = { to: string; label: string; icon: LucideIcon };

const navLinks: NavLink[] = [
  { to: "/", label: "Elections", icon: Vote },
  { to: "/admin", label: "Admin", icon: ShieldCheck },
  { to: "/creator", label: "Creator", icon: UserCog },
  { to: "/voter", label: "Voter", icon: UserRound },
  { to: "/audit", label: "Audit", icon: ScrollText },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="container mx-auto max-w-7xl flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          {!isHome && (
            <button
              type="button"
              aria-label="Go back"
              onClick={() => window.history.back()}
              className="h-9 w-9 grid place-items-center rounded-lg border border-border/60 bg-input/40 hover:border-neon-blue/50 hover:bg-sidebar-accent/60 transition shrink-0"
            >
              <ArrowLeft className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="group relative px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition flex items-center gap-1.5 data-[status=active]:text-foreground"
            >
              <l.icon className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 group-data-[status=active]:text-neon-blue group-data-[status=active]:opacity-100" />
              {l.label}
              <span className="pointer-events-none absolute left-3 right-3 -bottom-px h-px bg-gradient-primary opacity-0 group-data-[status=active]:opacity-100 transition" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-primary text-background hover:opacity-90 border-0">
            <Link to="/signup">Get started</Link>
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden h-9 w-9 grid place-items-center rounded-lg border border-border/60 bg-input/40 hover:border-neon-blue/50 transition"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground data-[status=active]:bg-sidebar-accent/60 data-[status=active]:text-foreground transition"
              >
                <l.icon className="h-4 w-4 text-neon-blue" />
                {l.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="sm:hidden flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground transition"
            >
              Sign in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
