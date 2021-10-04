import { TeamOutlined, PieChartOutlined, SettingOutlined, FileOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

import './Sidebar.css';

interface SubMenu {
  id: string;
  title: string;
  url: string;
}
interface SidebarLink {
  id: string;
  title: string;
  url: string;
  icon: React.ReactElement;
  subMenus: SubMenu[];
}

const SIDEBAR_LINKS: SidebarLink[] = [
  {
    id: '1',
    title: 'Dashboard',
    url: '/dashboard',
    icon: <PieChartOutlined />,
    subMenus: [],
  },
  {
    id: '2',
    title: 'Tickets',
    url: '/tickets',
    icon: <FileOutlined />,
    subMenus: [
      {
        id: '1',
        url: '/tickets/create',
        title: 'Create Ticket',
      },
      {
        id: '2',
        url: '/tickets/my-tickets',
        title: 'My Tickets',
      },
      {
        id: '3',
        url: '/tickets',
        title: 'All Tickets',
      },
    ],
  },
  {
    id: '3',
    title: 'Users',
    url: '/users',
    icon: <TeamOutlined />,
    subMenus: [],
  },
  {
    id: '4',
    title: 'Settings',
    url: '/settings',
    icon: <SettingOutlined />,
    subMenus: [],
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  const paths = pathname.split('/');
  const activePath = '/' + paths[1];

  const selectedLink = SIDEBAR_LINKS.find((link) => link.url === activePath);
  const selectedSubMenuLink = selectedLink?.subMenus.find((subMenu) => subMenu.url === pathname);

  const defaultSidebarMenuLink = selectedLink?.id || '';
  const defaultSidebarSubMenuLink = selectedSubMenuLink ? 'subMenu-' + selectedSubMenuLink.id : '';

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo-container">
        <img src="/images/logo.png" alt="Supportly logo" className="logo" />
        <h2 className="logo-title">Supportly</h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={[defaultSidebarMenuLink]}
        defaultSelectedKeys={[defaultSidebarMenuLink, defaultSidebarSubMenuLink]}
      >
        {SIDEBAR_LINKS.map((sidebarLink) => {
          return sidebarLink.subMenus.length ? (
            <SubMenu key={sidebarLink.id} icon={sidebarLink.icon} title={sidebarLink.title}>
              {sidebarLink.subMenus.map((subMenu) => (
                <Menu.Item key={`subMenu-${subMenu.id}`}>
                  <Link to={subMenu.url}>{subMenu.title}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={sidebarLink.id} icon={sidebarLink.icon}>
              <Link to={sidebarLink.url}>{sidebarLink.title}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
