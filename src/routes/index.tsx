import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { GlassCard } from "@/components/GlassCard";
import { ElectionCard } from "@/components/ElectionCard";
import { Button } from "@/components/ui/button";
import { elections, stats } from "@/lib/mock";
import { ShieldCheck, Lock, Fingerprint, Activity, Search, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VoteVault — Secure Online Election Management" },
      { name: "description", content: "Run premium, end-to-end encrypted elections with live results and full audit trails." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "upcoming" | "completed">("all");

  const filtered = useMemo(() => {
    return elections.filter((e) => {
      const matchQ = !q || (e.title + e.organization + e.category).toLowerCase().includes(q.toLowerCase());
      const matchF = filter === "all" || e.status === filter;
      return matchQ && matchF;
    });
  }, [q, filter]);

  return (
    <div className="min-h-screen animate-fade-in-up">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-neon-blue/20 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-neon-purple/20 blur-3xl animate-float" />

        <div className="relative container mx-auto max-w-7xl px-4 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-neon-blue" />
            ISO 27001 · End-to-end encrypted · Zero-knowledge audit
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05]">
            Elections built on <br />
            <span className="text-gradient">cryptographic trust.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            VoteVault is a premium platform for running secure online elections —
            from student senates to national ballots — with live results, tamper-proof
            audit trails, and beautiful voter experiences.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-primary text-background hover:opacity-90 border-0 h-12 px-6">
              <Link to="/signup">Launch an election <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6 border-border/80">
              <Link to="/voter">I'm here to vote</Link>
            </Button>
          </div>

          {/* Stat strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Elections hosted", value: stats.totalElections.toLocaleString(), icon: ShieldCheck },
              { label: "Active voters", value: stats.activeVoters.toLocaleString(), icon: Fingerprint },
              { label: "Votes cast", value: stats.votesCast.toLocaleString(), icon: Activity },
              { label: "Integrity score", value: `${stats.integrity}%`, icon: Lock },
            ].map((s) => (
              <GlassCard key={s.label} className="text-left">
                <s.icon className="h-5 w-5 text-neon-blue" />
                <div className="mt-3 font-display text-2xl md:text-3xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ELECTIONS */}
      <section className="relative container mx-auto max-w-7xl px-4 pb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Browse elections</h2>
            <p className="text-muted-foreground mt-1">Search live, upcoming, and completed ballots.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search elections..."
                className="w-full h-11 pl-9 pr-3 rounded-xl bg-input/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
              />
            </div>
            <div className="inline-flex rounded-xl bg-input/60 border border-border p-1">
              {(["all","active","upcoming","completed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 h-9 text-xs uppercase tracking-wider rounded-lg transition ${filter === f ? "bg-gradient-primary text-background font-semibold" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((e) => <ElectionCard key={e.id} election={e} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No elections match your filter.</div>
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-7xl px-4 pb-24">
        <div className="glass rounded-3xl p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-neon-purple/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-neon-blue/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-bold">Ready to run a secure election?</h3>
              <p className="text-muted-foreground mt-3 max-w-md">
                Create your organization, generate voter secret IDs, and go live in minutes —
                all from a single beautiful dashboard.
              </p>
            </div>
            <div className="flex md:justify-end gap-3 flex-wrap">
              <Button asChild size="lg" className="bg-gradient-primary text-background border-0">
                <Link to="/signup">Create account</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/admin">Open admin console</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        © 2026 VoteVault. Built with cryptographic integrity.
      </footer>
    </div>
  );
}
