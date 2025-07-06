import { useUserStore } from "@/store/useUserStore";
import { io, Socket } from "socket.io-client";

export const url =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_LOCAL_URL;

let socket: Socket | null = null;

export const connectSocket = (id: string) => {
  console.log("Connecting to socket with user ID:", id);
  if (!socket) {
    socket = io(url, {
      query: {
        userId: id,
      },
    });
    socket.on("connect", () => {
      console.log("✅ Connected to the socket:", socket?.id);
    });

    socket.on("getOnlineUsers", (userIds: string[]) => {
      console.log("🟢 Online Users:", userIds);
      useUserStore.getState().setOnlineUsers(userIds);
    });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("🔌 Disconnected from the socket");
    socket = null;
  }
};

// Optional: export socket if you need to emit events elsewhere
export const getSocket = () => socket;
