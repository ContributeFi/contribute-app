import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import WalletKitModal from "@/components/WalletKitModal";
import ScrollToTop from "../ScrollToTop";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles } from "lucide-react";
import { useTwitterAuthCallback } from "@/hooks/useTwitterAuthCallback";

function AuthLayout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (window.history.length > 1) {
  //       navigate(-1);
  //     } else {
  //       navigate("/", { replace: true });
  //     }
  //   }
  // }, [navigate, isAuthenticated]);
  useTwitterAuthCallback();

  return (
    <>
      <ScrollToTop />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-6 text-center sm:px-6">
        <div className="pointer-events-none absolute top-[-160px] left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#2F0FD1]/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-120px] bottom-[-180px] h-[360px] w-[360px] rounded-full bg-[#8B7BFF]/10 blur-3xl" />

        <section className="relative w-full max-w-[500px]">
          <div className="scrollbar-hidden max-h-[calc(100vh-120px)] overflow-y-auto rounded-[28px] border border-[#E6EAF3] bg-white/95 p-5 shadow-[0_24px_80px_rgba(16,24,40,0.10)] backdrop-blur sm:p-8">
            <Outlet />
          </div>

          <p className="mt-5 text-xs leading-5 text-[#667085]">
            Secure access for contributors, builders, and ecosystem projects.
          </p>
        </section>

        <WalletKitModal />
      </main>
    </>
  );
}

export default AuthLayout;
