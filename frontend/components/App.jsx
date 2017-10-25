import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import SessionFormContainer from './session_form/session_form_container';
import { Route, Switch, Link } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from 'react-modal';

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
  }

  render() {

    return (
      <div>
        <header >
          <NavBarContainer openModal={this.openModal}/>
        </header>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyles}
        >
          <Switch>
            <AuthRoute
              path="/login"
              component={SessionFormContainer}
              closeModal={this.closeModal}
            />
            <AuthRoute
              path="/signup"
              component={SessionFormContainer}
              closeModal={this.closeModal}
            />
          </Switch>
        </Modal>

        <section className="section-main">

        </section>
      </div>
    );
  }
}

export default App;
