"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TanStackProviderProps {
  children: React.ReactNode;
}

const TanstackProvider = ({ children }: TanStackProviderProps) => {
  const [queryClient] = useState(() => new QueryClient()); // Array destructuring

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackProvider;
