import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getIngredients, deleteIngredient } from '../../services/ingredientService.js';
import Spinner from '../reusable/spinner';
import { compareNames } from '../../utilities/sortUtility.js';

class IngredientIndex extends Component {
  state = {
    ingredients: [],
    api_response: false
  };

  async componentDidMount() {
    const { data: ingredients } = await getIngredients();
    ingredients.sort(compareNames);
    this.setState({ ingredients, api_response: true });
  }

  async handleDelete(selected_ingredient) {
    try {
      await deleteIngredient(selected_ingredient.id);
      window.location = '/ingredients/index'; // Todo, don't refresh page
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This ingredient has already been deleted.");
      }
    }
  }

  render() {
    return (
      <Spinner ready={this.state.api_response}>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h5>Ingredients</h5>
            </div>
            <div className="col-sm">
              <Link to="/ingredients/new" className="btn btn-primary">
                New Ingredient
              </Link>
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Ingredient</th>
                    <th scope="col">Description</th>
                    <th scope="col">Serving Size g</th>
                    <th scope="col">Calories</th>
                    <th scope="col">Carbs g</th>
                    <th scope="col">Fat g</th>
                    <th scope="col">Protein g</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ingredients.map(ingredient => (
                    <tr key={ingredient.id}>
                      <td>{ingredient.name}</td>
                      <td>{ingredient.description}</td>
                      <td>{ingredient.serving_size}</td>
                      <td>{ingredient.calories}</td>
                      <td>{ingredient.carbohydrates}</td>
                      <td>{ingredient.fat}</td>
                      <td>{ingredient.protein}</td>
                      <td>
                        <Link
                          to={ingredient.id + "/edit"}
                          className="btn btn-info btn-sm">
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(ingredient)}
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

export default IngredientIndex;
