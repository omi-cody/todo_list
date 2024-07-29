import axios from 'axios';

// Creating backend config
const Api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};
export const url = 'http://localhost:5000';

// =================================== TO DO API =================================
export const addToDoApi = (data) =>
  Api.post('/api/todo/todo/add', data, config);
export const getToDosApi = () => Api.get('/api/todo/todo/get', config);

// ================================ USER API =================================
export const loginUserApi = (data) => Api.post('/api/user/login', data);
export const registerUserApi = (data) => Api.post('/api/user/create', data);
