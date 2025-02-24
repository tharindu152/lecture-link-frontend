import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../../common/Loader';
import { useQuery } from 'react-query';
import ProgramService from '../../services/programService.ts';

const Program = () => {

  const location = useLocation();
  const { pathname } = location;

  const {
    data: program,
    isLoading: isLoadingProgram,
  } = useQuery(['getProgramById'], () => ProgramService.getProgramById({programId:pathname.slice(14)}));

  if (isLoadingProgram) {
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
            <h4 className="font-semibold text-black dark:text-white w-40">Level:</h4>
            <p className="flex-1">{program?.level}</p>
          </div>

          {/* Duration in Days */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Duration (Months):
            </h4>
            <p className="flex-1">{Math.ceil(program?.durationInDays ?? 0 / 30)}</p>
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
              <h4 className="font-semibold text-black dark:text-white w-40">Batch ID:</h4>
              <p className="flex-1">{program?.batchId}</p>
            </div>
          )}

          {/* Payment */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">Payment:</h4>
            <p className="flex-1">${program?.payment.toFixed(2)}</p>
          </div>

          {/* Institute ID */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Institute ID:
            </h4>
            <p className="flex-1">{program?.instituteId}</p>
          </div>

          {/* Subjects */}
          {program?.subjects && (
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <h4 className="font-semibold text-black dark:text-white w-full sm:w-40">
                Subjects:
              </h4>
              <ul className="list-disc flex-1 pl-4">
                {program?.subjects.map((subject) => (
                  <li key={subject.id} className="flex-1">
                    {subject.name} ({subject.noOfCredits} Credits)
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <h4 className="font-semibold text-black dark:text-white w-full sm:w-40">
              Description:
            </h4>
            <p className="flex-1">{program?.description}</p>
          </div>
        </div>
        <Link
          to="/app/programs/add-program"
          className="mt-4 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
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
          Update Program
        </Link>
      </div>
    </>
  );
};

export default Program;