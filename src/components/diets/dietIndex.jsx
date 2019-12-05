import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getDiets, deleteDiet } from '../../services/dietService.js';
import Spinner from '../reusable/spinner';
import { compareNames } from '../../utilities/sortUtility.js';

class DietIndex extends Component {
  state = {
    diets: [],
    api_response: false
  };

  async componentDidMount() {
    const { data: diets } = await getDiets();
    diets.sort(compareNames);
    this.setState({ diets, api_response: true });
  }

  async handleDelete(selected_diet) {
    try {
      await deleteDiet(selected_diet.id);
      window.location = '/users/index'; // Todo, don't refresh page
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This diet has already been deleted.");
      }
    }
  }

  render() {
    return (
      <Spinner ready={this.state.api_response}>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h5>Diets</h5>
            </div>
            <div className="col-sm">
              <Link to="/diets/new" className="btn btn-primary">
                New Diet
              </Link>
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Diets</th>
                    <th scope="col">Description</th>
                    <th scope="col">Carbs</th>
                    <th scope="col">Fat</th>
                    <th scope="col">Protein</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.diets.map(diet => (
                    <tr key={diet.id}>
                      <td>{diet.name}</td>
                      <td>{diet.description}</td>
                      <td>{diet.carbohydrates}</td>
                      <td>{diet.fat}</td>
                      <td>{diet.protein}</td>
                      <td>
                        <Link
                          to={diet.id + "/edit"}
                          className="btn btn-info btn-sm">
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(diet)}
                          className="btn btn-danger btn-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Spinner>
    );
  }
}

export default DietIndex;
