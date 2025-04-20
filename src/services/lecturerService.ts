import { lectureLinkAxios } from './axiosConfig.ts';
import { LecturerRes } from '../types/lecturerTypes/lecturerRes.ts';
import { Lecturer } from '../types/lecturerTypes/lecturer.ts';
import { FilteredLecturersRes } from '../types/lecturerTypes/filteredLecturersRes.ts';

const LecturerService = {
  getAllLecturers: async (): Promise<LecturerRes[]> => {
    const { data } = await lectureLinkAxios.get(`/lecturers`);
    return data;
  },

  getLecturerById: async (payload: { lecturerId: string | number | undefined }): Promise<LecturerRes> => {
    const { data } = await lectureLinkAxios.get(`/lecturers/${payload.lecturerId}`);
    return data;
  },

  createLecturer: async (payload: {
    lecturerConfig: FormData;
  }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.post(`/register/lecturer`, payload.lecturerConfig);
    return data;
  },

  updateLecturerMultipart: async (payload: { lecturerId: number | undefined; lecturerConfig: FormData }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.patch(`/lecturers/${payload.lecturerId}`, payload.lecturerConfig);
    return data;
  },

  updateLecturerJson: async (payload: { lecturerId: number | undefined; lecturerConfig: Lecturer }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.patch(`/lecturers/${payload.lecturerId}`, payload.lecturerConfig);
    return data;
  },

  getLecturersForInstitute: async (payload: { instituteId: number | undefined }): Promise<LecturerRes[]> => {
    const { data } = await lectureLinkAxios.get(`/lecturers/institutes/${payload.instituteId}`);
    return data;
  },

  getFilteredLecturers: async (payload: {
    division?: string;
    hourlyRate?: string;
    qualification?: string;
    isAssigned?: boolean;
    language?: string;
    globalSearch?: string;
    size?: number;
    page?: number;
    sort?: string;
  }): Promise<FilteredLecturersRes> => {
    const params = new URLSearchParams();

    if (payload.division) params.append('division', payload.division);
    if (payload.hourlyRate !== undefined) params.append('paymentLower', payload.hourlyRate.split("-")[0].toString());
    if (payload.hourlyRate !== undefined) params.append('paymentUpper', payload.hourlyRate.split("-")[1].toString());
    if (payload.qualification) params.append('qualification', payload.qualification);
    if (payload.isAssigned !== undefined) params.append('isAssigned', payload.isAssigned.toString());
    if (payload.language) params.append('language', payload.language);
    if (payload.globalSearch) params.append('globalSearch', payload.globalSearch);
    if (payload.size !== undefined) params.append('size', payload.size.toString());
    if (payload.page !== undefined) params.append('page', payload.page.toString());
    if (payload.sort) params.append('sort', payload.sort);

    const { data } = await lectureLinkAxios.get<FilteredLecturersRes>(`/lecturers/filter`, { params });

    return data;
  },

  deleteLecturerById: async (payload: { lecturerId: number }): Promise<{ success: boolean; message?: string }> => {
    const { data } = await lectureLinkAxios.delete(`/lecturers/${payload.lecturerId}`);
    return data;
  },

  updateLecturerRating: async (payload: { lecturerId: number; newRating: FormData }): Promise<unknown> => {
    const { data } = await lectureLinkAxios.patch(`/lecturers/${payload.lecturerId}/rating`, payload.newRating);
    return data;
  },

  deactivateLecturer: async (payload: {
    lecturerId: number | undefined;
  }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.patch(
      `/lecturers/${payload.lecturerId}/deactivate`
    );
    return data;
  },

  subscribeLecturer: async (payload: { lecturerId: string | null; subscribed: FormData }): Promise<unknown> => {
    const { data } = await lectureLinkAxios.patch(`/lecturers/${payload.lecturerId}/subscribe`, payload.subscribed);
    return data;
  },

  updateLecturerIsAssigned: async (payload: { lecturerId: string | number | undefined; isAssigned: FormData }): Promise<unknown> => {
    const { data } = await lectureLinkAxios.patch(`/lecturers/${payload.lecturerId}/assign`, payload.isAssigned);
    return data;
  },
};

export default LecturerService;
