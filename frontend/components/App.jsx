import React from 'react';
import Modal from 'react-modal';

import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import NavBarContainer from './nav_bar/nav_bar_container';
import SidebarContainer from './sidebar/sidebar_container';
import WelcomePageContainer from './welcome/welcome_page_container';
import CollectionIndexContainer from './collections/collection_index_container';
import OrganizeSourcesContainer from './organize/organize_sources_container';
import DiscoverSourcesContainer from './discover/discover_sources_container';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div>
        <header >
          <NavBarContainer/>
        </header>
        <ProtectedRoute
          path="/"
          component={SidebarContainer}
          />
        <Switch>
          <AuthRoute
            path="/welcome"
            component={WelcomePageContainer}
          />
          <ProtectedRoute
            path="/organize"
            component={OrganizeSourcesContainer}
          />
          <ProtectedRoute
            path="/discover"
            component={DiscoverSourcesContainer}
          />
          <ProtectedRoute
            path="/"
            component={CollectionIndexContainer}
          />
        </Switch>


      </div>
    );
  }
}

export default withRouter(App);
