import { Layout as AntLayout } from 'antd';

import Header from '../Header';
import Sidebar from '../Sidebar';

import './Layout.css';

const { Content } = AntLayout;

const Layout: React.FC = ({ children }) => {
  return (
    <div className="layout">
      <AntLayout className="ant-layout">
        <AntLayout>
          <Sidebar />
          <AntLayout>
            <Header />
            <Content className="content">
              <div className="site-layout-background main">{children}</div>
            </Content>
          </AntLayout>
        </AntLayout>
      </AntLayout>
    </div>
  );
};

export default Layout;
