import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

import { MainLayout } from './layout/MainLayout';
import { Footer } from './layout/Footer';
import UsersPage from './pages/UsersPage/UsersPage';
import UserTable from './pages/UsersPage/components/table/UsersTable';
import { ThemeProvider } from './theme/providers/ThemeProvider';
import GlobalErrorHandler from './components/utils/GlobalErrorHandler';
import ModalProvider from './theme/providers/Modal/ModalProvider';
import { NotificationProvider } from './theme/providers/Notification/NotificationProvider';
import CreateUserModal from './pages/UsersPage/components/modal/create/CreateUser';

const App: FC = () => {
  const navigate = useNavigate();

  return (
    <GlobalErrorHandler navigate={navigate}>
      <ThemeProvider>
        <NotificationProvider>
          <ModalProvider>
            <MainLayout appTitle="User Management App" footerComponent={<Footer />}>
              <UsersPage table={UserTable} createButton={CreateUserModal} />
            </MainLayout>
          </ModalProvider>
        </NotificationProvider>
      </ThemeProvider>
    </GlobalErrorHandler>
  );
};

export default App;
