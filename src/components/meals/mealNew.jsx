import React, { Component } from 'react';
import Joi from 'joi-browser';
import { saveMeal} from '../../services/mealService.js';
import { getErrorMessage, validateStateObject } from '../../utilities/validationUtility.js';

class MealNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: {
        name: "",
        description: "",
      },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    name: Joi.string().required().min(3).label('Name'),
    description: Joi.string().label('Description'),
  };

  handleChange(event) {
    const errors = { ...this.state.errors };
    const errorMessage = getErrorMessage(event.currentTarget, this.schema);
    if (errorMessage) {
      errors[event.currentTarget.name] = errorMessage;
    } else {
      delete errors[event.currentTarget.name];
    }

    const meal = { ...this.state.meal };
    meal[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ meal, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = validateStateObject(this.state.meal, this.schema);
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.setState({ errors: {} })

    try {
      await saveMeal({ ...this.state.meal });
      this.props.history.push('/meals/index');
    } catch (exception) {
      if (exception.response && exception.response.status === 400) {
        alert(exception);
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="card bg-light">
          <div className="card-body">
            <h5>New Meal</h5>
            <div className="form-group">
              <label htmlFor="inlineFormInputName">Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="inlineFormInputName"
                value={this.state.meal.name}
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
                value={this.state.meal.description}
                onChange={this.handleChange}
              />
              {this.state.errors.description &&
                <div className="alert alert-danger">
                  {this.state.errors.description}
                </div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default MealNew;
