import { Link, useRouterState, Outlet } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import type { LucideIcon } from "lucide-react";
import { Bell, Search, ArrowLeft } from "lucide-react";

export interface NavItem { label: string; to: string; icon: LucideIcon; exact?: boolean; }

export function DashboardShell({ items, title }: { items: NavItem[]; title: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen w-full grid-bg">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl">
          <div className="h-16 flex items-center px-5 border-b border-sidebar-border justify-between">
            <Logo />
            <button
              type="button"
              aria-label="Go back"
              onClick={() => window.history.back()}
              className="h-8 w-8 grid place-items-center rounded-lg border border-sidebar-border bg-sidebar-accent/40 hover:border-neon-blue/50 hover:bg-sidebar-accent/70 transition"
            >
              <ArrowLeft className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
          <div className="px-3 py-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground px-3 mb-2">
              {title}
            </div>
            <nav className="flex flex-col gap-1">
              {items.map((it) => {
                const active = it.exact ? pathname === it.to : pathname === it.to || pathname.startsWith(it.to + "/");
                return (
                  <Link
                    key={it.to}
                    to={it.to}
                    className={cn(
                      "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition",
                      active
                        ? "bg-gradient-primary text-background font-semibold glow-blue"
                        : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60",
                    )}
                  >
                    <it.icon className="h-4 w-4" />
                    {it.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <div className="glass rounded-xl p-4 text-xs">
              <div className="font-semibold text-foreground">Security tier</div>
              <div className="text-muted-foreground mt-1">AES-256 · TLS 1.3 · ZK audit</div>
              <div className="mt-2 inline-flex items-center gap-1.5 text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 pulse-glow" />
                All systems nominal
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <header className="h-16 sticky top-0 z-30 backdrop-blur-xl bg-background/60 border-b border-border/60 flex items-center justify-between gap-3 px-4 md:px-8">
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                aria-label="Go back"
                onClick={() => window.history.back()}
                className="h-8 w-8 grid place-items-center rounded-lg border border-border/60 bg-input/40 hover:border-neon-blue/50 hover:bg-sidebar-accent/60 transition"
              >
                <ArrowLeft className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
              <Logo compact />
            </div>
            <div className="relative flex-1 max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search elections, voters, logs..."
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-input/60 border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="relative h-10 w-10 grid place-items-center rounded-xl bg-input/60 border border-border/60 hover:border-neon-blue/50 transition">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-neon-purple pulse-glow" />
              </button>
              <div className="h-10 w-10 rounded-xl bg-gradient-primary text-background grid place-items-center text-sm font-bold">
                AK
              </div>
            </div>
          </header>
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
