import { lectureLinkAxios } from './axiosConfig.ts';

const AuthService = {
  signIn: async (payload: {
    email: string;
    password: string;
  }): Promise<string> => {
    const { data } = await lectureLinkAxios.post('/login', payload);
    return data;
  }
};

export default AuthService;
