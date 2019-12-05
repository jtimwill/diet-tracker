import http from './httpService';

export function deleteMealIngredient(meal_id, meal_ingredient_id) {
  const path = `/meals/${meal_id}/meal-ingredients/${meal_ingredient_id}`;
  return http.delete(path);
};

export function updateMealIngredient(meal_ingredient_id, meal_ingredient_object) {
  const path = `/meals/${meal_ingredient_object.mealId}/meal-ingredients/${meal_ingredient_id}`;
  return http.put(path, meal_ingredient_object);
};

export function saveMealIngredient(meal_ingredient_object) {
  return http.post(`/meals/${meal_ingredient_object.mealId}/meal-ingredients`, meal_ingredient_object);
};

export function getMealIngredient(meal_id, meal_ingredient_id) {
  const path = `/meals/${meal_id}/meal-ingredients/${meal_ingredient_id}`;
  return http.get(path);
};
