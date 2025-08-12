import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import '@ant-design/v5-patch-for-react-19';

import App from './App';
import store from './store/store';

import 'antd/dist/reset.css';
import './index.css';
import ModalProvider from './context/Modal/ModalProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <ModalProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ModalProvider>
    </ConfigProvider>
  </StrictMode>,
);
