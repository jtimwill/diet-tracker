import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getMeal } from '../../services/mealService.js';
import { deleteMealIngredient } from '../../services/mealIngredientService.js';
import { getIngredients } from '../../services/ingredientService.js';
import { reformatDate } from '../../utilities/dateUtility.js';
import { getDiet } from '../../services/dietService.js';
import { getUser } from '../../services/userService.js';
import Pagination from '../reusable/pagination';
import Spinner from '../reusable/spinner';
import { Pie } from 'react-chartjs-2';

class MealShow extends Component {
  state = {
    diet: {},
    meal: {
      meal_ingredients: [],
    },
    totals: {
      calories: 0,
      carbohydrates: 0,
      fat: 0,
      protein: 0
    },
    current_page: 1,
    api_response: false,
  };

  async componentDidMount() {
    const { data: user } = await getUser();
    const { data: diet } = await getDiet(user.dietId);
    const ingredientFinder = {};
    const { data: ingredients } = await getIngredients();

    for (let ingredient of ingredients) {
      ingredientFinder[ingredient.id] = ingredient;
    }

    try {
      const { data: meal } = await getMeal(this.props.match.params.id);
      meal.date = reformatDate(meal.createdAt);
      for (let ingredient of meal.meal_ingredients) {
        ingredient.ingredientId = ingredientFinder[ingredient.ingredientId];
      }

      const totals = this.setTotalCalories(meal);
      this.setState({ diet, meal, totals, api_response: true });
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        console.log(exception);
        this.props.history.replace("/not-found");
      }
    }
  }

  setTotalCalories(meal) {
    let total_calories = 0;
    let total_carbohydrates = 0;
    let total_protein = 0;
    let total_fat = 0;

    for (let mi of meal.meal_ingredients) {
      total_calories += mi.ingredientId.calories*mi.servings;
      total_carbohydrates += mi.ingredientId.carbohydrates*mi.servings;
      total_protein += mi.ingredientId.protein*mi.servings;
      total_fat += mi.ingredientId.fat*mi.servings;
    }

    const totals = {
      calories: total_calories,
      carbohydrates: total_carbohydrates,
      protein: total_protein,
      fat: total_fat,
    };

    return totals;
  }

  handlePageChange = (page_number, page_size) => {
    const length = this.state.meal.meal_ingredients.length;
    const number_of_pages = Math.ceil(length / page_size);
    if (page_number <= 0 ||  page_number > number_of_pages) {
      return;
    }
    this.setState({ current_page: page_number });
  };

  generatePage(page, page_size) {
    let meal_ingredients = [ ...this.state.meal.meal_ingredients ];
    const start_index = (page-1)*page_size;
    const end_index = start_index + page_size;
    const meal_ingredient_slice = meal_ingredients.slice(start_index,end_index);
    return meal_ingredient_slice;
  }

  handleMealIngredientDelete = async (selected_meal_ingredient) => {
    if (!this.confirmDelete("meal ingredient")) { return; }
    const old_meal_ingredients = this.state.meal.meal_ingredients;
    const new_meal_ingredients = old_meal_ingredients.filter(me => me.id !== selected_meal_ingredient.id);
    const meal = { ...this.state.meals };

    meal.meal_ingredients = new_meal_ingredients;
    this.setState({ meal , totals: this.setTotalCalories(meal) });

    try {
      await deleteMealIngredient(selected_meal_ingredient.mealId, selected_meal_ingredient.id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This meal ingredient has already been deleted.");
      }
      meal.meal_ingredients = old_meal_ingredients;
      this.setState({ meal, totals: this.setTotalCalories(meal) });
    }
  }

  confirmDelete(name) {
    return window.confirm(`Are you sure you want to delete this ${name}?`);
  }

  render() {
    const page_size = 5;
    const { current_page, meal, totals, diet } = this.state;
    return (
      <Spinner ready={this.state.api_response}>
        <div className="custom-max-width">
          <div className="card my-2">
            <div className="card-header bg-light">
              <h5 className="card-title">{meal.name} {meal.date}</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <span className="card-text font-weight-bold">Your Macro Calories</span>
                  <Pie data={{
                  	labels: ['Carbs', 'Fat', 'Protein'],
                  	datasets: [{
                      data: [totals.carbohydrates*4, totals.fat*9, totals.protein*4],
                      backgroundColor: ['RoyalBlue', 'Crimson', 'SeaGreen'],
                      hoverBackgroundColor: ['RoyalBlue','Crimson','SeaGreen']
                    }]
                  }} />
                </div>
                <div className="col-sm-6">
                  <span className="card-text font-weight-bold">Target Macro Calories</span>
                  <Pie data={{
                    labels: ['Carbs', 'Fat', 'Protein'],
                    datasets: [{
                      data: [diet.carbohydrates, diet.fat, diet.protein],
                      backgroundColor: ['RoyalBlue', 'Crimson', 'SeaGreen'],
                      hoverBackgroundColor: ['RoyalBlue','Crimson','SeaGreen']
                    }]
                  }} />
                </div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="card-text font-weight-bold"> Total Calories: </span>
                {totals.calories.toFixed(2)}
                <span className="card-text font-weight-bold"> | Total Carbs: </span>
                {totals.carbohydrates.toFixed(2)}
                <span className="card-text font-weight-bold"> | Total Fat: </span>
                {totals.fat.toFixed(2)}
                <span className="card-text font-weight-bold"> | Total Protein: </span>
                {totals.protein.toFixed(2)}
              </li>
            </ul>
            <div className="card-body">
              <Link to={`meal-ingredients/new`}
                className="btn btn-lg btn-primary btn-sm">
                Add Ingredient
              </Link>
            </div>
          </div>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col" >#</th>
                <th scope="col">Name</th>
                <th scope="col">Servings</th>
                <th scope="col">Calories</th>
                <th scope="col">Carbs</th>
                <th scope="col">Fat</th>
                <th scope="col">Protein</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.generatePage(current_page, page_size).map((meal_ingredient, index) => (
                <tr key={meal_ingredient.id} className="custom-hover">
                  <th scope="row">{index}</th>
                  <td>{meal_ingredient.ingredientId.name}</td>
                  <td>{meal_ingredient.servings}</td>
                  <td>{meal_ingredient.ingredientId.calories}</td>
                  <td>{meal_ingredient.ingredientId.carbohydrates}</td>
                  <td>{meal_ingredient.ingredientId.fat}</td>
                  <td>{meal_ingredient.ingredientId.protein}</td>
                  <td>
                    <Link
                      to={`meal-ingredients/${meal_ingredient.id}/edit`}
                      className="btn btn-info btn-sm">
                      <i className={`fa fa-pencil-square-o`}></i>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleMealIngredientDelete(meal_ingredient)}
                      className="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            page_size={page_size}
            item_count={meal.meal_ingredients.length}
            current_page={current_page}
            onPageChange={this.handlePageChange}
          />
        </div>
      </Spinner>
    );
  }
}

export default MealShow;
