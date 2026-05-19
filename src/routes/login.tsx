import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const [show, setShow] = useState(false);
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your VoteVault account."
      footer={<>Don't have an account? <Link to="/signup" className="text-neon-blue hover:underline">Create one</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="you@vote.org" className="pl-9 h-11" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="pwd">Password</Label>
            <Link to="/forgot-password" className="text-xs text-neon-blue hover:underline">Forgot?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="pwd" type={show ? "text" : "password"} placeholder="••••••••" className="pl-9 pr-9 h-11" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>
        <Button className="w-full h-11 bg-gradient-primary text-background border-0">Sign in securely</Button>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider"><span className="bg-card px-2 text-muted-foreground">or</span></div>
        </div>
        <Button variant="outline" className="w-full h-11">Continue with SSO</Button>
      </form>
    </AuthShell>
  );
}
