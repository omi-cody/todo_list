import axios from 'axios';

// Creating backend config
const Api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const url = 'http://localhost:5000';

export const addToDoApi = (data) => Api.post('/api/todo/add', data);
