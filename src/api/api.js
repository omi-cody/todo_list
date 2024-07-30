import axios from 'axios';

// Creating backend config
const Api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get token from localStorage
const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// =================================== TO DO API =================================
export const addToDoApi = (data) =>
  Api.post('/api/todo/todo/add', data, getAuthConfig());

export const getToDosApi = () =>
  Api.get('/api/todo/todo/get', getAuthConfig());

export const updateToDoApi = (id, data) =>
  Api.put(`/api/todo/todo/edit/${id}`, data, getAuthConfig());

export const deleteToDoApi = (id) =>
  Api.delete(`/api/todo/todo/delete/${id}`, getAuthConfig());

export const updateStatusApi = (id,status) =>
  Api.put(`/api/todo/todo/status/${id}`, status, getAuthConfig()); // No body needed for status update

// ================================ USER API =================================
export const loginUserApi = (data) => Api.post('/api/user/login', data);

export const registerUserApi = (data) => Api.post('/api/user/create', data);
