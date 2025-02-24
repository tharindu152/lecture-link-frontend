import { lectureLinkAxios } from './axiosConfig.ts';
import { Subject } from '../types/subject.ts';

const SubjectService = {
  createSubject: async (payload: {
    subjectData: Subject;
  }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.post(`/subjects`, payload.subjectData);
    return data;
  },

  getSubjectById: async (payload: { subjectId: string }): Promise<Subject> => {
    const { data } = await lectureLinkAxios.get(`/subjects/${payload.subjectId}`);
    return data;
  },

  getAllSubjects: async (): Promise<Subject[]> => {
    const { data } = await lectureLinkAxios.get(`/subjects`);
    return data;
  },

  getFilteredSubjects: async (payload: {
    name?: string;
    description?: string;
    noOfCredits?: number;
    isAssigned?: boolean;
    size?: number;
    page?: number;
    sort?: string;
  }): Promise<{ subjects: Subject[]; total: number }> => {
    const params = new URLSearchParams();

    if (payload.name) params.append("name", payload.name);
    if (payload.description) params.append("description", payload.description);
    if (payload.noOfCredits) params.append("noOfCredits", payload.noOfCredits.toString());
    if (payload.isAssigned !== undefined) params.append("isAssigned", payload.isAssigned.toString());
    if (payload.size !== undefined) params.append("size", payload.size.toString());
    if (payload.page !== undefined) params.append("page", payload.page.toString());
    if (payload.sort) params.append("sort", payload.sort);

    const { data } = await lectureLinkAxios.get(`/subjects/filter`, { params });
    return data;
  },

  updateSubject: async (payload: {
    subjectId: string;
    subjectData: Subject;
  }): Promise<{ id: number; name: string }> => {
    const { data } = await lectureLinkAxios.patch(`/subjects/${payload.subjectId}`, payload.subjectData);
    return data;
  },

  deleteSubjectById: async (payload: { subjectId: number }): Promise<{ success: boolean; message?: string }> => {
    const { data } = await lectureLinkAxios.delete(`/subjects/${payload.subjectId}`);
    return data;
  },
};

export default SubjectService;
