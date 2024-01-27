import { create } from "zustand";

type Session = {
  isAuthorized: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsAuthorized: (arg: boolean) => any;
};

export const useSessionStore = create<Session>((set) => ({
  isAuthorized: false,
  setIsAuthorized(isAuthorized: boolean) {
    set(() => ({ isAuthorized }));
  },
}));
