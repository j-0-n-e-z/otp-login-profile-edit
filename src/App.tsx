import { AuthView } from '@/modules/auth/View';

import { useStore } from './utils/store';

export const App = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const user = useStore((state) => state.user);

  return (
    <>
      {!isLoggedIn && <AuthView />}
      {isLoggedIn && <>{user.phone}</>}
    </>
  );
};
