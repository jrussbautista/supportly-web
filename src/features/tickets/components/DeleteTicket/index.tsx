import { ExclamationCircleOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Modal, notification } from 'antd';

import { useDeleteTicket } from '../../hooks';

const { confirm } = Modal;

interface Props {
  id: number;
}

const DeleteTicket = ({ id }: Props) => {
  const deleteTicket = useDeleteTicket();

  const showConfirmDelete = () => {
    confirm({
      title: 'Delete',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete this ticket?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        try {
          await deleteTicket.mutateAsync(id);
          notification.success({ message: 'Success', description: 'Comment deleted.' });
        } catch (error) {
          console.log(error.response);
        }
      },
    });
  };

  return (
    <Button icon={<DeleteFilled />} onClick={showConfirmDelete}>
      Delete
    </Button>
  );
};

export default DeleteTicket;
