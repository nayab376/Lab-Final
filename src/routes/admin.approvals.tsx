import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { approvals } from "@/lib/mock";
import { Check, X, Eye, Search } from "lucide-react";

export const Route = createFileRoute("/admin/approvals")({ component: Approvals });

function Approvals() {
  const [q, setQ] = useState("");
  const rows = approvals.filter((a) => (a.title + a.creator + a.id).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Approval requests</h1>
        <p className="text-muted-foreground mt-1">Review and authorize new elections before they go live.</p>
      </div>

      <GlassCard className="!p-0 overflow-hidden">
        <div className="p-4 flex items-center justify-between gap-3 border-b border-border/60">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search requests..." className="w-full h-10 pl-9 pr-3 rounded-xl bg-input/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/60" />
          </div>
          <div className="text-xs text-muted-foreground">{rows.length} total</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-sidebar/40">
              <tr>
                <th className="text-left px-6 py-3">Request</th>
                <th className="text-left">Creator</th>
                <th className="text-left">Election</th>
                <th className="text-left">Submitted</th>
                <th className="text-left">Status</th>
                <th className="text-right px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="border-t border-border/40 hover:bg-sidebar-accent/30 transition">
                  <td className="px-6 py-4 font-mono text-xs">{a.id}</td>
                  <td><div>{a.creator}</div><div className="text-xs text-muted-foreground">{a.email}</div></td>
                  <td>{a.title}</td>
                  <td className="text-muted-foreground">{a.submitted}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td className="px-6 text-right">
                    <div className="inline-flex gap-1.5">
                      <Button size="icon" variant="outline" className="h-8 w-8"><Eye className="h-3.5 w-3.5" /></Button>
                      <Button size="icon" className="h-8 w-8 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 hover:bg-emerald-500/30"><Check className="h-3.5 w-3.5" /></Button>
                      <Button size="icon" className="h-8 w-8 bg-destructive/20 text-destructive border border-destructive/40 hover:bg-destructive/30"><X className="h-3.5 w-3.5" /></Button>
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
