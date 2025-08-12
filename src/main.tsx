import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';

import App from './App';
import store from './store/store';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>,
);
