import { cn } from "@/lib/utils";
import type { ElectionStatus } from "@/lib/mock";

const map: Record<ElectionStatus | "pending" | "approved" | "rejected" | "info" | "warning" | "critical", string> = {
  upcoming: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30",
  active: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
  completed: "bg-muted text-muted-foreground border-border",
  pending: "bg-amber-400/15 text-amber-300 border-amber-400/30",
  approved: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
  rejected: "bg-destructive/15 text-destructive border-destructive/40",
  info: "bg-neon-blue/15 text-neon-blue border-neon-blue/30",
  warning: "bg-amber-400/15 text-amber-300 border-amber-400/30",
  critical: "bg-destructive/15 text-destructive border-destructive/40",
};

export function StatusBadge({ status }: { status: keyof typeof map }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider border",
      map[status],
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
