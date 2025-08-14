import { MainLayout } from './layout/MainLayout';
import { Footer } from './layout/Footer';
import UsersPage from './pages/UsersPage/UsersPage';
import UserTable from './components/Table/UsersTable';
import { ThemeProvider } from './theme/providers/ThemeProvider';
import GlobalErrorHandler from './utils/GlobalErrorHandler';
import ModalProvider from './theme/providers/Modal/ModalProvider';
import { NotificationProvider } from './theme/providers/Notification/NotificationProvider';

const App: React.FC = () => {
  return (
    <GlobalErrorHandler>
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
