import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Sidebar from "@/components/ui/Sidebar";
import TanstackProvider from "./provider/tanstackProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Underform admin",
  description: "admin pannel for underform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="container mx-auto max-w-7xl flex min-h-screen flex-col">
          <header className="sticky top-0 z-10 border-b bg-background">
            <div className="container flex h-16 items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <Link href="/admin" className="font-bold">
                  Admin Panel
                </Link>
              </div>
            </div>
          </header>
          <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <Sidebar />
            <main className="flex w-full flex-col overflow-hidden">
              <TanstackProvider>{children}</TanstackProvider>
              <Toaster />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
