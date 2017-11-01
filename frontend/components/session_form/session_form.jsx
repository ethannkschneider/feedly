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
        last_name: "",
        imageFile: null,
        imageUrl: null
      };
    }

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nameInputs = this.nameInputs.bind(this);
    this.header = this.header.bind(this);
    this.updateFile = this.updateFile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.formType !== this.props.formType) {
      this.props.clearErrors();
      if (nextProps.formType === 'login') {
        this.setState({
          email: "",
          password: "",
          first_name: "",
          last_name: ""
        });
      } else {
        this.setState({
          email: "",
          password: ""
        });
      }
    }
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
    // const user = merge({}, this.state);
    const formData = new FormData();
    formData.append("user[email]", this.state.email);
    formData.append("user[password]", this.state.password);
    if(this.props.formType === 'welcome/signup') {
      const file = this.state.imageFile;
      formData.append("user[first_name]", this.state.first_name);
      formData.append("user[last_name]", this.state.last_name);
      if (this.state.imageFile) formData.append("user[image]", this.state.imageFile);
    }
    this.props.processForm(formData).then( (res) => {
      this.props.hideModals();
      this.props.history.push("/");
    });
  }

  updateFile(e)  {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  nameInputs() {
    let nameInputs;
    if (this.props.formType === 'welcome/signup') {
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
          <div className="prof-pic-upload-wrapper" id="prof-pic-wrapper">
            <label htmlFor="prof-pic-upload">Upload Profile Picture:</label>
            <input id="prof-pic-upload" type="file" onChange={this.updateFile}/>
          </div>
          <div className="prof-pic-preview">
            <div>Preview:</div>
            <div id="pic-preview">
              <img src={this.state.imageUrl}/>
            </div>
          </div>
        </div>
      );
    } else {
      nameInputs = null;
    }

    return nameInputs;
  }

  header() {
    // linkPath only necessary if want a link to opposite form
    let errors;
    const linkPath = (this.props.formType === 'login') ? '/signup' : '/login';
    const header = (this.props.formType === 'welcome/login') ?
     'Login' : 'Sign Up';
    if (this.props.errors.responseJSON) {
      errors = this.props.errors.responseJSON.map( (error, idx) => {
        return (
          <li key={idx}>{error}</li>
        );}
      );
    }
      return (
        <div className="session-form-header">
          <h1>{header}</h1>
          <ul className="session-errors">
            {errors}
          </ul>
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
          <input className="hidden-submit" type="submit"></input>
        </form>
        <div className="session-form-submit-button">
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);
