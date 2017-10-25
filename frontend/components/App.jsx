import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import SessionFormContainer from './session_form/session_form_container';
import { Route, Switch, Link } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <header >
      <NavBarContainer />
    </header>
    <section className="section-main">
      <Switch>
        <AuthRoute path="/login" component={SessionFormContainer} />
        <AuthRoute path="/signup" component={SessionFormContainer} />
      </Switch>
    </section>
  </div>
);

export default App;
