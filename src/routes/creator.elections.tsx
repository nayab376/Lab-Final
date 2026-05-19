import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { elections } from "@/lib/mock";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/creator/elections")({ component: ElectionsList });

function ElectionsList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">My elections</h1>
          <p className="text-muted-foreground mt-1">All ballots you've created.</p>
        </div>
        <Button asChild className="bg-gradient-primary text-background border-0">
          <Link to="/creator/elections/new"><Plus className="h-4 w-4 mr-2" /> New</Link>
        </Button>
      </div>
      <GlassCard className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-sidebar/40">
              <tr><th className="text-left px-6 py-3">Title</th><th>Status</th><th>Candidates</th><th>Turnout</th><th className="text-right px-6">Actions</th></tr>
            </thead>
            <tbody>
              {elections.map((e) => (
                <tr key={e.id} className="border-t border-border/40 hover:bg-sidebar-accent/30 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium">{e.title}</div>
                    <div className="text-xs text-muted-foreground">{e.organization}</div>
                  </td>
                  <td><StatusBadge status={e.status} /></td>
                  <td>{e.candidates.length}</td>
                  <td>
                    <div className="w-32">
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-gradient-primary" style={{ width: `${Math.round((e.votesCast/e.maxVoters)*100)}%` }} />
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-1">{e.votesCast.toLocaleString()} / {e.maxVoters.toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-6 text-right">
                    <div className="inline-flex gap-1.5">
                      <Button asChild size="icon" variant="outline" className="h-8 w-8"><Link to="/elections/$id/results" params={{ id: e.id }}><Pencil className="h-3.5 w-3.5" /></Link></Button>
                      <Button size="icon" variant="outline" className="h-8 w-8 text-destructive border-destructive/40"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
