import { createRoot } from 'react-dom/client';

import { App } from './App';
import { Provider } from './provider';
import { getUserSession } from './utils/api/requests/getUserSession';
import { LOCAL_STORAGE_KEYS } from './utils/constants/index';
import { useStore } from './utils/store/index';

import './index.css';
import './styles/reset.css';

const init = async () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);

  if (token) {
    const getUserSessionResponse = await getUserSession();
    useStore.setState({ isLoggedIn: true, user: getUserSessionResponse.data.user });
  }

  createRoot(document.getElementById('root')!).render(
    <Provider>
      <App />
    </Provider>
  );
};

init();
