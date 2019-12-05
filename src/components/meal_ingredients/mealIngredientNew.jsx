import React, { Component } from 'react';
import Joi from 'joi-browser';
import { saveMealIngredient } from '../../services/mealIngredientService.js';
import { getIngredients } from '../../services/ingredientService.js';
import { getErrorMessage, validateStateObject } from '../../utilities/validationUtility.js';

class MealIngredientNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal_ingredient: {
        mealId: "",
        ingredientId: "",
        servings: "",
      },
      ingredients: [],
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    mealId: Joi.string().required().label("Meal"),
    ingredientId: Joi.string().required().label("Meal"),
    servings: Joi.string().required().label("Servings"),
  };

  async componentDidMount() {
    const meal_ingredient = { ...this.state.meal_ingredient };
    meal_ingredient.mealId = this.props.match.params.mealId;
    this.setState({ meal_ingredient });
    const { data: ingredients } = await getIngredients();
    this.setState({ ingredients });
  }

  handleChange(event) {
    const errors = { ...this.state.errors };
    const errorMessage = getErrorMessage(event.currentTarget, this.schema);
    if (errorMessage) {
      errors[event.currentTarget.name] = errorMessage;
    } else {
      delete errors[event.currentTarget.name];
    }

    const meal_ingredient = { ...this.state.meal_ingredient };
    meal_ingredient[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ meal_ingredient, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = validateStateObject(this.state.meal_ingredient, this.schema);
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.setState({ errors: {} })

    try {
      await saveMealIngredient(this.state.meal_ingredient);
      this.props.history.push("/meals/index");
    } catch (exception) {
      if (exception.response && exception.response.status === 400) {
        alert(exception.response.data.errmsg);
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="card bg-light">
          <div className="card-body">
            <h4>New Meal Ingredient</h4>
            <div className="form-group">
              <label htmlFor="inputGroupMealId">Ingredient</label>
              <select
                name="ingredientId"
                className="form-control"
                id="inputGroupMealId"
                onChange={this.handleChange}
                >
                <option value=""/>
                {this.state.ingredients.map(ingredient => (
                  <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.name}
                  </option>
                ))}
              </select>
              {this.state.errors.ingredientId &&
                <div className="alert alert-danger">
                {this.state.errors.ingrdientId}
                </div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputServings">Servings</label>
              <input
                name="servings"
                type="number"
                className="form-control"
                id="inlineFormInputServings"
                value={this.state.meal_ingredient.servings}
                onChange={this.handleChange}
              />
              {this.state.errors.servings &&
                <div className="alert alert-danger">
                {this.state.errors.servings}
                </div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default MealIngredientNew;
