import { lectureLinkAxios } from './axiosConfig.ts';
import { InstituteRes } from '../types/instituteTypes/instituteRes.ts';

const InstituteService = {
  getAllInstitutes: async (_key: string): Promise<InstituteRes[]> => {
    const { data } = await lectureLinkAxios.get(`/institutes`);
    return data;
  },

  getInstituteById: async (payload: {
    instituteId: number;
  }): Promise<InstituteRes> => {
    const { data } = await lectureLinkAxios.get(
      `/institutes/${payload.instituteId}`,
    );
    return data;
  },

  getInstitutesForLecturer: async (
    _key: string,
    payload: { lecturerId: string },
  ): Promise<InstituteRes[]> => {
    const { data } = await lectureLinkAxios.get(
      `/institutes/lecturer/${payload.lecturerId}`,
    );
    return data;
  },

  getFilteredInstitutes: async (payload: {
    district?: string;
    status?: string;
    size?: string;
    page?: number;
    sort?: string;
  }): Promise<{ institutes: InstituteRes[]; total: number }> => {
    const params = new URLSearchParams();

    if (payload.district) params.append('district', payload.district);
    if (payload.status) params.append('status', payload.status);
    if (payload.size) params.append('size', payload.size);
    if (payload.page !== undefined)
      params.append('page', payload.page.toString());
    if (payload.sort) params.append('sort', payload.sort);

    const { data } = await lectureLinkAxios.get(`/institutes/filter`, {
      params,
    });
    return data;
  },

  createInstitute: async (payload: {
    instituteConfig: FormData;
  }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.post(
      `/register/institute`,
      payload.instituteConfig,
    );
    return data;
  },

  updateInstitute: async (payload: {
    instituteId: string;
    instituteConfig: FormData;
  }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.patch(
      `/institutes/${payload.instituteId}`,
      payload.instituteConfig,
    );
    return data;
  },

  deleteInstituteById: async (payload: {
    instituteId: number;
  }): Promise<unknown> => {
    const { data } = await lectureLinkAxios.delete(
      `/institutes/${payload.instituteId}`,
    );
    return data;
  },
};

export default InstituteService;
