import { create } from 'zustand';

interface StoreState {
  isLoggedIn: boolean;
  user: User;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: {} as User,
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setUser: (user) => set({ user })
}));
