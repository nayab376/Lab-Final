import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { PageFooter } from "@/components/PageFooter";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getElection } from "@/lib/mock";
import { useEffect, useState } from "react";
import { ShieldCheck, CheckCircle2, Lock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/elections/$id/vote")({ component: VotePage });

function useCountdown(endIso: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, new Date(endIso).getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function VotePage() {
  const { id } = Route.useParams();
  const election = getElection(id);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const cd = useCountdown(election?.endDate ?? new Date().toISOString());

  if (!election) {
    return (
      <div className="min-h-screen"><SiteHeader />
        <div className="container mx-auto max-w-3xl px-4 py-20 text-center">Election not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="container mx-auto max-w-5xl px-4 py-10 space-y-6 animate-fade-in-up">
        <Link to="/voter" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back</Link>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{election.category} · {election.organization}</div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">{election.title}</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">{election.description}</p>

            <h2 className="font-display text-lg font-semibold mt-8 mb-4">Choose your candidate</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {election.candidates.map((c) => {
                const active = selected === c.id;
                return (
                  <button key={c.id} onClick={() => setSelected(c.id)} className={cn(
                    "text-left glass rounded-2xl p-5 transition glass-hover",
                    active && "border-neon-blue ring-2 ring-neon-blue/40 glow-blue",
                  )}>
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl grid place-items-center text-background font-bold text-lg" style={{ background: `linear-gradient(135deg, ${c.color}, var(--neon-purple))` }}>{c.photo}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.party}</div>
                      </div>
                      <div className={cn("h-6 w-6 rounded-full border-2 grid place-items-center transition", active ? "border-neon-blue bg-neon-blue text-background" : "border-border")}>
                        {active && <CheckCircle2 className="h-4 w-4" />}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{c.bio}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <Button disabled={!selected} onClick={() => setConfirmOpen(true)} className="h-12 px-6 bg-gradient-primary text-background border-0 disabled:opacity-40">
                <Lock className="h-4 w-4 mr-2" /> Cast encrypted vote
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <GlassCard>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Voting closes in</div>
              <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                {[["Days",cd.d],["Hrs",cd.h],["Min",cd.m],["Sec",cd.s]].map(([l,v]) => (
                  <div key={l as string} className="glass rounded-xl py-2">
                    <div className="font-display text-2xl font-bold text-gradient">{String(v).padStart(2,"0")}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Live turnout</div>
              <div className="font-display text-3xl font-bold mt-2">{Math.round((election.votesCast/election.maxVoters)*100)}%</div>
              <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-primary" style={{ width: `${Math.round((election.votesCast/election.maxVoters)*100)}%` }} />
              </div>
              <div className="text-xs text-muted-foreground mt-2">{election.votesCast.toLocaleString()} of {election.maxVoters.toLocaleString()} eligible</div>
            </GlassCard>

            <GlassCard className="text-xs">
              <div className="flex items-center gap-2 text-neon-blue font-semibold"><ShieldCheck className="h-4 w-4" /> Secure session</div>
              <div className="text-muted-foreground mt-2 leading-relaxed">
                Your vote is encrypted on this device before submission. We never see your choice — only the
                cryptographic proof.
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="glass border-border/60">
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Confirm your vote</DialogTitle>
                <DialogDescription>
                  You're about to cast an encrypted, irrevocable vote for{" "}
                  <span className="text-foreground font-semibold">
                    {election.candidates.find((c) => c.id === selected)?.name}
                  </span>.
                </DialogDescription>
              </DialogHeader>
              <div className="glass rounded-xl p-4 text-xs text-muted-foreground">
                Once submitted, your vote cannot be changed. A cryptographic receipt will be issued.
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                <Button onClick={() => setSubmitted(true)} className="bg-gradient-primary text-background border-0">
                  <Lock className="h-4 w-4 mr-2" /> Submit vote
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="text-center py-4">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-500/20 grid place-items-center glow-blue">
                  <CheckCircle2 className="h-8 w-8 text-emerald-300" />
                </div>
                <DialogTitle className="font-display text-xl mt-4">Vote recorded</DialogTitle>
                <p className="text-sm text-muted-foreground mt-2">Receipt: <span className="font-mono text-foreground">VR-{Math.random().toString(36).slice(2,10).toUpperCase()}</span></p>
              </div>
              <DialogFooter>
                <Button onClick={() => navigate({ to: "/elections/$id/results", params: { id } })} className="w-full bg-gradient-primary text-background border-0">View live results</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      <PageFooter />
    </div>
  );
}
