import { Layout } from 'antd';
import UsersPage from './components/UsersPage/UsersPage';

const App = () => {
  return (
    <Layout style={{ minHeight: '100dvh', backgroundColor: '#f0f2f5', maxHeight: '100dvh' }}>
      <Layout.Header style={{ color: 'white', textAlign: 'center' }}>
        <h1>Users Management</h1>
      </Layout.Header>
      <Layout.Content style={{ paddingTop: '20px', height: '100%' }}>
        <div style={{ background: '#fff' }}>
          <UsersPage />
        </div>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        © 2025 Created by{' '}
        <a style={{ color: 'blue', textDecoration: 'underline' }} href="https://daniel-batanov.onrender.com/">
          batanoffs
        </a>
      </Layout.Footer>
    </Layout>
  );
};

export default App;
