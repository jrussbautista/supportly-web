import { TeamOutlined, PieChartOutlined, SettingOutlined, FileOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

import './Sidebar.css';

interface SidebarLink {
  id: string;
  title: string;
  url: string;
  icon: React.ReactElement;
}

const SIDEBAR_LINKS: SidebarLink[] = [
  {
    id: '1',
    title: 'Dashboard',
    url: '/dashboard',
    icon: <PieChartOutlined />,
  },
  {
    id: '2',
    title: 'Tickets',
    url: '/tickets',
    icon: <FileOutlined />,
  },
  {
    id: '3',
    title: 'Users',
    url: '/users',
    icon: <TeamOutlined />,
  },
  {
    id: '4',
    title: 'settings',
    url: '/settings',
    icon: <SettingOutlined />,
  },
];

const Sidebar = () => {
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo-container">
        <img src="/images/logo.png" alt="Supportly logo" className="logo" />
        <h2 className="logo-title">Supportly</h2>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {SIDEBAR_LINKS.map((sidebarLink) => (
          <Menu.Item key={sidebarLink.id} icon={sidebarLink.icon}>
            <Link to={sidebarLink.url}>{sidebarLink.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
