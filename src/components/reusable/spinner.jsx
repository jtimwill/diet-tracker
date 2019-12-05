import React from 'react';
import './spinner.css';
import PropTypes from 'prop-types';

const Spinner = (props) => {
  return props.ready ? <div>{props.children}</div> : <div className="spinner"/>;
};

Spinner.propTypes = {
  ready: PropTypes.bool.isRequired
};

export default Spinner;
