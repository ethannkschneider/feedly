import React from 'react';
import Modal from 'react-modal';

import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import NavBarContainer from './nav_bar/nav_bar_container';
import SessionFormContainer from './session_form/session_form_container';
import WelcomePage from './welcome/welcome_page';

//note: basic modal logic found on www.npmjs.com/package/react-modal

const modalStyles = {
  content: {
    position: 'fixed',
    top: '45px',
    left: 0,
    right: 0,
    bottom: 0,
    width: '300px',
    height: 'auto',
    margin: '0 auto',
    padding: '10px',
    background: 'inherit',
    border: 'none'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    margin: '0 auto',
    overflow: 'hidden',
    background: '#FAEBD7',
    border: '1px solid black',
    padding: '2px',
    opacity: 0.7

  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = { modalIsOpen: false };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({ modalIsOpen: false });
    this.props.history.goBack();
  }

  render() {

    return (
      <div>
        <header >
          <NavBarContainer openModal={this.openModal}/>
        </header>
        <Route path="/welcome" render={(props) => {
            return (
              <div>
                <WelcomePage openModal={this.openModal} />
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={modalStyles}
                  >
                  <Switch>
                    <AuthRoute
                      path="/welcome/login"
                      component={SessionFormContainer}
                      closeModal={this.closeModal}
                      openModal={this.openModal}
                      />
                    <AuthRoute
                      path="/welcome/signup"
                      component={SessionFormContainer}
                      closeModal={this.closeModal}
                      openModal={this.openModal}
                      />
                  </Switch>
                </Modal>
              </div>
            );
          }}/>

        <section className="section-main">

        </section>
      </div>
    );
  }
}

export default withRouter(App);
