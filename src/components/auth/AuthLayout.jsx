import React from "react";
import { Outlet } from "react-router";
import WalletKitModal from "@/components/WalletKitModal";
import ScrollToTop from "../ScrollToTop";
import { useTwitterAuthCallback } from "@/hooks/useTwitterAuthCallback";

function AuthLayout() {
  useTwitterAuthCallback();

  return (
    <>
      <ScrollToTop />

      <main className="relative flex min-h-[100dvh] items-start justify-center overflow-hidden px-4 py-5 text-center sm:items-center sm:px-6 sm:py-6">
        <div className="pointer-events-none absolute top-[-160px] left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#2F0FD1]/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-120px] bottom-[-180px] h-[360px] w-[360px] rounded-full bg-[#8B7BFF]/10 blur-3xl" />

        <section className="relative w-full max-w-[560px]">
          <div className="rounded-[28px] border border-[#E6EAF3] bg-white/95 p-4 shadow-[0_24px_80px_rgba(16,24,40,0.10)] backdrop-blur sm:p-6">
            <Outlet />
          </div>

          <p className="mt-4 text-xs leading-5 text-[#667085]">
            Secure access for contributors, builders, and ecosystem projects.
          </p>
        </section>

        <WalletKitModal />
      </main>
    </>
  );
}

export default AuthLayout;
