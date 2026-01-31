import { create } from 'zustand';

interface AuthViewStore {
  isOtpSent: boolean;
  retryDelay: number;
  setIsOtpSent: (isOtpSent: boolean) => void;
  setRetryDelay: (retryDelay: number) => void;
}

export const useAuthViewStore = create<AuthViewStore>((set) => ({
  isOtpSent: false,
  retryDelay: 0,
  setIsOtpSent: (isOtpSent) => set({ isOtpSent }),
  setRetryDelay: (retryDelay) => set({ retryDelay })
}));

export const setIsOtpSent = (isOtpSent: boolean) =>
  useAuthViewStore.setState(() => ({ isOtpSent }));
