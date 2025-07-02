"use client";

import { Header } from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Show header only on landing page routes
  const showHeader =
    pathname === "/" ||
    pathname.startsWith("/landing") ||
    pathname === "/about" ||
    pathname === "/features" ||
    pathname === "/pricing";

  return (
    <>
      {showHeader && <Header />}
      {children}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 50,
        }}
      >
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={80}
          height={40}
          style={{ opacity: 0.4 }}
        />
      </div>
    </>
  );
}
