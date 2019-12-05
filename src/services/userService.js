import http from './httpService';

export function getUsers() {
  return http.get("/users");
};

export function getUser() {
  return http.get("/users/me");
};

export function saveUser(user) {
  const obj = {
    username: user.username,
    email: user.email,
    password: user.password,
    calories: user.calories,
    dietId: user.dietId
  };
  return http.post("/users", obj);
};

export function deleteUser(user_id) {
  return http.delete(`/users/${user_id}`);
};

export function updateUser(user) {
  const obj = {
    username: user.username,
    email: user.email,
    calories: user.calories,
    dietId: user.dietId
  };
  return http.put("/users/me", obj);
};
