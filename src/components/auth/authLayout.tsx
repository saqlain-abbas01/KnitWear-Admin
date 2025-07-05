"use client";
import type React from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  const imageSrc = "/auth-image-01.jpg";
  return (
    <div className="min-h-screen   flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 xl:px-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="flex justify-center mb-8">
            <h1 className="text-2xl font-bold">LUXE INTIMATES</h1>
          </Link>

          <h2 className="text-2xl font-bold text-center">{title}</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border">
            {children}
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-muted relative">
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt="Authentication"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12 text-white">
            <h3 className="text-2xl font-bold mb-2">Premium Comfort</h3>
            <p className="mb-4 max-w-md">
              Join our community and discover our collection of premium
              underwear designed for everyday comfort and confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
