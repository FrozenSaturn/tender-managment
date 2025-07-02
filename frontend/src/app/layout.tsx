// frontend/src/app/layout.tsx
// This is a server component (no "use client" directive)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "./globals.css";
import { MantineProvider } from "@/providers/mantine-provider";
import { ColorSchemeScript } from "@mantine/core";
import { ClientLayout } from "@/components/layout/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

// Metadata needs to be in a separate component since it can't be used with "use client"
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
          <ClientLayout>{children}</ClientLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
