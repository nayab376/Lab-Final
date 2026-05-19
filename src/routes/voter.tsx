import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { PageFooter } from "@/components/PageFooter";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ElectionCard } from "@/components/ElectionCard";
import { elections } from "@/lib/mock";
import { KeyRound, Eye, EyeOff, CheckCircle2, Clock, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/voter")({ component: VoterDashboard });

const joined = elections.slice(0, 3);

function VoterDashboard() {
  const [reveal, setReveal] = useState(false);
  const secret = "X7K9-AM2P-WQ4N-T8RZ";
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="container mx-auto max-w-7xl px-4 py-10 space-y-8 animate-fade-in-up">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Voter portal</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Hello, Aria</h1>
          <p className="text-muted-foreground mt-1">You're verified and ready to vote.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <GlassCard className="lg:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Your secret voter ID</div>
                <div className="font-display text-2xl font-semibold mt-1 inline-flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-neon-blue" />
                  <span className="font-mono tracking-wider">{reveal ? secret : secret.replace(/[^-]/g, "•")}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setReveal(!reveal)}>
                {reveal ? <><EyeOff className="h-4 w-4 mr-2" /> Hide</> : <><Eye className="h-4 w-4 mr-2" /> Reveal</>}
              </Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Never share this ID. It's used to cryptographically anonymize your vote on every ballot you join.
            </div>
          </GlassCard>

          <GlassCard>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Status</div>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-emerald-300"><CheckCircle2 className="h-4 w-4" /> Identity verified</div>
              <div className="flex items-center gap-2 text-emerald-300"><CheckCircle2 className="h-4 w-4" /> 2FA enabled</div>
              <div className="flex items-center gap-2 text-amber-300"><Clock className="h-4 w-4" /> 2 elections awaiting vote</div>
            </div>
          </GlassCard>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold mb-4">Your elections</h2>
          <GlassCard className="!p-0 overflow-hidden">
            <div className="divide-y divide-border/40">
              {joined.map((e) => {
                const voted = e.status === "completed";
                return (
                  <div key={e.id} className="px-6 py-4 flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{e.title}</div>
                      <div className="text-xs text-muted-foreground">{e.organization} · ends {new Date(e.endDate).toLocaleDateString()}</div>
                    </div>
                    <StatusBadge status={e.status} />
                    {voted ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300"><CheckCircle2 className="h-4 w-4" /> Vote recorded</span>
                    ) : (
                      <Button asChild size="sm" className="bg-gradient-primary text-background border-0">
                        <Link to="/elections/$id/vote" params={{ id: e.id }}><Vote className="h-4 w-4 mr-2" /> Vote now</Link>
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold mb-4">Discover</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {elections.filter((e) => e.status !== "completed").slice(0, 3).map((e) => <ElectionCard key={e.id} election={e} />)}
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  );
}
