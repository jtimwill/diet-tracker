import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { reformatDate } from '../../utilities/dateUtility.js';

const MealHead = ({ meal, onMealSelect }) => {
  const btn = "btn btn-";
  const fa = "fa fa-";
  const url_prefix = `/meals/${meal.id}`;
  return (
    <div
      className="card-header custom-hover-cursor"
      onClick={() => onMealSelect(meal)}>
      <div className="">
        <span className="font-weight-bold">{reformatDate(meal.createdAt)} </span>
        <span className="badge badge-pill badge-primary">
          Meals: {meal.meal_ingredients.length}
        </span>
        <div className="float-right">
          <Link to={`${url_prefix}/edit`} className={`${btn}info`}>
            <i className={`${fa}pencil-square-o`}></i>
          </Link>
          <Link to={`${url_prefix}/meal-ingredients/new`} className={`${btn}success mx-1`}>
            <i className={`${fa}plus`}></i>
          </Link>
          <button onClick={() => onMealDelete(meal)} className={`${btn}danger`}>
            <i className={`${fa}trash`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

MealHead.propTypes = {
  meal: PropTypes.object.isRequired,
  onDaySelect: PropTypes.func.isRequired,
};

export default MealHead;
