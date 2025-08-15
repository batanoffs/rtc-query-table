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
          textAlign: 'center',
          paddingTop: '1em',
          content: 'test',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ color: 'white' }}>{appTitle}</h1>
          {/* TODO you can add icons for Sun and Moon and change them with the toggle */}
          <Switch title="Theme" defaultChecked onChange={themeCtx?.toggleTheme} />
        </div>
      </Layout.Header>
      <Layout.Content style={{ paddingTop: '1em' }}>{children}</Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>{footerComponent}</Layout.Footer>
    </Layout>
  );
};
