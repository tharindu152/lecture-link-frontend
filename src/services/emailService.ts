import { InstituteRes } from "../types/instituteTypes/instituteRes";
import { LecturerRes } from "../types/lecturerTypes/lecturerRes";
import { lectureLinkAxios } from "./axiosConfig";

const EmailService = {
  sendEmailInstitute: async (payload: {
    instituteEmail: string;
    name: string | undefined;
    data: string | undefined; 
    }): Promise<LecturerRes> => {
            const { data } = await lectureLinkAxios.post('/email/send', {
                toEmail: payload.instituteEmail, 
                subject: 'Convey Interest For Subject',
                body: `To whom it may concern, Visiting Lecturer ${payload.data} has expressed interest to the subject: "${payload.name}".`
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
              body: `Dear Lecturer, We are delighted to inform you that, you have been considered to conduct "${payload.name}" subject at ${payload.data}. Please reply to this email if you are interested.`,
            });

            return data;
        }
}

export default EmailService;