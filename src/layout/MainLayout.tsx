import { Layout } from 'antd';

type LayoutProps = {
  appTitle: string;
  children: React.ReactNode;
  footerComponent: React.ReactNode;
};

export const MainLayout: React.FC<LayoutProps> = ({ appTitle, children, footerComponent }: LayoutProps) => {
  return (
    <Layout style={{ minHeight: '100dvh', backgroundColor: '#f0f2f5', maxHeight: '100dvh' }}>
      <Layout.Header
        style={{
          color: 'white',
          textAlign: 'center',
          paddingTop: '1em',
        }}
      >
        <h1>{appTitle}</h1>
      </Layout.Header>
      <Layout.Content style={{ paddingTop: '1em' }}>{children}</Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>{footerComponent}</Layout.Footer>
    </Layout>
  );
};
