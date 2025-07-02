// frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "./globals.css";
import { Header } from "@/components/layout/Header"; // Import the Header
import { MantineProvider } from "@/providers/mantine-provider";
import { ColorSchemeScript } from "@mantine/core";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tender Management Platform",
  description: "A minimal viable B2B tender-management platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-mantine-color-scheme="dark">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body style={{ backgroundColor: "#1A1B1E" }}>
        <MantineProvider>
          <Header />
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
        </MantineProvider>
      </body>
    </html>
  );
}
