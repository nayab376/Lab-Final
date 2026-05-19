import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { approvals, auditLogs, elections, stats } from "@/lib/mock";
import { Activity, ShieldCheck, Users, Vote, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/")({ component: AdminOverview });

const trend = Array.from({ length: 14 }).map((_, i) => ({
  day: `D${i + 1}`,
  votes: 1200 + Math.round(Math.sin(i / 2) * 400 + i * 220 + Math.random() * 200),
}));

function AdminOverview() {
  const tiles = [
    { label: "Total elections", value: stats.totalElections, icon: Vote, accent: "from-neon-blue to-neon-purple" },
    { label: "Active voters", value: stats.activeVoters.toLocaleString(), icon: Users, accent: "from-neon-purple to-neon-blue" },
    { label: "Votes cast (24h)", value: "12,402", icon: Activity, accent: "from-neon-cyan to-neon-blue" },
    { label: "Integrity score", value: `${stats.integrity}%`, icon: ShieldCheck, accent: "from-emerald-400 to-neon-cyan" },
  ];
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Dashboard</div>
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Welcome back, Admin</h1>
        <p className="text-muted-foreground mt-1">System integrity is nominal. 2 approval requests need your attention.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((t) => (
          <GlassCard key={t.label}>
            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${t.accent} grid place-items-center text-background`}>
              <t.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 font-display text-3xl font-bold">{t.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{t.label}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <GlassCard className="lg:col-span-2 !p-0 overflow-hidden">
          <div className="p-6 pb-2 flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Voting activity</div>
              <div className="font-display text-xl font-semibold mt-1">14-day vote volume</div>
            </div>
            <div className="text-xs text-emerald-300 inline-flex items-center gap-1"><ArrowUpRight className="h-3.5 w-3.5" /> +18.4%</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ left: 10, right: 20, top: 20, bottom: 10 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--neon-blue)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--neon-purple)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.4 0.04 270 / 15%)" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(0.7 0.02 260)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.7 0.02 260)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.035 265)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="votes" stroke="var(--neon-blue)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Live monitoring</div>
          <div className="font-display text-xl font-semibold mt-1">Active elections</div>
          <div className="mt-4 space-y-3">
            {elections.filter((e) => e.status === "active").map((e) => (
              <Link key={e.id} to="/elections/$id/results" params={{ id: e.id }} className="block glass rounded-xl p-3 hover:border-neon-blue/40 transition">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{e.title}</div>
                  <StatusBadge status={e.status} />
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: `${Math.round((e.votesCast/e.maxVoters)*100)}%` }} />
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground flex justify-between">
                  <span>{e.votesCast.toLocaleString()} votes</span>
                  <span>{Math.round((e.votesCast/e.maxVoters)*100)}% turnout</span>
                </div>
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="!p-0 overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-border/60">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Recent activity</div>
            <div className="font-display text-xl font-semibold mt-1">Audit feed</div>
          </div>
          <Link to="/admin/audit" className="text-sm text-neon-blue hover:underline">View all →</Link>
        </div>
        <div className="divide-y divide-border/40">
          {auditLogs.slice(0, 5).map((l) => (
            <div key={l.id} className="px-6 py-3 flex items-center gap-4 text-sm hover:bg-sidebar-accent/30 transition">
              <StatusBadge status={l.severity} />
              <div className="flex-1 min-w-0">
                <div className="truncate"><span className="text-muted-foreground">{l.actor}</span> · {l.action} → <span className="text-foreground/90">{l.target}</span></div>
              </div>
              <div className="text-xs text-muted-foreground hidden md:block">{l.timestamp}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="!p-0 overflow-hidden">
        <div className="p-6 border-b border-border/60">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Pending approvals</div>
          <div className="font-display text-xl font-semibold mt-1">Election requests</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left px-6 py-3">ID</th><th className="text-left">Creator</th><th className="text-left">Title</th><th className="text-left">Submitted</th><th className="text-left">Status</th></tr>
            </thead>
            <tbody>
              {approvals.slice(0,4).map((a) => (
                <tr key={a.id} className="border-t border-border/40">
                  <td className="px-6 py-3 font-mono text-xs">{a.id}</td>
                  <td className="py-3">{a.creator}</td>
                  <td>{a.title}</td>
                  <td className="text-muted-foreground">{a.submitted}</td>
                  <td><StatusBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
