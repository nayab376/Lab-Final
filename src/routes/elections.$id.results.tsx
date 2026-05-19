import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { PageFooter } from "@/components/PageFooter";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { getElection } from "@/lib/mock";
import { ArrowLeft, Trophy, Users, Activity, ShieldCheck } from "lucide-react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

export const Route = createFileRoute("/elections/$id/results")({ component: ResultsPage });

function ResultsPage() {
  const { id } = Route.useParams();
  const e = getElection(id);
  if (!e) return <div className="min-h-screen"><SiteHeader /><div className="container py-20 text-center">Not found.</div></div>;

  const total = e.candidates.reduce((s, c) => s + c.votes, 0) || 1;
  const sorted = [...e.candidates].sort((a, b) => b.votes - a.votes);
  const winner = sorted[0];
  const turnout = Math.round((e.votesCast / e.maxVoters) * 100);
  const data = sorted.map((c) => ({ name: c.name.split(" ")[0], votes: c.votes, pct: Math.round((c.votes / total) * 100), color: c.color }));

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="container mx-auto max-w-7xl px-4 py-10 space-y-8 animate-fade-in-up">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to elections</Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{e.category} · {e.organization}</div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">{e.title}</h1>
            <p className="text-muted-foreground mt-1">{e.status === "completed" ? "Final results" : "Live results — updates every 30 seconds"}</p>
          </div>
          <StatusBadge status={e.status} />
        </div>

        {/* Winner banner */}
        <GlassCard className="relative overflow-hidden !p-8">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-neon-purple/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-neon-blue/30 blur-3xl" />
          <div className="relative grid md:grid-cols-[auto_1fr_auto] items-center gap-6">
            <div className="h-24 w-24 rounded-3xl grid place-items-center text-background text-3xl font-bold animate-float" style={{ background: `linear-gradient(135deg, ${winner.color}, var(--neon-purple))` }}>{winner.photo}</div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-300"><Trophy className="h-3.5 w-3.5" /> {e.status === "completed" ? "Winner" : "Currently leading"}</div>
              <div className="font-display text-3xl font-bold mt-1">{winner.name}</div>
              <div className="text-muted-foreground">{winner.party}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-5xl font-bold text-gradient">{Math.round((winner.votes/total)*100)}%</div>
              <div className="text-xs text-muted-foreground mt-1">{winner.votes.toLocaleString()} votes</div>
            </div>
          </div>
        </GlassCard>

        {/* Stat tiles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { l: "Total votes", v: total.toLocaleString(), i: Activity },
            { l: "Turnout", v: `${turnout}%`, i: Users },
            { l: "Eligible voters", v: e.maxVoters.toLocaleString(), i: Users },
            { l: "Integrity", v: "100%", i: ShieldCheck },
          ].map((t) => (
            <GlassCard key={t.l}>
              <t.i className="h-5 w-5 text-neon-blue" />
              <div className="mt-3 font-display text-3xl font-bold">{t.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{t.l}</div>
            </GlassCard>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-5">
          <GlassCard className="lg:col-span-2 !p-0 overflow-hidden">
            <div className="p-6 pb-2">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Vote distribution</div>
              <div className="font-display text-xl font-semibold mt-1">Candidate breakdown</div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ left: 10, right: 20, top: 20, bottom: 10 }}>
                  <CartesianGrid stroke="oklch(0.4 0.04 270 / 15%)" vertical={false} />
                  <XAxis dataKey="name" stroke="oklch(0.7 0.02 260)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.7 0.02 260)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "oklch(0.18 0.035 265)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Bar dataKey="votes" radius={[10, 10, 0, 0]}>
                    {data.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="!p-0 overflow-hidden">
            <div className="p-6 pb-2">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Share</div>
              <div className="font-display text-xl font-semibold mt-1">Vote share</div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} dataKey="votes" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
                    {data.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "oklch(0.18 0.035 265)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Full ranking */}
        <GlassCard className="!p-0 overflow-hidden">
          <div className="p-6 border-b border-border/60">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Full ranking</div>
            <div className="font-display text-xl font-semibold mt-1">All candidates</div>
          </div>
          <div className="divide-y divide-border/40">
            {sorted.map((c, idx) => {
              const pct = Math.round((c.votes / total) * 100);
              return (
                <div key={c.id} className="px-6 py-4 grid grid-cols-[auto_auto_1fr_auto] items-center gap-4">
                  <div className="font-display text-2xl text-muted-foreground w-8">#{idx + 1}</div>
                  <div className="h-11 w-11 rounded-xl grid place-items-center text-background font-bold text-sm" style={{ background: `linear-gradient(135deg, ${c.color}, var(--neon-purple))` }}>{c.photo}</div>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.party}</div>
                    <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden max-w-md">
                      <div className="h-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${c.color}, var(--neon-purple))` }} />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl font-bold">{pct}%</div>
                    <div className="text-xs text-muted-foreground">{c.votes.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
      <PageFooter />
    </div>
  );
}
