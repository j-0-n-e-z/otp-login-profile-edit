import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreState {
  isLoggedIn: boolean;
  user: User;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User) => void;
}

export const useStore = create<StoreState>((set) => ({
  isLoggedIn: false,
  user: {} as User,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setUser: (user) => set({ user })
}));

interface TokenState {
  token: string | null;
}

export const useToken = create<TokenState>()(
  devtools(
    persist(
      () => ({
        token: null as TokenState['token']
      }),
      { name: 'token-store' }
    )
  )
);
