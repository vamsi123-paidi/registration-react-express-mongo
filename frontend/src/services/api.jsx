import axios from 'axios';

const api = axios.create({
  baseURL: '/api', 
});

export const submitForm = (data) => api.post('/form/submit', data);

export default api;
