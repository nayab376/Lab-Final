import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { StatusBadge } from "./StatusBadge";
import { auditLogs } from "@/lib/mock";
import { Search, Download, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { SiteHeader } from "./SiteHeader";
import { PageFooter } from "./PageFooter";

export function AuditLogsView({ standalone = false }: { standalone?: boolean }) {
  const [q, setQ] = useState("");
  const [sev, setSev] = useState<"all" | "info" | "warning" | "critical">("all");
  const rows = auditLogs.filter((l) => {
    const matchQ = !q || (l.action + l.target + l.actor + l.ip).toLowerCase().includes(q.toLowerCase());
    const matchS = sev === "all" || l.severity === sev;
    return matchQ && matchS;
  });

  const inner = (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Forensics</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Audit logs</h1>
          <p className="text-muted-foreground mt-1">Immutable, signed event trail across the platform.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export CSV</Button>
          <Button className="bg-gradient-primary text-background border-0"><ShieldCheck className="h-4 w-4 mr-2" /> Verify hash</Button>
        </div>
      </div>

      <GlassCard className="!p-0 overflow-hidden">
        <div className="p-4 flex flex-wrap gap-3 items-center justify-between border-b border-border/60">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by actor, action, IP..." className="w-full h-10 pl-9 pr-3 rounded-xl bg-input/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/60" />
          </div>
          <div className="inline-flex rounded-xl bg-input/60 border border-border p-1">
            {(["all","info","warning","critical"] as const).map((s) => (
              <button key={s} onClick={() => setSev(s)} className={`px-3 h-8 text-xs uppercase tracking-wider rounded-lg transition ${sev === s ? "bg-gradient-primary text-background font-semibold" : "text-muted-foreground hover:text-foreground"}`}>{s}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-sidebar/40">
              <tr>
                <th className="text-left px-6 py-3">ID</th>
                <th className="text-left">Severity</th>
                <th className="text-left">Actor</th>
                <th className="text-left">Action</th>
                <th className="text-left">Target</th>
                <th className="text-left">IP</th>
                <th className="text-left px-6">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id} className="border-t border-border/40 hover:bg-sidebar-accent/30 transition">
                  <td className="px-6 py-3 font-mono text-xs">{l.id}</td>
                  <td><StatusBadge status={l.severity} /></td>
                  <td className="font-mono text-xs">{l.actor}</td>
                  <td>{l.action}</td>
                  <td className="text-muted-foreground">{l.target}</td>
                  <td className="font-mono text-xs">{l.ip}</td>
                  <td className="px-6 text-muted-foreground text-xs">{l.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );

  if (!standalone) return inner;
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="container mx-auto max-w-7xl px-4 py-10 animate-fade-in-up">{inner}</div>
      <PageFooter />
    </div>
  );
}
