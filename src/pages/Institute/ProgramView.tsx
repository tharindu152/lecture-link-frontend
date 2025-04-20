import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../../common/Loader/Loader.tsx';
import { useData, useDispatcher } from '../../context/MainContext.tsx';
import { useEffect, useState } from 'react';
import { Subject } from '../../types/instituteTypes/subject.ts';
import { InstituteRes } from '../../types/instituteTypes/instituteRes.ts';
import { useMutation } from 'react-query';
import programService from '../../services/programService.ts';
import Toast from '../../components/Miscellaneous/Toast.tsx';
import ConfirmationModal from '../../components/Miscellaneous/ConfirmationModal.tsx';
import { Program } from '../../types/instituteTypes/program.ts';

const ProgramView = () => {
  const location = useLocation();
  const institute: InstituteRes | null = useData() as InstituteRes;
  const dispatch = useDispatcher();
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState<number | null>(null);
  const { pathname } = location;
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [program, setProgram] = useState<Program>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //@ts-ignore
    setProgram(institute?.programs?.find(prog => prog?.id === Number(pathname.slice(14))));
    if (program) {
      localStorage.setItem('program', JSON.stringify(program));
    }
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [program]);

  function getUniqueSubjects(institute:InstituteRes): Subject[] {
    const uniqueSubjects = new Set<Subject>();

    institute.programs?.forEach(program => {
      program.subjects?.forEach(subject => {
        uniqueSubjects.add(subject);
      });
    });
    const uniqueSubjectsList = Array.from(uniqueSubjects);
    return uniqueSubjectsList;
  }

  const { mutate: updateProgram, isLoading: isUpdatingProgram } = useMutation(
    programService.updateProgram,
    {
      onSuccess: () => {
        // @ts-ignore
        setToast({ message: "Subject unassigned from program successfully!", type: "success" });
        dispatch({ type: "delete" });
      },
      onError: () => {
        // @ts-ignore
        setToast({ message: "Subject unassign from program is unsuccessful!", type: "error" });
      },
    },
  );

  const unassignProgram = (index: number) => {
    if (program?.subjects) {
      program?.subjects?.splice(index, 1);
      updateProgram({ programId: program.id, programData: program });
      setProgram(program)
      dispatch({ type: "delete" });
      dispatch({ type: "view" });
    }
  };

  if (loading || isUpdatingProgram || !institute) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Program Details" />

      <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        <h3 className="text-3xl font-semibold text-black dark:text-white mb-6">
          {program?.name}
        </h3>

        <div className="space-y-4">
          {/* Level */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Level:
            </h4>
            <p className="flex-1">{program?.level}</p>
          </div>

          {/* Time Preference */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Time Preference:
            </h4>
            <p className="flex-1">{program?.timePreference}</p>
          </div>

          {/* Duration in Days */}
          <div className="flex gap-4">
            < h4 className="font-semibold text-black dark:text-white w-40">
              Duration (Months):
            </h4>
            <p className="flex-1">
              {Math.ceil(program?.durationInDays ?? 0 / 30)}
            </p>
          </div>

          {/* Student Count */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Student Count:
            </h4>
            <p className="flex-1">{program?.studentCount}</p>
          </div>

          {/* Batch ID */}
          {program?.batchId && (
            <div className="flex gap-4">
              <h4 className="font-semibold text-black dark:text-white w-40">
                Batch ID:
              </h4>
              <p className="flex-1">{program?.batchId}</p>
            </div>
          )}

          {/* Payment */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Hourly Payment to Lecturer:
            </h4>
            <p className="flex-1">LKR {program?.hourlyPayRate?.toLocaleString()}</p>
          </div>

          {/* Institute ID */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Institute Name:
            </h4>
            <p className="flex-1">{institute?.name}</p>
          </div>

          {/* Subjects */}
          {program?.subjects && (
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <h4 className="font-semibold text-black dark:text-white w-full sm:w-40">
                Subjects:
              </h4>
              {program.subjects.length > 0 ? (
                <table>
                  <tbody>
                  {program.subjects.map((subject: Subject, i) => (
                    <tr key={subject.id} className="flex-1">
                      <td>
                        {subject.name} ({subject.noOfCredits} Credits)
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setSelectedSubjectIndex(i);
                            setIsModalOpen(true);
                          }}
                          className="mx-3 hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 px-1 text-center text-sm text-gray-500 transition duration-150 ease-in-out hover:bg-warning hover:border-warning hover:text-white"
                        >
                          Unassign
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-start">
                  <p className="text-gray-500">No subjects assigned. Please add a subject.</p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <h4 className="font-semibold text-black dark:text-white w-full sm:w-40">
              Add Subject:
            </h4>
            <select
              value={selectedSubject ? selectedSubject.id : ''}
              onChange={(e) => {
                const subject = getUniqueSubjects(institute).find(sub => sub?.id === Number(e.target.value));
                setSelectedSubject(subject || null);
              }}
              className="w-half border border-gray-300 rounded-md p-2 bg-gray-800"
            >
              <option value="" disabled>Select a subject</option>
              {getUniqueSubjects(institute).map(subject => (
                <option key={subject?.id + subject?.name} value={subject?.id}>
                  {subject?.name} ({subject?.noOfCredits} Credits)
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                if (selectedSubject) {
                  program?.subjects?.push(selectedSubject);
                  updateProgram({ programId: program?.id, programData: program });
                  setSelectedSubject(null);
                }
              }}
              className="mt-2 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 px-3 py-2 text-center text-sm text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
            >
              Add Subject
            </button>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <h4 className="font-semibold text-black dark:text-white w-full sm:w-40">
              Description:
            </h4>
            <p className="flex-1">{program?.description}</p>
          </div>
        </div>
        <Link
          to={`/app/programs/update-program/${program?.id}`}
          className="mt-4 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 mx-5 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
        >
          <svg
            width="20"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g data-name="Layer 18">
              <path
                d="M2 31a1 1 0 0 1-1-1.11l.9-8.17a1 1 0 0 1 .29-.6L21.27 2.05a3.56 3.56 0 0 1 5.05 0L30 5.68a3.56 3.56 0 0 1 0 5.05L10.88 29.8a1 1 0 0 1-.6.29L2.11 31Zm8.17-1.91Zm-6.31-6.81-.73 6.59 6.59-.73L28.54 9.31a1.58 1.58 0 0 0 0-2.22l-3.63-3.63a1.58 1.58 0 0 0-2.22 0Z"
                fill="currentColor"
                className="fill-current"
              ></path>
              <path
                d="M26.52 13.74a1 1 0 0 1-.7-.29l-7.27-7.27A1 1 0 0 1 20 4.77L27.23 12a1 1 0 0 1 0 1.41 1 1 0 0 1-.71.33Z"
                fill="currentColor"
                className="fill-current"
              ></path>
              <path
                transform="rotate(-45 14.719 17.283)"
                d="M8.29 16.28h12.84v2H8.29z"
                fill="currentColor"
                className="fill-current"
              ></path>
            </g>
          </svg>
          Update This Program
        </Link>
        {/* Add New Subject Button */}
        <Link
          to="/app/subjects/add-subject"
          className="mt-4 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
        >
          <svg
            width="18"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 14H18V4a2 2 0 0 0-4 0v10H4a2 2 0 0 0 0 4h10v10a2 2 0 0 0 4 0V18h10a2 2 0 0 0 0-4z"
              fill="currentColor"
              className="fill-current"
            ></path>
          </svg>
          Add New Subject To This Program
        </Link>
        {toast && (
          <Toast
            {
              // @ts-ignore
              ...toast
            }
            onClose={() => setToast(null)}
          />
        )}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        title={'Unassign Confirmation'}
        message={'Are you sure that you want to unassign this Subject?'}
        btnOne={'Unassign'}
        btnTwo={'Cancel'}
        onConfirm={() => {
          if (selectedSubjectIndex !== null) {
            unassignProgram(selectedSubjectIndex);
          }
          setIsModalOpen(false);
        }}
        onClose={() => setIsModalOpen(false)}
      ></ConfirmationModal>
    </>
  );
};

export default ProgramView;
