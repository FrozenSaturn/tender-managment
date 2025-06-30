// frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header"; // Import the Header

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tender Management Platform",
  description: "A minimal viable B2B tender-management platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; 2025 Kibou Systems. All Rights Reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
