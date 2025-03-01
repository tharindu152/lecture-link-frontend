import axios from 'axios';

// @ts-ignore
export const lectureLinkAxios = axios.create({
  baseURL: import.meta
    // @ts-ignore
    .env.VITE_API_BASE_URL,
  headers: {
    'Role': localStorage.getItem('role'),
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
});
