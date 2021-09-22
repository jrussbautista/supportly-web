import { Switch, Route, Redirect } from 'react-router-dom';
import Tickets from '../features/tickets/pages/Tickets';

const PrivateRoutes = () => {
  return (
    <Switch>
      <Route path="/tickets" exact>
        <Tickets />
      </Route>
      <Route>
        <Redirect to="/tickets" />
      </Route>
    </Switch>
  );
};

export default PrivateRoutes;
