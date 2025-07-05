// store/userStore.ts
import { create } from "zustand";
import { UserProfile } from "../app/types/types";

interface UserState {
  user: UserProfile | undefined;
  onlineUsers: string[];
  setOnlineUsers: (users: string[]) => void;
  setUser: (user: UserProfile) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  onlineUsers: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: undefined }),
}));
