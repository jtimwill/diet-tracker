import http from './httpService';

export function getDiets() {
  return http.get("/diets");
};

export function getDiet(diet_id) {
  return http.get(`/diets/${diet_id}`);
};

export function saveDiet(diet_object) {
  return http.post("/diets", diet_object);
};

export function deleteDiet(diet_id) {
  return http.delete(`/diets/${diet_id}`);
};

export function updateDiet(diet_id, diet_object) {
  return http.put(`/diets/${diet_id}`, diet_object);
};
