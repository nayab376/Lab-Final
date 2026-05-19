import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/GlassCard";
import { elections } from "@/lib/mock";
import { Vote, Users, BarChart3, Plus, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ElectionCard } from "@/components/ElectionCard";

export const Route = createFileRoute("/creator/")({ component: CreatorOverview });

function CreatorOverview() {
  const mine = elections.slice(0, 4);
  const totals = {
    elections: mine.length,
    voters: mine.reduce((s, e) => s + e.voters, 0),
    votes: mine.reduce((s, e) => s + e.votesCast, 0),
    active: mine.filter((e) => e.status === "active").length,
  };
  const tiles = [
    { label: "Your elections", value: totals.elections, icon: Vote },
    { label: "Total voters", value: totals.voters.toLocaleString(), icon: Users },
    { label: "Votes cast", value: totals.votes.toLocaleString(), icon: BarChart3 },
    { label: "Live now", value: totals.active, icon: Activity },
  ];
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Creator console</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Manage your elections</h1>
          <p className="text-muted-foreground mt-1">Create ballots, manage candidates, issue secret voter IDs.</p>
        </div>
        <Button asChild className="bg-gradient-primary text-background border-0">
          <Link to="/creator/elections/new"><Plus className="h-4 w-4 mr-2" /> New election</Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((t) => (
          <GlassCard key={t.label}>
            <t.icon className="h-5 w-5 text-neon-blue" />
            <div className="mt-3 font-display text-3xl font-bold">{t.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{t.label}</div>
          </GlassCard>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold">Recent elections</h2>
          <Link to="/creator/elections" className="text-sm text-neon-blue hover:underline">View all →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mine.map((e) => <ElectionCard key={e.id} election={e} />)}
        </div>
      </div>
    </div>
  );
}
