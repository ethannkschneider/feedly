import React from 'react';
import merge from 'lodash/merge';
import { Link, withRouter } from 'react-router-dom';

//Need to add: Redirect if user logged in.

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.formType === 'login') {
      this.state = {
        email: "",
        password: ""
      };
    } else {
      this.state = {
        email: "",
        password: "",
        first_name: "",
        last_name: ""
      };
    }

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nameInputs = this.nameInputs.bind(this);
    this.header = this.header.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.processForm(user);
  }

  nameInputs() {
    let nameInputs;
    if (this.props.formType === 'signup') {
      nameInputs = (
        <div className="name-input">
          <label htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            onChange={this.update('first_name')}
            value={this.state.first_name}>
          </input>

          <label htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            onChange={this.update('last_name')}
            value={this.state.last_name}>
          </input>
        </div>
      );
    } else {
      nameInputs = null;
    }

    return nameInputs;
  }

  header() {
    const linkPath = (this.props.formType === 'login') ? '/signup' : '/login';
    const header = (this.props.formType === 'login') ? 'Login' : 'Sign Up';
    const errors = this.props.errors.map( (error) => error.responseJSON);
      return (
        <div className="session-form-header">
          <h1>{header}</h1>
          <Link to={linkPath}>{linkPath.slice(1)}</Link>
          <h6>{errors}</h6>
        </div>
      );
  }

  render() {

    return (
      <div className="session-form">
        {this.header()}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              onChange={this.update('email')}
              value={this.state.email}>
            </input>

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              onChange={this.update('password')}
              value={this.state.password}>
            </input>
          </div>

          {this.nameInputs()}
          <div className="session-form-submit-button">
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
