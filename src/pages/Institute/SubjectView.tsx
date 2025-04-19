import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useLocation, useParams } from 'react-router-dom';
import Loader from '../../common/Loader/Loader.tsx';
import { useData, useDispatcher } from '../../context/MainContext.tsx';
import { Role } from '../../types/enums/role.ts';
import SubjectService from '../../services/subjectService.ts';
import { useQuery, useMutation } from 'react-query';
import EmailService from '../../services/emailService.ts';
import InstituteService from '../../services/instituteService.ts';
import Toast from '../../components/Miscellaneous/Toast.tsx';
import { useState } from 'react';
import { LecturerRes } from '../../types/lecturerTypes/lecturerRes.ts';

const SubjectView = () => {
  const location = useLocation();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { subjectId } = useParams(); 
  const lecturer: LecturerRes | null = useData() as LecturerRes;
  const { pathname } = location;
  const dispatch = useDispatcher();

  const { data: subject, isLoading: isLoadingSubject, isError: isSubjectError } = useQuery(
    ['getSubjectById', subjectId],
    () => SubjectService.getSubjectById({ subjectId }),
    {
      enabled: !!subjectId,
    }
  );

  const { mutate: sendEmail, isLoading: isSendingEmail } = useMutation(
    EmailService.sendEmailInstitute,
    {
      onSuccess: () => {
        setToast({ message: "You have conveyed interest successfully, Email has been sent successfully", type: "success" });
        dispatch({ type: "delete" });
      },
      onError: () => {
        setToast({ message: "Convey Interest unsuccessful!", type: "error" });
      },
    }
  );

  const { mutate: getInstituteEmail } = useMutation(
    InstituteService.getInstituteEmailBySubjectId,
    {
      onSuccess: (instituteEmail) => {
        sendEmail({
          instituteEmail,
          name: subject?.name,
          data: lecturer?.name,
        });
      },
      onError: () => {
        setToast({ message: "Failed to get institute email!", type: "error" });
      },
    }
  );

  if (isLoadingSubject) {
    return <Loader />;
  }

  if (isSubjectError) {
    return <div>Error loading subject or program details. Please try again later.</div>;
  }

  const { name, noOfCredits, isAssigned, lecturerId, description } = subject || {};

  const handleConveyInterest = async () => {
    if (subject) { 
      getInstituteEmail(subjectId); // Call the mutation to get the institute email
    }
  };

  return (
    <>
      <Breadcrumb pageName="Subject Details" />

      <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        <h3 className="text-3xl font-semibold text-black dark:text-white mb-6">
          {name}
        </h3>

        <div className="space-y-4">
          {/* Number of Credits */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">No. of Credits:</h4>
            <p className="flex-1">{noOfCredits}</p>
          </div>

          {/* Assigned Status */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">Is a lecturer assigned?:</h4>
            <p className="flex-1">
              {isAssigned ? (
                <span className="text-green-500">Yes</span>
              ) : (
                <span className="text-red-500">No</span>
              )}
            </p>
          </div>

          {/* Lecturer ID */}
          {lecturerId && (
            <div className="flex gap-4">
              <h4 className="font-semibold text-black dark:text-white w-40">Lecturer ID:</h4>
              <p className="flex-1">{lecturerId}</p>
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <h4 className="font-semibold text-black dark:text-white w-full sm:w-40">Description:</h4>
              <p className="flex-1 break-words">{description}</p>
            </div>
          )}

          {localStorage.getItem('role') === Role.LECTURER && (
            <div className="mt-6">
              <button
                type="button"
                onClick={handleConveyInterest}
                disabled={isSendingEmail}
                className="mt-4 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 mx-5 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
              >
                {isSendingEmail ? 'Sending...' : 'Convey Interest'}
              </button>
            </div>
          )}
        </div>
      </div>
      {toast && <Toast
        {...toast} onClose={() => setToast(null)} />}
    </>
  );
};

export default SubjectView;