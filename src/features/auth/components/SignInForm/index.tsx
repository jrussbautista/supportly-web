import { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useHistory } from 'react-router';
import { useAuth } from '../../../../contexts/AuthContext';
import { LoginFields } from '../../types';
import { Error } from '../../../../types';
import { AxiosError } from 'axios';

const SignInForm = () => {
  const { login } = useAuth();
  const history = useHistory();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: LoginFields) => {
    try {
      setError(null);
      setSubmitting(true);
      await login(values);
      history.push('/tickets');
    } catch (err) {
      const error: AxiosError<Error> = err;
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
      setSubmitting(false);
    }
  };

  return (
    <>
      {error && (
        <Alert
          type="error"
          style={{ marginBottom: 20 }}
          message={error}
          showIcon
          banner
        />
      )}

      <Form
        name="basic"
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" size="large" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            disabled={submitting}
            loading={submitting}
            type="primary"
            htmlType="submit"
            size="large"
            block
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignInForm;
