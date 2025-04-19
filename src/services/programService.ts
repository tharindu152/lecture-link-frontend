import { lectureLinkAxios } from './axiosConfig.ts';
import { Program } from '../types/instituteTypes/program.ts';

const ProgramService = {
  createProgram: async (payload: {
    programData: Program;
  }): Promise<{ id: string; name: string }> => {
    const { data } = await lectureLinkAxios.post(`/programs`, payload.programData);
    return data;
  },

  getProgramById: async (payload: { programId: string }): Promise<Program> => {
    const { data } = await lectureLinkAxios.get(`/programs/${payload.programId}`);
    return data;
  },

  getAllPrograms: async (): Promise<Program[]> => {
    const { data } = await lectureLinkAxios.get(`/programs`);
    return data;
  },

  getProgramsForLecturer: async (payload: { lecturerId: number | string | undefined}): Promise<Program[]> => {
    const { data } = await lectureLinkAxios.get(`/programs/lecturer/${payload.lecturerId}`);
    return data;
  },

  getFilteredPrograms: async (payload: {
    name?: string;
    description?: string;
    level?: string;
    durationInDays?: number;
    studentCount?: number;
    size?: number;
    page?: number;
    sort?: string;
  }): Promise<{ programs: Program[]; total: number }> => {
    const params = new URLSearchParams();

    if (payload.name) params.append("name", payload.name);
    if (payload.description) params.append("description", payload.description);
    if (payload.level) params.append("level", payload.level);
    if (payload.durationInDays) params.append("durationInDays", payload.durationInDays.toString());
    if (payload.studentCount) params.append("studentCount", payload.studentCount.toString());
    if (payload.size !== undefined) params.append("size", payload.size.toString());
    if (payload.page !== undefined) params.append("page", payload.page.toString());
    if (payload.sort) params.append("sort", payload.sort);

    const { data } = await lectureLinkAxios.get(`/programs/filter`, { params });
    return data;
  },

  updateProgram: async (payload: {
    programId: number | undefined;
    programData: Program | undefined;
  }): Promise<{ id: number; name: string }> => {
    const { data } = await lectureLinkAxios.patch(`/programs/${payload.programId}`, payload.programData);
    return data;
  },

  deleteProgramById: async (payload: { programId: number }): Promise<{ success: boolean; message?: string }> => {
    const { data } = await lectureLinkAxios.delete(`/programs/${payload.programId}`);
    return data;
  },
};

export default ProgramService;

