import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

import { useAuth } from '../../../../contexts/AuthContext';

const { confirm } = Modal;

const Settings = () => {
  const { logOut } = useAuth();

  const showLogOutConfirm = () => {
    confirm({
      title: 'Log Out',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to log out?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        logOut();
      },
    });
  };

  return (
    <div>
      <Button onClick={showLogOutConfirm} danger type="primary">
        Log Out
      </Button>
    </div>
  );
};

export default Settings;
