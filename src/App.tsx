import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

import { ThemeProvider, ModalProvider, NotificationProvider } from './theme/providers';
import { MainLayout, Footer } from './layout';
import UsersPage from './pages/UsersPage/UsersPage';
import GlobalErrorHandler from './components/utils/GlobalErrorHandler';

const App: FC = () => {
  const navigate = useNavigate();

  return (
    <GlobalErrorHandler navigate={navigate}>
      <ThemeProvider>
        <NotificationProvider>
          <ModalProvider>
            <MainLayout appTitle="User Management App" footerComponent={<Footer />}>
              <UsersPage />
            </MainLayout>
          </ModalProvider>
        </NotificationProvider>
      </ThemeProvider>
    </GlobalErrorHandler>
  );
};

export default App;
