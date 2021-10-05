import { Form, Input, Button, Alert, Select } from 'antd';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';

import { Error } from '../../../../types';
import { upperCaseFirstLetter } from '../../../../utils/helper';
import { PRIORITIES } from '../../constants';
import { useCreateTicket } from '../../hooks';
import { TicketField } from '../../types';

const { Option } = Select;

const CreateTicket = () => {
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form] = Form.useForm();

  const mutate = useCreateTicket();

  const onFinish = async (values: TicketField) => {
    try {
      await mutate.mutateAsync(values);
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

  return (
    <>
      {errorMessage && (
        <Alert type="error" style={{ marginBottom: 20 }} message={errorMessage} showIcon banner />
      )}

      <Form form={form} name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
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

export default CreateTicket;
