import { Form, Input, Button, Alert, Select, Typography, notification } from 'antd';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { Error } from '../../../../types';
import { upperCaseFirstLetter } from '../../../../utils/helper';
import { PRIORITIES } from '../../constants';
import { useUpdateTicket, useTicket } from '../../hooks';
import { Priority, TicketField } from '../../types';

const { Title } = Typography;
const { Option } = Select;

interface Params {
  id: string;
}

const UpdateTicket = () => {
  const { id } = useParams<Params>();
  const history = useHistory();

  const { data, isError, isLoading } = useTicket(Number(id));

  const [form] = Form.useForm();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initialValues: TicketField = {
    title: data?.title || '',
    description: data?.description || '',
    priority: data ? data.priority : Priority.LOW,
  };

  const mutate = useUpdateTicket();

  const onFinish = async (fields: TicketField) => {
    try {
      await mutate.mutateAsync({ id, fields });
      notification.success({ message: 'Success', description: 'Ticket updated.' });
      history.push('/tickets/my-tickets');
    } catch (err) {
      const error: AxiosError<Error> = err;
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const onPriorityChange = (value: string) => {
    form.setFieldsValue({ priority: value });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Sorry we were not able to edit your ticket right now. Please try again.</p>;
  }

  return (
    <>
      <Title level={2}>Update Ticket</Title>
      {errorMessage && (
        <Alert type="error" style={{ marginBottom: 20 }} message={errorMessage} showIcon banner />
      )}

      <Form
        initialValues={initialValues}
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input type="text" size="large" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.TextArea rows={5} size="large" />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: 'Priority is required!' }]}
        >
          <Select placeholder="Select Priority" onChange={onPriorityChange} allowClear>
            {PRIORITIES.map((priority) => (
              <Option value={priority} key={priority}>
                {upperCaseFirstLetter(priority)}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            disabled={mutate.isLoading}
            loading={mutate.isLoading}
            type="primary"
            htmlType="submit"
            size="large"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateTicket;
