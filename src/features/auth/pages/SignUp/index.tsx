import { Typography } from 'antd';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';
import SignUpForm from '../../components/SignUpForm';

const { Title, Text } = Typography;

const SignUp = () => {
  return (
    <Layout>
      <Title>Sign Up</Title>
      <SignUpForm />
      <div>
        <Text>
          Already have an account?
          <Link to="/sign-in"> Sign In</Link>.
        </Text>
      </div>
    </Layout>
  );
};

export default SignUp;
