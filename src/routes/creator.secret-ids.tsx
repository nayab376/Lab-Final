import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { KeyRound, Copy, RefreshCw, Download } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/creator/secret-ids")({ component: SecretIds });

const gen = () => {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 16 }).map(() => chars[Math.floor(Math.random() * chars.length)]).join("").replace(/(.{4})/g, "$1-").slice(0, 19);
};

function SecretIds() {
  const [ids, setIds] = useState(() => Array.from({ length: 8 }).map(() => gen()));
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Secret voter IDs</h1>
          <p className="text-muted-foreground mt-1">Cryptographic one-time IDs distributed to verified voters.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIds(Array.from({ length: 8 }).map(() => gen()))}><RefreshCw className="h-4 w-4 mr-2" /> Regenerate</Button>
          <Button className="bg-gradient-primary text-background border-0"><Download className="h-4 w-4 mr-2" /> Export</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ids.map((id, i) => (
          <GlassCard key={i}>
            <div className="flex items-center justify-between">
              <KeyRound className="h-4 w-4 text-neon-blue" />
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Voter #{1000 + i}</span>
            </div>
            <div className="mt-3 font-mono text-sm tracking-wider">
              {revealed[i] ? id : id.replace(/[^-]/g, "•")}
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="h-8 flex-1" onClick={() => setRevealed({ ...revealed, [i]: !revealed[i] })}>
                {revealed[i] ? "Hide" : "Reveal"}
              </Button>
              <Button size="icon" variant="outline" className="h-8 w-8"><Copy className="h-3.5 w-3.5" /></Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
