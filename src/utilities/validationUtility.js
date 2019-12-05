import Joi from 'joi-browser';

export function getErrorMessage({ name, value }, schema) {
  const { error } = Joi.validate({ [name]: value }, { [name]: schema[name] });
  return error ? error.details[0].message : '';
}


export function validateStateObject(state_obj, schema) {
  const found_errors = {};
  const { error: errors } = Joi.validate(state_obj, schema, { abortEarly: false });
  if (!errors) return '';
  for (let error of errors.details) {
    found_errors[error.path[0]] = error.message;
  }
  return found_errors;
}
