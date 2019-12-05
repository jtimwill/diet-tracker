import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userService.js';
import { getDiet } from '../../services/dietService.js';
import Spinner from '../reusable/spinner';

class UserShow extends Component {
  state = {
    user: {},
    diet: {},
    api_response: false
  };

  async componentDidMount() {
    const { data: user } = await getUser();
    const { data: diet } = await getDiet(user.dietId);
    this.setState({ diet, user, api_response: true });
  }

  render() {
    return (
      <Spinner ready={this.state.api_response}>
        <div className="card">
          <div className="card-header bg-light">
            <h5 className="card-title">Profile</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="card-text font-weight-bold">Name: </span>
              {this.state.user.username}
            </li>
            <li className="list-group-item">
              <span className="card-text font-weight-bold">Email: </span>
              {this.state.user.email}
            </li>
            <li className="list-group-item">
              <span className="card-text font-weight-bold">Calories: </span>
              {this.state.user.calories}
            </li>
            <li className="list-group-item">
              <span className="card-text font-weight-bold">Diet: </span>
              {this.state.diet.name}
            </li>
          </ul>
          <div className="card-body">
            <Link
              to="/users/me/edit" className="btn btn-info">
              Edit User
            </Link>
          </div>
        </div>
      </Spinner>
    );
  }
}

export default UserShow;
