import { Form, Input, Button, Alert } from 'antd';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../../contexts/AuthContext';
import { SignUpFields } from '../../types';

const SignUpForm = () => {
  const { signUp } = useAuth();
  const history = useHistory();

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFinish = async (values: SignUpFields) => {
    try {
      setErrorMessage(null);
      setSubmitting(true);
      await signUp(values);
      history.push('/tickets');
    } catch (err) {
      const error: AxiosError<Error> = err;
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
      setSubmitting(false);
    }
  };

  return (
    <>
      {errorMessage && (
        <Alert type="error" style={{ marginBottom: 20 }} message={errorMessage} showIcon banner />
      )}

      <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input size="large" />
        </Form.Item>

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
            loading={submitting}
            disabled={submitting}
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

export default SignUpForm;
