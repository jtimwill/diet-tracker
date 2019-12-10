import React, { Component } from 'react';
import Joi from 'joi-browser';
import { updateMeal, getMeal } from '../../services/mealService.js';
import Spinner from '../reusable/spinner';
import { validateStateObject, updateErrorObject } from '../../utilities/validationUtility.js';

class MealEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: {
        name: "",
        description: "",
      },
      errors: {},
      api_response: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    name: Joi.string().required().min(3).label('Name'),
    description: Joi.string().label('Description'),
  };

  async componentDidMount() {
    const meal_id = this.props.match.params.id;
    try {
      const { data } = await getMeal(meal_id);
      const meal = { name: data.name, description: data.description };
      this.setState({ meal , api_response: true });
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  handleChange(event) {
    const errors = { ...this.state.errors };
    updateErrorObject(event, errors, this.schema);

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
      await updateMeal(this.props.match.params.id, this.state.meal);
      this.props.history.push('/meals/index');
    } catch (exception) {
      if (exception.response && exception.response.status === 400) {
        alert(exception.response.data.errmsg);
      }
    }
  }

  render() {
    return (
      <Spinner ready={this.state.api_response}>
        <form onSubmit={this.handleSubmit} className="card bg-light">
          <div className="card-body">
            <h5>Edit Meal</h5>
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
      </Spinner>
    );
  }
}

export default MealEdit;
