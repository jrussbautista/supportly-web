import { Typography } from 'antd';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';
import SignInForm from '../../components/SignInForm';

const { Title, Text } = Typography;

const SignIn = () => {
  return (
    <Layout>
      <Title>Log In</Title>
      <SignInForm />
      <div>
        <Text>
          Don't have an account?
          <Link to="/sign-up"> Sign Up.</Link>
        </Text>
      </div>
    </Layout>
  );
};

export default SignIn;
