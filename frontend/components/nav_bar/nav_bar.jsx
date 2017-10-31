import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.cssHeaderClass = this.cssHeaderClass.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  handleLogin() {
    this.props.showLoginModal();
    this.props.history.push("/welcome/login");
  }

  cssHeaderClass() {
    if (!this.props.currentUser) {
      return "header-main header-logged-out";
    } else if (this.props.sidebarVisible) {
      return "header-main header-sidebar-open";
    } else {
      return "header-main header-sidebar-closed";
    }
  }

  render() {
    let greeting;
    if (this.props.currentUser) {
      greeting = (
        <div className="nav-logged-in-greeting">
          <div className="welcome-greeting">
            <h1>Hello, {this.props.currentUser.first_name}</h1>
          </div>
          <div className="welcome-greeting-add-feeds-link">
            <button>
              <Link
                to="/discover">
                Add Feeds
              </Link>
            </button>
          </div>
          <form onSubmit={this.handleLogout}>
            <button>Logout</button>
          </form>
        </div>
      );
    }
    else {
      greeting = (
        <div className="nav-logged-out-greeting">
          <div className="welcome-greeting">
            <h1>Welcome</h1>
          </div>

          <div className="signin-login-link">
            <form onSubmit={this.handleLogin}>
              <button>Login</button>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div className={this.cssHeaderClass()}>
        <div className="header-nav-items">
          <div className="nav-home-link">
            <h1><Link to="/">Readly</Link></h1>
            <div className="icon-div">
              <Link to="/"><i className="material-icons">rss_feed</i></Link>
            </div>
          </div>
          {this.props.loading && this.props.currentUser ? null : greeting}
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
