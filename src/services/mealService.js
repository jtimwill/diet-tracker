import http from './httpService';

export function getMeals() {
  return http.get("/meals");
};

export function getMeal(meal_id) {
  return http.get(`/meals/${meal_id}`);
};

export function saveMeal(meal_object) {
  return http.post("/meals", meal_object);
};

export function deleteMeal(meal_id) {
  return http.delete(`/meals/${meal_id}`);
};

export function updateMeal(meal_id, meal_object) {
  return http.put(`/meals/${meal_id}`, meal_object);
};
