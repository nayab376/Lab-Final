import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/GlassCard";
import { elections } from "@/lib/mock";
import { StatusBadge } from "@/components/StatusBadge";
import { BarChart3 } from "lucide-react";

export const Route = createFileRoute("/creator/results")({ component: ResultsOverview });

function ResultsOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Results overview</h1>
        <p className="text-muted-foreground mt-1">Live and final tallies across your elections.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {elections.map((e) => {
          const sorted = [...e.candidates].sort((a, b) => b.votes - a.votes);
          const leader = sorted[0];
          const total = e.candidates.reduce((s, c) => s + c.votes, 0) || 1;
          return (
            <Link key={e.id} to="/elections/$id/results" params={{ id: e.id }} className="block">
              <GlassCard className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{e.category}</div>
                    <div className="font-display text-lg font-semibold mt-1">{e.title}</div>
                  </div>
                  <StatusBadge status={e.status} />
                </div>
                <div className="mt-4 space-y-2">
                  {sorted.slice(0, 3).map((c) => {
                    const pct = Math.round((c.votes / total) * 100);
                    return (
                      <div key={c.id}>
                        <div className="flex justify-between text-xs mb-1"><span>{c.name}</span><span className="text-muted-foreground">{pct}%</span></div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${c.color}, var(--neon-purple))` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Leading: <span className="text-foreground font-medium">{leader.name}</span></span>
                  <span className="inline-flex items-center gap-1 text-neon-blue"><BarChart3 className="h-3.5 w-3.5" /> View full</span>
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
