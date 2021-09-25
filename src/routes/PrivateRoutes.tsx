import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from '../app/Layout';
import Settings from '../features/settings/pages/Settings';
import Tickets from '../features/tickets/pages/Tickets';

const PrivateRoutes = () => {
  return (
    <Switch>
      <Layout>
        <Route path="/tickets" exact>
          <Tickets />
        </Route>
        <Route path="/settings" exact>
          <Settings />
        </Route>
      </Layout>
      <Route>
        <Redirect to="/tickets" />
      </Route>
    </Switch>
  );
};

export default PrivateRoutes;
