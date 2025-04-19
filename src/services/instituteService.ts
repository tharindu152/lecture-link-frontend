import { lectureLinkAxios } from './axiosConfig.ts';
import { InstituteRes } from '../types/instituteTypes/instituteRes.ts';
import { Institute } from '../types/instituteTypes/institute.ts';

const InstituteService = {
  getAllInstitutes: async (_key: string): Promise<InstituteRes[]> => {
    const { data } = await lectureLinkAxios.get(`/institutes`);
    return data;
  },

  getInstituteById: async (payload: {
    instituteId: number | string;
  }): Promise<InstituteRes> => {
    const { data } = await lectureLinkAxios.get(
      `/institutes/${payload.instituteId}`,
    );
    return data;
  },

  getInstitutesForLecturer: async (
    _key: string,
    payload: { lecturerId: string | number | undefined},
  ): Promise<InstituteRes[]> => {
    const { data } = await lectureLinkAxios.get(
      `/institutes/lecturer/${payload.lecturerId}`,
    );
    return data;
  },

  getFilteredInstitutes: async (payload: {
    division?: string;
    status?: string;
    size?: string;
    page?: number;
    sort?: string;
  }): Promise<{ institutes: InstituteRes[]; total: number }> => {
    const params = new URLSearchParams();

    if (payload.division) params.append('division', payload.division);
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

  updateInstituteMultipart: async (payload: {
    instituteId: number | undefined;
    instituteConfig: FormData;
  }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.patch(
      `/institutes/${payload.instituteId}`,
      payload.instituteConfig,
    );
    return data;
  },

  updateInstituteJson: async (payload: {
    instituteId: number | undefined;
    instituteConfig: Institute;
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

  deactivateInstitute: async (payload: {
    instituteId: number | undefined;
  }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.patch(
      `/institutes/${payload.instituteId}/deactivate`,
    );
    return data;
  },

  updateInstituteRating: async (payload: { instituteId: number; newRating: FormData }): Promise<unknown> => {
    const { data } = await lectureLinkAxios.patch(`/institutes/${payload.instituteId}/rating`, payload.newRating);
    return data;
  },

  subscribeInstitute: async (payload: { instituteId: string | null; subscribed: FormData }): Promise<unknown> => {
    const { data } = await lectureLinkAxios.patch(`/institutes/${payload.instituteId}/subscribe`, payload.subscribed);
    return data;
  },

  getInstituteEmailBySubjectId: async (subjectId: number | string | undefined): Promise<string> => {
    const { data } = await lectureLinkAxios.get(`/institutes/email-by-subject/${subjectId}`);
    return data;
  }

};

export default InstituteService;
