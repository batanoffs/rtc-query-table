import { MainLayout } from './layout/MainLayout';
import { Footer } from './layout/Footer';
import UsersPage from './pages/UsersPage/UsersPage';
import UserTable from './components/Table/UsersTable';

const App: React.FC = () => {
  return (
    <MainLayout appTitle="User Management App" footerComponent={<Footer />}>
      <UsersPage Table={UserTable} />
    </MainLayout>
  );
};

export default App;
