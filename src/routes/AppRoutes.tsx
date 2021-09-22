import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from '../features/auth/pages/SignIn';
import SignUp from '../features/auth/pages/SignUp';

const AppRoutes = () => {
  return (
    <Router>
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
      </Switch>
    </Router>
  );
};

export default AppRoutes;
