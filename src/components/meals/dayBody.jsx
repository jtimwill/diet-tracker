import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MealBody = ({ meal, current_meal, onMealDelete, index }) => {
  const btn = "btn-sm btn btn-";
  const fa = "fa fa-";
  const url_prefix = `/meals/${meal.id}`;

  function getCSSClass(meal, current_meal) {
    return meal === current_meal ? "custom-show" : "custom-hide-2"
  }

  function formatInfo(me) {
    return `Ingredient: ${me.ingredientId} Servings: ${me.servings}`;
  }

  return (
    <div>
      {meal.meal_ingredients.map(meal_ingredient => (
        <div key={meal_ingredient.id} className={getCSSClass(meal, current_meal)}>
          <div className="card-body">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="w-50">{formatInfo(meal_ingredient)}</div>
              <div>
                <Link
                  to={`${url_prefix}/meal-ingredients/${meal_ingredient.id}/edit`}
                  className={`${btn}info mx-1`}
                >
                  <i className={`${fa}pencil-square-o`}></i>
                </Link>
                <button
                  className={`${btn}danger`}
                  onClick={() => onMealDelete(index, meal_ingredient)}
                >
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

MealBody.propTypes = {
  meal: PropTypes.object.isRequired,
  current_meal: PropTypes.object.isRequired,
  onMealDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default MealBody;
