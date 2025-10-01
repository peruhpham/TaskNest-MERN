import axios from "axios";
// const API = "http://localhost:5000/api/todos";
const API = "https://unwishful-asher-unafflicted.ngrok-free.dev";

export const getTodos = (params) => axios.get(API, { params });
export const addTodo = (todo) => axios.post(API, todo);
export const updateTodo = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteTodo = (id) => axios.delete(`${API}/${id}`);
export const getStats = () => axios.get(`${API}/stats`);