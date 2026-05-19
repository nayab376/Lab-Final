import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export function PageFooter() {
  return (
    <footer className="border-t border-border/60 py-10 mt-auto">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-primary">
              <ShieldCheck className="h-4 w-4 text-background" strokeWidth={2.4} />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-sm tracking-tight">
                Vote<span className="text-gradient">Vault</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Secure Elections
              </div>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition">Elections</Link>
            <Link to="/voter" className="hover:text-foreground transition">Voter</Link>
            <Link to="/creator" className="hover:text-foreground transition">Creator</Link>
            <Link to="/admin" className="hover:text-foreground transition">Admin</Link>
            <Link to="/audit" className="hover:text-foreground transition">Audit</Link>
          </nav>
          <div className="text-xs text-muted-foreground">
            © 2026 VoteVault. Built with cryptographic integrity.
          </div>
        </div>
      </div>
    </footer>
  );
}
