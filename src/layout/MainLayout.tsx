import { Layout } from 'antd';

type LayoutProps = {
  appTitle: string;
  children: React.ReactNode;
  footerComponent: React.ReactNode;
};

export const MainLayout = ({ appTitle, children, footerComponent }: LayoutProps) => {
  return (
    <Layout style={{ minHeight: '100dvh', backgroundColor: '#f0f2f5', maxHeight: '100dvh' }}>
      <Layout.Header style={{ color: 'white', textAlign: 'center' }}>
        <h1>{appTitle}</h1>
      </Layout.Header>
      <Layout.Content style={{ paddingTop: '20px', height: '100%' }}>{children}</Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>{footerComponent}</Layout.Footer>
    </Layout>
  );
};
