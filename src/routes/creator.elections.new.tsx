import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, ShieldCheck, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/creator/elections/new")({ component: NewElection });

function NewElection() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Link to="/creator/elections" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <div>
        <h1 className="font-display text-3xl font-bold">Create new election</h1>
        <p className="text-muted-foreground mt-1">Configure ballot details. All fields are encrypted at rest.</p>
      </div>

      <GlassCard>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label>Election title</Label>
            <Input className="h-11" placeholder="e.g. National Senate Election 2026" required />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Organization</Label>
              <Input className="h-11" placeholder="Federal Election Commission" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {["National","Municipal","Education","Corporate","Community","Professional"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea rows={4} placeholder="Brief description visible to voters..." />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Start date & time</Label>
              <Input type="datetime-local" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> End date & time</Label>
              <Input type="datetime-local" className="h-11" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Maximum voters</Label>
              <Input type="number" min={1} defaultValue={1000} className="h-11" />
            </div>
            <div className="space-y-2">
              <Label className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Ballot type</Label>
              <Select defaultValue="single">
                <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single choice</SelectItem>
                  <SelectItem value="multi">Multi-select</SelectItem>
                  <SelectItem value="ranked">Ranked choice</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="glass rounded-xl p-4 text-xs flex gap-3">
            <ShieldCheck className="h-4 w-4 text-neon-blue shrink-0 mt-0.5" />
            <div className="text-muted-foreground">
              Ballot data is encrypted with AES-256-GCM. Voter identities are hashed and never linked to vote contents.
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline">Save draft</Button>
            <Button className="bg-gradient-primary text-background border-0">Submit for approval</Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
