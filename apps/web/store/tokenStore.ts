import { create } from "zustand";

type TokenStore = {
  token: string;
  // eslint-disable-next-line no-unused-vars
  setToken: (arg: string) => void;
};

const useTokenStore = create<TokenStore>((set) => ({
  token: "",
  setToken(arg) {
    set(() => ({ token: arg }));
  },
}));

export default useTokenStore;
