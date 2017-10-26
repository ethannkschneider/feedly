import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  handleLogin() {
    this.props.showLoginModal();
    this.props.history.push("/welcome/login");
  }

  render() {
    let greeting;
    if (this.props.currentUser) {
      greeting = (
        <div className="nav-logged-in-greeting">
          <div className="welcome-greeting">
            <h1>Hello, {this.props.currentUser.first_name}</h1>
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
      <div className="header-main">
        <div className="nav-home-link">
          <h1><Link to="/">Readly</Link></h1>
          <div className="icon-div">
            <Link to="/"><i className="material-icons">rss_feed</i></Link>
          </div>
        </div>
        {greeting}
      </div>
    );
  }
}

export default withRouter(NavBar);
