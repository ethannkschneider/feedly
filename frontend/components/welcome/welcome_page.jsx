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
    this.props.clearErrors();
    this.props.history.goBack();
  }

  render() {
    return (
      <main className="welcome-main">
        <div className="welcome-intro-container">
          <div className="welcome-header">
            <h1>Welcome to Readly</h1>
          </div>
          <div className="welcome-description">
            <p>
              The content you need to keep yourself occupied on the subway
               and other places.
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

        <section className="welcome-section white-section">
          <div className="centered"><h4>You are in control</h4></div>
          <div className="centered"><h2>More signal, less noise</h2></div>
          <div className="signal-noise-grid">
            <div className="grid-el row-1-col-1">
              <div className="icon feature-pubs">
                <i className="material-icons">add</i>
              </div>
              <div className="item-header">Your Publication</div>
              <div className="description">
                NYTimes? Check. Other publications? Also check.
                We have all the publications you need to completely
                recede into yourself during your morning commute.
              </div>
            </div>
            <div className="grid-el row-1-col-2">
              <div className="icon feature-blogs">
                <i className="material-icons">nature_people</i>
              </div>
              <div className="item-header">Your Blogs</div>
              <div className="description">
                Fade into oblivion by following blogs from all of hottest
                thinkfluencers on the web.
              </div>
            </div>
            <div className="grid-el row-1-col-3">
              <div className="icon feature-youtube">
                <i className="material-icons">video_label</i>
              </div>
              <div className="item-header">Your YouTube Channels</div>
              <div className="description">
                Who knows? Someday you may be able to check out all of your
                favorite YouTube videos on Readly. Maybe.
              </div>
            </div>
            <div className="grid-el row-2-col-1">
              <div className="icon feature-keyword">
                <i className="material-icons">notifications</i>
              </div>
              <div className="item-header">Your Keyword Alerts</div>
              <div className="description">
                Wouldn't it be nice to be able to integrate Google Alerts
                into your Readly experience? Shhh go back to reading Readly.
              </div>
            </div>
            <div className="grid-el row-2-col-2">
              <div className="icon feature-collections">
                <i className="material-icons">dashboard</i>
              </div>
              <div className="item-header">Your Collections</div>
              <div className="description">
                Scrunch through more content all the time everyday by
                organizing your feeds into easy-to-read collections.
              </div>
            </div>
            <div className="grid-el row-2-col-3">
              <div className="icon feature-security">
                <i className="material-icons">https</i>
              </div>
              <div className="item-header">Your Privacy</div>
              <div className="description">
                Your security matters, which is why Readly is commited to
                implementing a hella sweet backend-to-frontend
                authentication pattern.
              </div>
            </div>
          </div>
        </section>

        <section className="welcome-section gray-section">
          <div className="centered"><h4>Powerful Integrations</h4></div>
          <div className="centered"><h2>Infinite content</h2></div>
          <div className="signal-noise-grid">
            <div className="grid-el row-1-col-1">
              <div className="icon feature-pubs">
                <i className="material-icons">view_comfy</i>
              </div>
              <div className="item-header">Organize</div>
              <div className="description">
                Organize your stuff.
              </div>
            </div>
            <div className="grid-el row-1-col-2">
              <div className="icon feature-blogs">
                <i className="material-icons">storage</i>
              </div>
              <div className="item-header">Read</div>
              <div className="description">
                Readly offers you things to read. Read them.
              </div>
            </div>
            <div className="grid-el row-1-col-3">
              <div className="icon feature-youtube">
                <i className="material-icons">search</i>
              </div>
              <div className="item-header">Search</div>
              <div className="description">
                Check out our sweet search feature.
              </div>
            </div>
            <div className="grid-el row-2-col-1">
              <div className="icon feature-keyword">
                <i className="material-icons">bookmark_border</i>
              </div>
              <div className="item-header">Read Later</div>
              <div className="description">
                Can you save articles to read later, you ask? Yes.
              </div>
            </div>
            <div className="grid-el row-2-col-2">
              <div className="icon feature-collections">
                <i className="material-icons">share</i>
              </div>
              <div className="item-header">Share</div>
              <div className="description">
                It would be pretty nifty if you could share articles to
                your favorite social media sites, right? Shhh go back to
                reading those articles.
              </div>
            </div>
            <div className="grid-el row-2-col-3">
              <div className="icon feature-security">
                <i className="material-icons">track_changes</i>
              </div>
              <div className="item-header">Discover</div>
              <div className="description">
                Find all that fresh new content.
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(WelcomePage);
