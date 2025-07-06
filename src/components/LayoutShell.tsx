// components/LayoutShell.tsx
"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthRoute =
    pathname.startsWith("/auth") || pathname.startsWith("/chats");

  if (isAuthRoute) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-10">
      <Sidebar />
      <main className="flex w-full flex-col overflow-hidden ">
        {children}
        <Toaster />
      </main>
    </div>
  );
}
