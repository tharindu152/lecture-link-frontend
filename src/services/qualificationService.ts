import { lectureLinkAxios } from './axiosConfig.ts';
import { Qualification } from '../types/lecturerTypes/qualification.ts';

const QualificationService = {
  createQualification: async (payload: {
    qualificationData: Qualification;
  }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.post(`/qualifications`, payload.qualificationData);
    return data;
  },

  getQualificationById: async (payload: { qualificationId: string }): Promise<Qualification> => {
    const { data } = await lectureLinkAxios.get(`/qualifications/${payload.qualificationId}`);
    return data;
  },

  getAllQualifications: async (): Promise<Qualification[]> => {
    const { data } = await lectureLinkAxios.get(`/qualifications`);
    return data;
  },

  getFilteredQualifications: async (payload: {
    name?: string;
    awardingBody?: string;
    durationInDays?: number;
    discipline?: string;
    level?: string;
    size?: number;
    page?: number;
    sort?: string;
  }): Promise<{ qualifications: Qualification[]; total: number }> => {
    const params = new URLSearchParams();

    if (payload.name) params.append("name", payload.name);
    if (payload.awardingBody) params.append("awardingBody", payload.awardingBody);
    if (payload.durationInDays) params.append("durationInDays", payload.durationInDays.toString());
    if (payload.discipline) params.append("discipline", payload.discipline);
    if (payload.level) params.append("level", payload.level);
    if (payload.size !== undefined) params.append("size", payload.size.toString());
    if (payload.page !== undefined) params.append("page", payload.page.toString());
    if (payload.sort) params.append("sort", payload.sort);

    const { data } = await lectureLinkAxios.get(`/qualifications/filter`, { params });
    return data;
  },

  updateQualification: async (payload: {
    qualificationId: number | undefined;
    qualificationData: Qualification;
  }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.patch(`/qualifications/${payload.qualificationId}`, payload.qualificationData);
    return data;
  },

  deleteQualificationById: async (payload: { qualificationId: number }): Promise<{ success: boolean; message?: string }> => {
    const { data } = await lectureLinkAxios.delete(`/qualifications/${payload.qualificationId}`);
    return data;
  },
};

export default QualificationService;
