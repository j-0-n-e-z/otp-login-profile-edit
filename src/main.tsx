import { createRoot } from 'react-dom/client';

import { App } from './App';
import { Provider } from './provider';
import { getUserSession } from './utils/api/requests/getUserSession';
import { useStore, useToken } from './utils/store/index';

import './index.css';
import './styles/reset.css';

const init = async () => {
  if (useToken.getState().token) {
    const getUserSessionResponse = await getUserSession();

    if (getUserSessionResponse.data.success) {
      useStore.setState({ isLoggedIn: true, user: getUserSessionResponse.data.user });
    }
  }

  createRoot(document.getElementById('root')!).render(
    <Provider>
      <App />
    </Provider>
  );
};

init();
