"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import { fetchUserProfile } from "@/lib/api/user";

const Page = () => {
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
  });

  useEffect(() => {
    // Wait for query to finish
    if (!isLoading) {
      if (data?.user) {
        setUser(data.user);
        router.replace("/dashboard"); // ✅ redirect AFTER setting user
      } else {
        clearUser();
        router.replace("/auth/signin"); // redirect to signin if no user
      }
    }
  }, [isLoading, data]);

  return null;
};

export default Page;
