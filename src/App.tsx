import { AuthView } from '@/modules/auth/View';
import { ProfileView } from '@/modules/profile/View';
import { useStore } from '@/utils/store';

export const App = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <>
      {!isLoggedIn && <AuthView />}
      {isLoggedIn && <ProfileView />}
    </>
  );
};
