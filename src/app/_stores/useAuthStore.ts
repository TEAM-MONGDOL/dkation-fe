import {
  removeAccessToken,
  removeAccountId,
  storeAccessToken,
  storeAccountId,
} from '@/_hooks/sessionStorage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  isLoggedIn: boolean;
  login: (accessToken: string, accountId: string) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      login: (accessToken, accountId) => {
        storeAccessToken(accessToken);
        storeAccountId(accountId);
        set({ isLoggedIn: true });
      },
      logout: () => {
        removeAccessToken();
        removeAccountId();
        set({ isLoggedIn: false });
      },
    }),
    {
      name: 'useAuthStatus',
    },
  ),
);

export default useAuthStore;
