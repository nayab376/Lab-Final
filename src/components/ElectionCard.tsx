import { Link } from "@tanstack/react-router";
import { Calendar, Users, ArrowUpRight } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { StatusBadge } from "./StatusBadge";
import type { Election } from "@/lib/mock";

export function ElectionCard({ election }: { election: Election }) {
  const pct = Math.round((election.votesCast / election.maxVoters) * 100);
  const to = election.status === "completed" ? "/elections/$id/results" : "/elections/$id/vote";
  return (
    <Link to={to} params={{ id: election.id }} className="group block">
      <GlassCard className="h-full flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
              {election.category}
            </div>
            <h3 className="mt-1 font-display text-lg font-semibold leading-tight">
              {election.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{election.organization}</p>
          </div>
          <StatusBadge status={election.status} />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{election.description}</p>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{election.votesCast.toLocaleString()} / {election.maxVoters.toLocaleString()}</span>
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(election.endDate).toLocaleDateString()}</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-primary" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground">{election.candidates.length} candidates</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-neon-blue group-hover:translate-x-0.5 transition">
              {election.status === "completed" ? "View results" : "Enter booth"}
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
