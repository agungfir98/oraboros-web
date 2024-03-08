import { AuthUser } from "@supabase/supabase-js";
import { StateCreator } from "zustand";

export type AuthSlice = {
  accessToken: string | null;
  user: AuthUser | null;
  userId: string | null;
  setUserId: (userId: string) => void;
  onAuthSuccess: ({
    accessToken,
    user,
  }: {
    accessToken: string;
    user: AuthUser;
  }) => void;
  onLogout: () => void;
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  accessToken: null,
  user: null,
  userId: null,
  setUserId(userId) {
    set((state) => ({ ...state, userId }));
  },
  onAuthSuccess(payload) {
    set((state) => ({ ...state, ...payload }));
  },
  onLogout() {
    set(() => ({ accessToken: null, user: null, userId: null }));
  },
});
