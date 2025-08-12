import { MainLayout } from './layout/MainLayout';
import { Footer } from './layout/Footer';
import UsersPage from './pages/UsersPage/UsersPage';

const App: React.FC = () => {
  return (
    <MainLayout appTitle="User Management App" footerComponent={<Footer />}>
      <UsersPage />
    </MainLayout>
  );
};

export default App;
