import React, { Component } from 'react';
import Joi from 'joi-browser';
import { saveDiet } from '../../services/dietService.js';
import { getErrorMessage, validateStateObject } from '../../utilities/validationUtility.js';

class DietNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diet: {
        name: "",
        description: "",
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
    carbohydrates: Joi.number().integer().min(0).max(5000),
    fat: Joi.number().integer().min(0).max(1000),
    protein: Joi.number().integer().min(0).max(2400)
  };

  handleChange(event) {
    const errors = { ...this.state.errors };
    const errorMessage = getErrorMessage(event.currentTarget, this.schema);
    if (errorMessage) {
      errors[event.currentTarget.name] = errorMessage;
    } else {
      delete errors[event.currentTarget.name];
    }

    const diet = { ...this.state.diet };
    diet[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ diet, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = validateStateObject(this.state.diet, this.schema);
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.setState({ errors: {} })

    try {
      await saveDiet({ ...this.state.diet });
      this.props.history.push('/diets/index');
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
            <h5>New Diet</h5>
            <div className="form-group">
              <label htmlFor="inlineFormInputName">Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="inlineFormInputName"
                value={this.state.diet.name}
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
                value={this.state.diet.description}
                onChange={this.handleChange}
              />
              {this.state.errors.description &&
                <div className="alert alert-danger">
                  {this.state.errors.description}
                </div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputCarbohydrates">carbohydrates</label>
              <input
                name="carbohydrates"
                type="text"
                className="form-control"
                id="inlineFormInputCarbohydrates"
                value={this.state.diet.carbohydrates}
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
                value={this.state.diet.fat}
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
                value={this.state.diet.protein}
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

export default DietNew;
