import React, { Component } from 'react';
import Joi from 'joi-browser';
import { saveIngredient } from '../../services/ingredientService.js';
import { validateStateObject, updateErrorObject } from '../../utilities/validationUtility.js';

class IngredientNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: {
        name: "",
        description: "",
        serving_size: 0,
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        protein: 0,
      },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    name: Joi.string().required().min(3).label('Name'),
    description: Joi.string().required().min(3).label('Description'),
    serving_size: Joi.number().integer().min(1),
    calories: Joi.number().integer().min(0).max(20000),
    carbohydrates: Joi.number().integer().min(0).max(5000),
    fat: Joi.number().integer().min(0).max(1000),
    protein: Joi.number().integer().min(0).max(2400)
  };

  handleChange(event) {
    const errors = { ...this.state.errors };
    updateErrorObject(event, errors, this.schema);

    const ingredient = { ...this.state.ingredient };
    ingredient[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ ingredient, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = validateStateObject(this.state.ingredient, this.schema);
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.setState({ errors: {} })

    try {
      await saveIngredient({ ...this.state.ingredient });
      this.props.history.push('/ingredients/index');
    } catch (exception) {
      if (exception.response && exception.response.status === 400) {
        alert(exception.response.data.errors[0].message);
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="card bg-light">
          <div className="card-body">
            <h5>New Ingredient</h5>
            <div className="form-group">
              <label htmlFor="inlineFormInputName">Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="inlineFormInputName"
                value={this.state.ingredient.name}
                onChange={this.handleChange}
              />
              {this.state.errors.name &&
                <div className="alert alert-danger">
                  {this.state.errors.name}
                </div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputDescription">Description</label>
              <input
                name="description"
                type="text"
                className="form-control"
                id="inlineFormInputDescription"
                value={this.state.ingredient.description}
                onChange={this.handleChange}
              />
              {this.state.errors.description &&
                <div className="alert alert-danger">
                  {this.state.errors.description}
                </div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputServingSize">serving size</label>
              <input
                name="serving_size"
                type="text"
                className="form-control"
                id="inlineFormInputServingSize"
                value={this.state.ingredient.serving_size}
                onChange={this.handleChange}
              />
              {this.state.errors.serving_size &&
                <div className="alert alert-danger">
                  {this.state.errors.serving_size}
                </div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputCalories">calories</label>
              <input
                name="calories"
                type="text"
                className="form-control"
                id="inlineFormInputCalories"
                value={this.state.ingredient.calories}
                onChange={this.handleChange}
              />
              {this.state.errors.calories &&
                <div className="alert alert-danger">
                  {this.state.errors.calories}
                </div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputCarbohydrates">carbohydrates</label>
              <input
                name="carbohydrates"
                type="text"
                className="form-control"
                id="inlineFormInputCarbohydrates"
                value={this.state.ingredient.carbohydrates}
                onChange={this.handleChange}
              />
              {this.state.errors.carbohydrates &&
                <div className="alert alert-danger">
                  {this.state.errors.carbohydrates}
                </div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputFat">Fat</label>
              <input
                name="fat"
                type="text"
                className="form-control"
                id="inlineFormInputFat"
                value={this.state.ingredient.fat}
                onChange={this.handleChange}
              />
              {this.state.errors.fat &&
                <div className="alert alert-danger">
                  {this.state.errors.fat}
                </div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputProtein">Protein</label>
              <input
                name="protein"
                type="text"
                className="form-control"
                id="inlineFormInputProtein"
                value={this.state.ingredient.protein}
                onChange={this.handleChange}
              />
              {this.state.errors.protein &&
                <div className="alert alert-danger">
                  {this.state.errors.protein}
                </div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default IngredientNew;
