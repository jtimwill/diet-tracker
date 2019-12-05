import React from 'react';
import PropTypes from 'prop-types';

const DayHead = ({ day, onDaySelect, total_calories }) => {
  return (
    <div
      className="card-header custom-hover-cursor"
      onClick={() => onDaySelect(day)}>
      <div className="">
        <span className="font-weight-bold">{day[0].date} </span>
        <span className="badge badge-pill badge-primary">
          Meals: {day.length}
        </span>
        <span className="badge badge-pill badge-info">
          Calories: {total_calories.toFixed(2)}
        </span>
        <div className="float-right">
        </div>
      </div>
    </div>
  );
};

DayHead.propTypes = {
  day: PropTypes.array.isRequired,
  onDaySelect: PropTypes.func.isRequired,
  total_calories: PropTypes.number.isRequired
};

export default DayHead;
