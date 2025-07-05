// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LayoutShell from "@/components/LayoutShell";
import LogutComponent from "@/components/LogutComponent";
import TanstackProvider from "./provider/tanstackProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Underform admin",
  description: "admin panel for underform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          <div className="container mx-auto max-w-7xl flex min-h-screen flex-col">
            <header className="sticky top-0 z-10 border-b bg-background">
              <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex items-center justify-between gap-2 px-10 w-screen">
                  <Link href="/admin" className="font-bold">
                    Admin Panel
                  </Link>
                  <LogutComponent />
                </div>
              </div>
            </header>

            <LayoutShell>{children}</LayoutShell>
          </div>
        </TanstackProvider>
      </body>
    </html>
  );
}
