import React from 'react';
import Modal from 'react-modal';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';

import SessionFormContainer from '../session_form/session_form_container';

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
    opacity: 0.9

  }
};

class WelcomePage extends React.Component {

  constructor(props) {
    super(props);
      this.state = { modalIsOpen: false };

      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
  }

  openModal(modalPath) {
    this.props.showSignupModal();
  }

  afterOpenModal() {

  }

  closeModal() {
    this.props.hideModals();
    this.props.history.goBack();
  }

  render() {
    return (
      <main className="welcome-main">
        <div className="welcome-container">
          <div className="welcome-header">
            <h1>Welcome to Readly</h1>
          </div>
          <div className="welcome-description">
            <p>
              The content you need to keep yourself occupied on the subway and other places.
            </p>
          </div>

          <div className="welcome-signup">
            <Link
              onClick={() => this.openModal("signup")}
              to="/welcome/signup">Get Started for Free
            </Link>
          </div>
          <Modal
            isOpen={this.props.isModalOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={modalStyles}
            >
            <Switch>
              <AuthRoute
                path="/welcome/login"
                component={SessionFormContainer}
                closeModal={this.closeModal}
                openModal={() => this.openModal('login')}
                />
              <AuthRoute
                path="/welcome/signup"
                component={SessionFormContainer}
                closeModal={this.closeModal}
                openModal={() => this.openModal('signup')}
                />
            </Switch>
          </Modal>

          <div id="color-feed-image"></div>
        </div>
      </main>
    );
  }
}

export default withRouter(WelcomePage);
