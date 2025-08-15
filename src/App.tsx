import { MainLayout } from './layout/MainLayout';
import { Footer } from './layout/Footer';
import UsersPage from './pages/UsersPage/UsersPage';
import UserTable from './components/Table/UsersTable';
import { ThemeProvider } from './theme/providers/ThemeProvider';
import GlobalErrorHandler from './utils/GlobalErrorHandler';
import ModalProvider from './theme/providers/Modal/ModalProvider';
import { NotificationProvider } from './theme/providers/Notification/NotificationProvider';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
      <GlobalErrorHandler navigate={navigate}>
        <ThemeProvider>
          <NotificationProvider>
            <ModalProvider>
              <MainLayout appTitle="User Management App" footerComponent={<Footer />}>
                <UsersPage Table={UserTable} />
              </MainLayout>
            </ModalProvider>
          </NotificationProvider>
        </ThemeProvider>
      </GlobalErrorHandler>
  );
};

export default App;
