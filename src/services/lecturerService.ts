import { lectureLinkAxios } from './axiosConfig.ts';
import { LecturerRes } from '../types/lecturerRes.ts';
import { Lecturer } from '../types/lecturer.ts';
import { FilteredLecturersResponse } from '../types/filteredLecturersResponse.ts';

const LecturerService = {
  getAllLecturers: async (): Promise<LecturerRes[]> => {
    const { data } = await lectureLinkAxios.get(`/lecturers`);
    return data;
  },

  getLecturerById: async (payload: { lecturerId: string }): Promise<LecturerRes> => {
    const { data } = await lectureLinkAxios.get(`/lecturers/${payload.lecturerId}`);
    return data;
  },

  createLecturer: async (payload: {
    lecturerConfig: FormData;
  }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.post(`/lecturers`, payload.lecturerConfig);
    return data;
  },

  updateLecturerMultipart: async (payload: { lecturerId: number; lecturerData: FormData }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.patch(`/lecturers/${payload.lecturerId}`, payload.lecturerData);
    return data;
  },

  updateLecturerJson: async (payload: { lecturerId: number; lecturerData: Partial<Lecturer> }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.patch(`/lecturers/${payload.lecturerId}`, payload.lecturerData);
    return data;
  },

  getLecturersForInstitute: async (payload: { instituteId: number }): Promise<LecturerRes[]> => {
    const { data } = await lectureLinkAxios.get(`/lecturers/institutes/${payload.instituteId}`);
    return data;
  },

  getFilteredLecturers: async (payload: {
    district?: string;
    hourlyRate?: string;
    qualification?: string;
    isAssigned?: boolean;
    languages?: string;
    size?: number;
    page?: number;
    sort?: string;
  }): Promise<FilteredLecturersResponse> => {
    const params = new URLSearchParams();

    if (payload.district) params.append('district', payload.district);
    if (payload.hourlyRate !== undefined) params.append('payRateLower', payload.hourlyRate.split("-")[0].toString());
    if (payload.hourlyRate !== undefined) params.append('payRateUpper', payload.hourlyRate.split("-")[1].toString());
    if (payload.qualification) params.append('qualification', payload.qualification);
    if (payload.isAssigned !== undefined) params.append('isAssigned', payload.isAssigned.toString());
    if (payload.languages) params.append('languages', payload.languages);
    if (payload.size !== undefined) params.append('size', payload.size.toString());
    if (payload.page !== undefined) params.append('page', payload.page.toString());
    if (payload.sort) params.append('sort', payload.sort);

    const { data } = await lectureLinkAxios.get<FilteredLecturersResponse>(`/lecturers/filter`, { params });

    return data;
  },

  deleteLecturerById: async (payload: { lecturerId: number }): Promise<{ success: boolean; message?: string }> => {
    const { data } = await lectureLinkAxios.delete(`/lecturers/${payload.lecturerId}`);
    return data;
  },
};

export default LecturerService;
