import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import '@ant-design/v5-patch-for-react-19';

import App from './App';
import store from './store/store';

import 'antd/dist/reset.css';
import './index.css';
import ModalProvider from './theme/providers/Modal/ModalProvider';
import { NotificationProvider } from './theme/providers/Notification/NotificationProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <ModalProvider>
        <NotificationProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </NotificationProvider>
      </ModalProvider>
    </ConfigProvider>
  </StrictMode>,
);
