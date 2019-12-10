import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getMeals, deleteMeal } from '../../services/mealService.js';
import { getIngredients } from '../../services/ingredientService.js';
import { compareDates } from '../../utilities/sortUtility.js';
import { reformatDate } from '../../utilities/dateUtility.js';
import { getUser } from '../../services/userService.js';
import './meal.css';
import Pagination from '../reusable/pagination';
import Spinner from '../reusable/spinner';
import DayHead from './dayHead'
import DayBody from './dayBody';
import { Line } from 'react-chartjs-2';

class MealIndex extends Component {
  state = {
    user: {},
    days: [],
    meals: [],
    current_page: 1,
    sort_direction: "desc",
    current_day: [],
    ingredients: [],
    api_response: false,
  };

  chart_data = {
    labels: [],
    datasets: [
      {
        label: 'Daily Calories',
        fill: false,
        lineTension: 0.2,
        backgroundColor: 'rgb(0,123,255,0.2)',
        borderColor: 'rgb(0,123,255,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(0,123,255,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 3,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(0,123,255,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: []
      },
      {
        label: 'Target Calories',
        fill: true,
        lineTension: 0.2,
        backgroundColor: 'rgb(23,162,184,0.2)',
        borderColor: 'rgb(23,162,184,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(23,162,184,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 3,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(23,162,184,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: []
      }
    ]
  };

  async componentDidMount() {
    const { data } = await getUser();
    const user = {
      username: data.username,
      email: data.email,
      calories: data.calories
    };
    const ingredientFinder = {};
    const { data: ingredients } = await getIngredients();
    for (let ingredient of ingredients) {
      ingredientFinder[ingredient.id] = ingredient;
    }
    const { data: meals } = await getMeals();
    meals.sort(compareDates);
    meals.forEach((meal) => {
      meal.date = reformatDate(meal.createdAt);
      for (let ingredient of meal.meal_ingredients) {
        ingredient.ingredientId = ingredientFinder[ingredient.ingredientId];
      }
    });

    this.setState({ meals });
    const days = this.createDays(meals);

    days.forEach((day) => {
      this.chart_data.labels.push(day[0].date);
      this.chart_data.datasets[0].data.push(this.getTotalCalories(day));
      this.chart_data.datasets[1].data.push(user.calories);
    });
    this.chart_data.datasets[0].data.reverse();

    this.setState({ user, days, ingredients, api_response: true });
  }

  createDays(meals){ 
    const days = {};
    for (let meal of meals) {
      if (days[meal.date]) {
        days[meal.date].push(meal);
      } else {
        days[meal.date] = [meal];
      }
    }
    const days_array = [];
    for (let day in days) {
      days_array.push(days[day]);
    }
    return days_array;
  }

  getTotalCalories(day) {
    let total_calories = 0;

    for (let meals of day) {
      for (let mi of meals.meal_ingredients) {
        total_calories += mi.ingredientId.calories*mi.servings;
      }
    }
    return total_calories;
  }

  confirmDelete(name) {
    return window.confirm(`Are you sure you want to delete this ${name}?`);
  }

  handleMealDelete = async selected_meal => {
    if (!this.confirmDelete("meal")) { return; }
    const old_meals = this.state.meals;
    const new_meals = old_meals.filter(m => m.id !== selected_meal.id);

    this.setState({ meals: new_meals });
    const days = this.createDays(new_meals);
    this.setState({ days });

    try {
      await deleteMeal(selected_meal.id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This meal has already been deleted.");
      }
      this.setState({ meals: old_meals });
      const days = this.createDays(old_meals);
      this.setState({ days });
    }
  };

  handlePageChange = (page_number, page_size) => {
    const length = this.state.days.length;
    const number_of_pages = Math.ceil(length / page_size);
    if (page_number <= 0 ||  page_number > number_of_pages) {
      return;
    }
    this.setState({ current_page: page_number });
  };

  toggleSort = () => {
    const old_direction = this.state.sort_direction;
    const days = [ ...this.state.days ];
    days.reverse();
    let sort_direction;
    sort_direction = old_direction === "desc" ? "asc" : "desc";

    this.setState({ days, sort_direction });
  }

  generatePage(page, page_size) {
    const days = [ ...this.state.days ];
    const start_index = (page-1)*page_size;
    const end_index = start_index + page_size;
    const day_slice = days.slice(start_index,end_index);
    return day_slice;
  }

  handleDaySelect = day => {
    if (day === this.state.current_day) day = [];
    this.setState({ current_day: day });
  }

  render() {
    const page_size = 5;
    const { user,
            sort_direction,
            current_page,
            current_day,
            days
          } = this.state;

    return (
      <Spinner ready={this.state.api_response}>
      <div className="custom-max-width">
        <div className="card my-2">
          <div className="card-header bg-light">
            <h5 className="card-title">Your Diet</h5>
          </div>
          <div className="card-body">
            <Line data={this.chart_data}/>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-around">
              <span className="card-text">
                <span className="font-weight-bold">Days Tracked: </span>{days.length}
              </span>
              <span className="card-text">
                <span className="font-weight-bold">Target Calories: </span>{user.calories}
              </span>
            </li>
          </ul>
          <div className="card-body">
            <Link to="/meals/new" className="btn btn-primary mr-1">
              New Meal
            </Link>
            <button onClick={this.toggleSort} className="btn btn-info">
              {"Sort by date "}
              <i className={"fa fa-sort-" + sort_direction}></i>
            </button>
          </div>
        </div>


        {this.generatePage(current_page, page_size).map((day, index) => (
          <div
            key={index}
            className={"my-1 card " + (day === current_day ? "border-primary" : "")}
          >
            <DayHead
              day={day}
              onDaySelect={this.handleDaySelect}
              total_calories={this.getTotalCalories(day)}
            />
            <DayBody
              day={day}
              current_day={current_day}
              onMealDelete={this.handleMealDelete}
              index={index}
            />
          </div>
        ))}

        <Pagination
          page_size={page_size}
          item_count={days.length}
          current_page={current_page}
          onPageChange={this.handlePageChange}
        />
        </div>
      </Spinner>
    );
  }
}

export default MealIndex;
