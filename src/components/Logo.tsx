import { ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="relative grid place-items-center h-9 w-9 rounded-xl bg-gradient-primary glow-blue">
        <ShieldCheck className="h-5 w-5 text-background" strokeWidth={2.4} />
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="font-display font-bold text-lg tracking-tight">
            Vote<span className="text-gradient">Vault</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Secure Elections
          </div>
        </div>
      )}
    </Link>
  );
}
