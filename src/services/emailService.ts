import { InstituteRes } from "../types/instituteTypes/instituteRes";
import { LecturerRes } from "../types/lecturerTypes/lecturerRes";
import { lectureLinkAxios } from "./axiosConfig";

const EmailService = {
  sendEmailInstitute: async (payload: {
    instituteEmail: string;
    name: string;
    data: string | undefined; 
    }): Promise<LecturerRes> => {
            const { data } = await lectureLinkAxios.post('/email/send', {
                toEmail: payload.instituteEmail, 
                subject: 'Convey Interest For Subject',
                body: `Dear Institute, ${payload.data} Lecturer has expressed interest in the "${payload.name}" subject.`
            });

            return data;
        },

  sendEmailLecturer: async (payload: {
    lecturerEmail: string;
    name: string;
    data: string | undefined;
    }): Promise<InstituteRes> => {
            const { data } = await lectureLinkAxios.post('/email/send', {
                toEmail: payload.lecturerEmail,
                subject: 'Subject Assigning Notification',
                body: `Dear Lecturer, You have assigned to the  "${payload.name}" subject by ${payload.data}.`
            });

            return data;
        }
}

export default EmailService;