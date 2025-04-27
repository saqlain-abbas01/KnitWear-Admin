"use client";
import React from "react";
import { LayoutDashboard, Package, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname);
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      href: "/products",
      icon: Package,
    },
    {
      title: "Orders",
      href: "/orders",
      icon: Package,
    },
    {
      title: "Users",
      href: "/users",
      icon: Users,
    },
    {
      title: "Brands",
      href: "/brand",
      icon: Users,
    },
  ];
  return (
    <>
      <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <nav className="grid items-start px-2 py-4 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted",
                item.href.startsWith(pathname) && "bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
