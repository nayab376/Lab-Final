import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ShieldCheck, Lock, Fingerprint } from "lucide-react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left visual */}
      <div className="relative hidden lg:flex flex-col p-10 overflow-hidden bg-sidebar/60 border-r border-border">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-neon-blue/25 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-neon-purple/25 blur-3xl animate-float" />
        <div className="relative"><Logo /></div>
        <div className="relative mt-auto space-y-6 max-w-md">
          <h2 className="font-display text-4xl font-bold leading-tight">
            Your vote, sealed in <span className="text-gradient">cryptographic glass.</span>
          </h2>
          <p className="text-muted-foreground">
            Every action on VoteVault is signed, encrypted, and auditable. Sign in to manage
            elections or cast your ballot with confidence.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: ShieldCheck, label: "Zero-knowledge" },
              { icon: Lock, label: "AES-256" },
              { icon: Fingerprint, label: "Biometric ready" },
            ].map((f) => (
              <div key={f.label} className="glass rounded-xl p-4 text-center">
                <f.icon className="h-5 w-5 text-neon-blue mx-auto" />
                <div className="text-[11px] text-muted-foreground mt-2 uppercase tracking-wider">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="relative flex items-center justify-center p-6 md:p-12">
        <div className="lg:hidden absolute top-6 left-6"><Logo /></div>
        <div className="absolute top-6 right-6 hidden lg:flex">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            ← Back to home
          </Link>
        </div>
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
            >
              ← Back to home
            </Link>
          </div>
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-2">{subtitle}</p>
          <div className="mt-8 glass rounded-2xl p-6 md:p-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">← Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
