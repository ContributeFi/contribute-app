import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSocketFi } from "@socketfi/react";
import { ArrowRight, Fingerprint, Loader2, ShieldCheck, Wallet } from "lucide-react";
import { savePasskeySession } from "@/hooks/socketfiAuth";

function SigninWithPasskey() {
  const socketfi = useSocketFi();
  const [isLoading, setIsLoading] = useState(false);

  async function handlePasskeyLogin() {
    try {
      setIsLoading(true);

      const res = await socketfi.authenticate();

      savePasskeySession(res);

      console.log("the async function is", res);
    } catch (error) {
      console.error("Passkey login failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="text-left">
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#2F0FD1] shadow-sm">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Fingerprint className="h-5 w-5" />
          )}
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-[#101828] md:text-[28px]">
          {isLoading ? "Securing your session" : "Welcome back"}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#667085] md:text-base">
          {isLoading
            ? "Complete passkey verification to continue."
            : "Sign in securely with your passkey."}
        </p>
      </div>

      <div className="grid gap-3">
        <Button
          onClick={handlePasskeyLogin}
          disabled={isLoading}
          variant="outline"
          className="group h-auto w-full justify-between rounded-2xl border border-[#EAECF0] bg-white p-4 text-left shadow-sm transition hover:border-[#2F0FD1]/30 hover:bg-[#F8FAFF] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-80"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#101828] text-white">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Fingerprint className="h-5 w-5" />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-[#101828]">
                {isLoading ? "Waiting for passkey..." : "Continue with Passkey"}
              </p>
              <p className="mt-0.5 text-xs leading-5 font-normal text-[#667085]">
                {isLoading
                  ? "A secure SocketFi authentication window is open."
                  : "Secure sign-in powered by SocketFi embedded wallet."}
              </p>
            </div>
          </div>

          {isLoading ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#2F0FD1]" />
          ) : (
            <ArrowRight className="h-4 w-4 shrink-0 text-[#98A2B3] transition group-hover:translate-x-0.5 group-hover:text-[#2F0FD1]" />
          )}
        </Button>

        <div className="rounded-2xl border border-[#EAECF0] bg-[#FCFCFD] p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#2F0FD1] shadow-sm">
              <Wallet className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#101828]">Embedded wallet included</p>

              <p className="mt-1 text-xs leading-5 text-[#667085]">
                Your secure SocketFi embedded wallet is created automatically in seconds when you
                sign in with your passkey.
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[#475467]">
            <ShieldCheck className="h-4 w-4 text-[#12B76A]" />
            No seed phrases. No browser extension. Just passkeys.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninWithPasskey;
