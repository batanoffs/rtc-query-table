import { Layout } from 'antd';
import UsersPage from './components/UsersPage/UsersPage';

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh', height: '100vh', width: '100vw' }}>
      <Layout.Header style={{ color: 'white', textAlign: 'center' }}>
        <h1>Users Management</h1>
      </Layout.Header>
      <Layout.Content style={{ padding: '20px', height: '100%', boxSizing: 'border-box' }}>
        <div style={{ background: '#fff', minHeight: 'calc(100vh - 134px)' }}>
          <UsersPage />
        </div>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        © 2023 Created by{' '}
        <a style={{ color: 'blue', textDecoration: 'underline' }} href="https://daniel-batanov.onrender.com/">
          batanoffs
        </a>
      </Layout.Footer>
    </Layout>
  );
};

export default App;
