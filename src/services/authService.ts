import { lectureLinkAxios } from './axiosConfig.ts';

const AuthService = {
  signIn: async (payload: {
    email: string;
    password: string;
  }): Promise<{ id:string; role:string; token:string }> => {
    const { data } = await lectureLinkAxios.post('/login', payload);
    return data;
  },

  createCheckoutSession: async (payload: {
    priceId: string;
  }): Promise<{ sessionId: string }> => {
    const { data } = await lectureLinkAxios.post(`/stripe/create-checkout-session`, {
      priceId: payload.priceId,
    });
    return data;
  },
};

export default AuthService;
