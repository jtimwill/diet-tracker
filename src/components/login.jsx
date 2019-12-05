import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import { login, getCurrentUser } from '../services/authService';
import { getErrorMessage, validateStateObject } from '../utilities/validationUtility.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: ""
      },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password")
  };

  handleChange(event) {
    const errors = { ...this.state.errors };
    const errorMessage = getErrorMessage(event.currentTarget, this.schema);
    if (errorMessage) {
      errors[event.currentTarget.name] = errorMessage;
    } else {
      delete errors[event.currentTarget.name];
    }

    const user = { ...this.state.user };
    user[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ user, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = validateStateObject(this.state.user, this.schema);
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.setState({ errors: {} })

    try {
      const { user } = this.state;
      await login(user.email, user.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/users/me/show";
    } catch(exception) {
      if (exception.response && exception.response.status === 400){
        alert(exception.response.data);
      }
    }
  }

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="card bg-light">
          <div className="card-body">
            <h5>Login</h5>
            <div className="form-group">
              <label htmlFor="inlineFormInputEmail">Email</label>
              <input
                name="email"
                type="text"
                className="form-control"
                id="inlineFormInputEmail"
                value={this.state.username}
                onChange={this.handleChange}
              />
              {this.state.errors.email &&
                <div className="alert alert-danger">
                  {this.state.errors.email}
                </div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputPassword">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="inlineFormInputPassword"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {this.state.errors.password &&
                <div className="alert alert-danger">
                  {this.state.errors.password}
                </div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
