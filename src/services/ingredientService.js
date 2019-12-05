import http from './httpService';

export function getIngredients() {
  return http.get("/ingredients");
};

export function getIngredient(ingredient_id) {
  return http.get(`/ingredients/${ingredient_id}`);
};

export function saveIngredient(ingredient_object) {
  return http.post("/ingredients", ingredient_object);
};

export function deleteIngredient(ingredient_id) {
  return http.delete(`/ingredients/${ingredient_id}`);
};

export function updateIngredient(ingredient_id, ingredient_object) {
  return http.put(`/ingredients/${ingredient_id}`, ingredient_object);
};
