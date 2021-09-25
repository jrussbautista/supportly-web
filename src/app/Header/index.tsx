import { Layout, Typography, Avatar, Image } from 'antd';

import { useAuth } from '../../contexts/AuthContext';

import './Header.css';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <AntHeader className="header">
      <Title level={3} className="title">
        Supportly
      </Title>
      <div className="right">
        <Title level={5} className="name">
          John Doe
        </Title>
        {currentUser?.photoUrl ? (
          <Avatar className="avatar" src={<Image src={currentUser.photoUrl} />} />
        ) : (
          <Avatar className="avatar">{currentUser?.firstName?.charAt(0).toUpperCase()}</Avatar>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
