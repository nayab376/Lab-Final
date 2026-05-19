import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { elections } from "@/lib/mock";
import { Plus, Pencil, Trash2, Camera } from "lucide-react";

export const Route = createFileRoute("/creator/candidates")({ component: CandidatesPage });

function CandidatesPage() {
  const all = elections[0].candidates;
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Candidates</h1>
          <p className="text-muted-foreground mt-1">Manage candidates for <span className="text-foreground">{elections[0].title}</span>.</p>
        </div>
        <Button className="bg-gradient-primary text-background border-0"><Plus className="h-4 w-4 mr-2" /> Add candidate</Button>
      </div>

      <GlassCard>
        <h3 className="font-display text-lg font-semibold mb-4">Add new candidate</h3>
        <form className="grid md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="md:col-span-2 flex items-center gap-4">
            <div className="h-20 w-20 rounded-2xl bg-gradient-primary grid place-items-center text-background text-xl font-bold">?
            </div>
            <Button variant="outline"><Camera className="h-4 w-4 mr-2" /> Upload photo</Button>
          </div>
          <div className="space-y-2"><Label>Full name</Label><Input className="h-11" /></div>
          <div className="space-y-2"><Label>Party / Affiliation</Label><Input className="h-11" /></div>
          <div className="md:col-span-2 space-y-2"><Label>Bio</Label><Input className="h-11" placeholder="Short candidate bio..." /></div>
          <div className="md:col-span-2 flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-gradient-primary text-background border-0">Save candidate</Button>
          </div>
        </form>
      </GlassCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {all.map((c) => (
          <GlassCard key={c.id}>
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl grid place-items-center text-background font-bold text-lg shrink-0" style={{ background: `linear-gradient(135deg, ${c.color}, var(--neon-purple))` }}>{c.photo}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.party}</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{c.bio}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="text-xs text-muted-foreground">{c.votes.toLocaleString()} votes</div>
              <div className="inline-flex gap-1.5">
                <Button size="icon" variant="outline" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button>
                <Button size="icon" variant="outline" className="h-8 w-8 text-destructive border-destructive/40"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
