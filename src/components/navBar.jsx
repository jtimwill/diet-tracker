import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

class NavBar extends Component {
  state = {
    show: false
  };

  handleToggler = () => {
    const show = !this.state.show;
    this.setState({show});
  };

  hideDropdown = () => {
    this.setState({show: false});
  };

  render() {
    const user = getCurrentUser();

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          onClick={this.handleToggler}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">DietTracker</Link>
        <div className="navbar-collapse" id="navbarNav">
          <div
            className={"navbar-nav custom-" + (this.state.show ? "show" : "hide")}
            onClick={this.hideDropdown}
          >
            {!user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/users/new">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/logout">
                  Logout
                </NavLink>
                <NavLink className="nav-item nav-link" to="/users/me/show">
                  Profile
                </NavLink>
                <NavLink className="nav-item nav-link" to="/meals/index">
                  YourDiet
                </NavLink>
                <NavLink className="nav-item nav-link" to="/ingredients/index">
                  Ingredients
                </NavLink>
                <NavLink className="nav-item nav-link" to="/diets/index">
                  Diets
                </NavLink>
              </React.Fragment>
            )}
            {user && user.admin && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/users/index">
                  Users
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
