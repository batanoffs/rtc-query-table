import { ThemeContext } from '@/context/ThemeContext';
import { Layout, Switch } from 'antd';
import { useContext } from 'react';

type LayoutProps = {
  appTitle: string;
  children: React.ReactNode;
  footerComponent: React.ReactNode;
};

export const MainLayout: React.FC<LayoutProps> = ({ appTitle, children, footerComponent }: LayoutProps) => {
  const themeCtx = useContext(ThemeContext);
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
        <Switch defaultChecked onChange={themeCtx?.toggleTheme} />
      </Layout.Header>
      <Layout.Content style={{ paddingTop: '1em' }}>{children}</Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>{footerComponent}</Layout.Footer>
    </Layout>
  );
};
