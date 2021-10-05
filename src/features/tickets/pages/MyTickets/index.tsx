import { Table, Space, Spin, Alert, Typography } from 'antd';

import DeleteTicket from '../../components/DeleteTicket';
import { useMyTickets } from '../../hooks';
import { Ticket } from '../../types';

const { Column } = Table;
const { Title } = Typography;

const MyTickets = () => {
  const { isLoading, data, error } = useMyTickets();

  if (isLoading) {
    return (
      <div className="loading-container">
        <Title level={3}>My Tickets</Title>
        <Spin size="large" className="" />
      </div>
    );
  }

  if (!data && error) {
    return (
      <div>
        <Title level={3}>My Tickets</Title>
        <Alert
          message="Sorry. We were'nt able to display your tickets right now. Please try again soo."
          type="error"
        />
      </div>
    );
  }

  return (
    <div>
      <Title level={3}>My Tickets</Title>
      <Table dataSource={data} rowKey="id" locale={{ emptyText: 'No tickets yet.' }}>
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Priority"
          dataIndex="priority"
          key="priority"
          render={(value) => <div>{value.toUpperCase()}</div>}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(value) => <div>{value.toUpperCase()}</div>}
        />

        <Column<Ticket>
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a>Edit </a>
              <DeleteTicket id={record.id} />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default MyTickets;
