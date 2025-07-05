"use client";

import { ApiErrorResponse } from "@/app/types/types";
import { userLogout } from "@/lib/api/user";
import { useUserStore } from "@/store/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const LogutComponent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  if (pathname.includes("/auth")) return null;

  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const mutation = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      toast.success(`User logout successfully`);
      queryClient.clear();
      router.push("/auth/signin");
      clearUser();
      //   disconnectSocket();
      router.refresh();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const errorMessage = axiosError.response?.data?.message;
      toast.error(`Error while logging out please try again..`);
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };
  return (
    <div>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default LogutComponent;
