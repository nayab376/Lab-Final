import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/signup")({ component: SignupPage });

function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join VoteVault to run or participate in secure elections."
      footer={<>Already a member? <Link to="/login" className="text-neon-blue hover:underline">Sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>First name</Label>
            <Input className="h-11" placeholder="Aria" />
          </div>
          <div className="space-y-2">
            <Label>Last name</Label>
            <Input className="h-11" placeholder="Mehta" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" className="h-11" placeholder="you@vote.org" />
        </div>
        <div className="space-y-2">
          <Label>Account type</Label>
          <Select>
            <SelectTrigger className="h-11"><SelectValue placeholder="Choose role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="voter">Voter</SelectItem>
              <SelectItem value="creator">Election Creator</SelectItem>
              <SelectItem value="observer">Observer / Auditor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" className="h-11" placeholder="At least 12 characters" />
          <div className="flex gap-1 mt-1">
            {[1,2,3,4].map((i) => <div key={i} className={`h-1 flex-1 rounded-full ${i<=3 ? "bg-gradient-primary" : "bg-muted"}`} />)}
          </div>
          <p className="text-[11px] text-muted-foreground">Strong — passes entropy & HIBP check.</p>
        </div>
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" className="mt-0.5 accent-[color:var(--neon-blue)]" defaultChecked />
          I agree to the cryptographic audit terms and privacy policy.
        </label>
        <Button asChild className="w-full h-11 bg-gradient-primary text-background border-0">
          <Link to="/verify-email">Create account</Link>
        </Button>
      </form>
    </AuthShell>
  );
}
