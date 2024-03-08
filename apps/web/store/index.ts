import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "./auth";

export type GlobalStore = AuthSlice;

const STORAGE_KEY = "oraboros_storage";

export const useStore = create<
  GlobalStore,
  [["zustand/persist", Pick<GlobalStore, "accessToken">]]
>(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        userId: state.userId,
      }),
    },
  ),
);
