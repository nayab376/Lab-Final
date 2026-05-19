import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { MailCheck } from "lucide-react";

export const Route = createFileRoute("/verify-email")({ component: VerifyEmail });

function VerifyEmail() {
  return (
    <AuthShell
      title="Verify your email"
      subtitle="We sent a 6-digit code to your inbox."
      footer={<>Wrong address? <Link to="/signup" className="text-neon-blue hover:underline">Go back</Link></>}
    >
      <div className="space-y-6">
        <div className="grid place-items-center">
          <div className="h-16 w-16 rounded-2xl bg-gradient-primary grid place-items-center glow-purple">
            <MailCheck className="h-7 w-7 text-background" />
          </div>
        </div>
        <div className="flex justify-center">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              {[0,1,2,3,4,5].map((i) => <InputOTPSlot key={i} index={i} className="h-12 w-11 text-lg" />)}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button asChild className="w-full h-11 bg-gradient-primary text-background border-0">
          <Link to="/voter">Verify & continue</Link>
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Didn't get the code? <button className="text-neon-blue hover:underline">Resend in 0:42</button>
        </p>
      </div>
    </AuthShell>
  );
}
