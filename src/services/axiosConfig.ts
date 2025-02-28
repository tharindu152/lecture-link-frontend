import axios from 'axios';
import { Role } from '../types/enums/role.ts';

// @ts-ignore
export const lectureLinkAxios = axios.create({
  baseURL: import.meta
    // @ts-ignore
    .env.VITE_API_BASE_URL,
  headers: {
    'Role': Role.LECTURER,
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
});
