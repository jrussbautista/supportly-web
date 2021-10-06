import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from '../app/Layout';
import Settings from '../features/settings/pages/Settings';
import CreateTicket from '../features/tickets/pages/CreateTicket';
import MyTickets from '../features/tickets/pages/MyTickets';
import Tickets from '../features/tickets/pages/Tickets';
import UpdateTicket from '../features/tickets/pages/UpdateTicket/index';
import ViewTicket from '../features/tickets/pages/ViewTicket/index';

const PrivateRoutes = () => {
  return (
    <Switch>
      <Layout>
        <Route path="/tickets" exact>
          <Tickets />
        </Route>
        <Route path="/tickets/create" exact>
          <CreateTicket />
        </Route>

        <Route path="/tickets/my-tickets" exact>
          <MyTickets />
        </Route>
        <Route path="/tickets/:id/view" exact>
          <ViewTicket />
        </Route>
        <Route path="/tickets/:id/edit" exact>
          <UpdateTicket />
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
