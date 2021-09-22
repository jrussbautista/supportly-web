import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../features/auth/pages/SignIn';
import SignUp from '../features/auth/pages/SignUp';

const PublicRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/sign-in" />
      </Route>
      <Route path="/sign-in" exact>
        <Login />
      </Route>
      <Route path="/sign-up" exact>
        <SignUp />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default PublicRoutes;
