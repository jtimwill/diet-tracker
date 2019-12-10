import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DayBody = ({ day, current_day, onMealDelete, index }) => {
  const btn = "btn-sm btn btn-";
  const fa = "fa fa-";

  function getCSSClass(day, current_meal) {
    return day === current_day ? "custom-show" : "custom-hide-2"
  }

  function formatInfo(meal) {
    let total_calories = 0;
    let total_carbs = 0;
    let total_fat = 0;
    let total_protein = 0;
    for (let mi of meal.meal_ingredients) {
      total_calories += mi.ingredientId.calories*mi.servings;
      total_carbs += mi.ingredientId.carbohydrates*mi.servings;
      total_fat += mi.ingredientId.fat*mi.servings;
      total_protein += mi.ingredientId.protein*mi.servings;
    }
    return `| Calories: ${total_calories.toFixed(2)}
            | Carbs: ${total_carbs.toFixed(2)}
            | Fat: ${total_fat.toFixed(2)}
            | Protein: ${total_protein.toFixed(2)}
            `;
  }

  return (
    <div>
      {day.map(meal => (
        <div key={meal.id} className={getCSSClass(day, current_day)}>
          <div className="card-body">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div>
              <Link to={`/meals/${meal.id}/show`} className="font-weight-bold">
                {meal.name} -- </Link>
                {formatInfo(meal)}
              </div>
              <div>
                <Link to={`/meals/${meal.id}/edit`} className={`${btn}info m-2`}>
                  <i className={`${fa}pencil-square-o`}></i>
                </Link>
                <button onClick={() => onMealDelete(meal)} className={`${btn}danger`}>
                  <i className={`${fa}trash`}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

DayBody.propTypes = {
  day: PropTypes.array.isRequired,
  current_day: PropTypes.array.isRequired,
  onMealDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default DayBody;
