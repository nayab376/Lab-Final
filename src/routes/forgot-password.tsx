import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({ component: ForgotPassword });

function ForgotPassword() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll send a secure reset link to your email."
      footer={<>Remembered it? <Link to="/login" className="text-neon-blue hover:underline">Sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" className="h-11" placeholder="you@vote.org" />
        </div>
        <Button className="w-full h-11 bg-gradient-primary text-background border-0">Send reset link</Button>
        <div className="text-xs text-muted-foreground text-center">
          Links expire after 15 minutes for your security.
        </div>
      </form>
    </AuthShell>
  );
}
