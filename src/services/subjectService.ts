import { lectureLinkAxios } from './axiosConfig.ts';
import { Subject } from '../types/instituteTypes/subject.ts';
import { FilteredSubjectRes } from '../types/instituteTypes/filteredSubjectRes.ts';

const SubjectService = {
  createSubject: async (payload: {
    subjectData: Subject;
  }): Promise<{ id: number; name: string }> => {
    const { data } = await lectureLinkAxios.post(`/subjects`, payload.subjectData);
    return data;
  },

  getSubjectById: async (payload: { subjectId: string | undefined}): Promise<Subject> => {
    const { data } = await lectureLinkAxios.get(`/subjects/${payload.subjectId}`);
    return data;
  },

  getAllSubjects: async (): Promise<Subject[]> => {
    const { data } = await lectureLinkAxios.get(`/subjects`);
    return data;
  },

  getFilteredSubjects: async (payload: {
    division?: string;
    programLevel?: string;
    credits?: number;
    hourlyRate?: string;
    duration?: string;
    studentCount?: string;
    globalSearch?: string;
    size?: number;
    page?: number;
    sort?: string;
  }): Promise<{ subjects: FilteredSubjectRes[]; total: number }> => {
    const params = new URLSearchParams();

    if (payload.division) params.append("division", payload.division);
    if (payload.programLevel) params.append("programLevel", payload.programLevel);
    if (payload.credits !== undefined) params.append("credits", payload.credits.toString());
    if (payload.hourlyRate !== undefined) params.append("paymentUpper", payload.hourlyRate.split('-')[1].toString());
    if (payload.hourlyRate !== undefined) params.append("paymentLower", payload.hourlyRate.split('-')[0].toString());
    if (payload.duration !== undefined) params.append("durationUpper", (Number(payload.duration.split('-')[1])*30).toString());
    if (payload.duration !== undefined) params.append("durationLower", (Number(payload.duration.split('-')[0])*30).toString());
    if (payload.studentCount !== undefined) params.append("studentUpper", payload.studentCount.split('-')[1].toString());
    if (payload.studentCount !== undefined) params.append("studentLower", payload.studentCount.split('-')[0].toString());
    if (payload.globalSearch) params.append("globalSearch", payload.globalSearch);
    if (payload.size !== undefined) params.append("size", payload.size.toString());
    if (payload.page !== undefined) params.append("page", payload.page.toString());
    if (payload.sort) params.append("sort", payload.sort);

    const { data } = await lectureLinkAxios.get(`/subjects/filter`, { params });
    return data;
  },

  updateSubject: async (payload: {
    subjectId: number | undefined;
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
