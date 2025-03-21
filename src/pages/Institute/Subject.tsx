import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../../common/Loader/Loader.tsx';
import { useEffect, useState } from 'react';
import { useData } from '../../context/MainContext.tsx';
import { Program } from '../../types/instituteTypes/program.ts';

const Subject = () => {
  const [programsList, setProgramsList] = useState<Program[]>([]);
  const location = useLocation();
  const data = useData()
  const { pathname } = location;

  useEffect(() => {
    // @ts-ignore
    setProgramsList(data?.programs);
  }, []);

  const subject = programsList?.flatMap(prog => prog.subjects || []).find(sub => sub?.id === Number(pathname.slice(14)));

  const subjectProgramMap = programsList.reduce((acc, prog) => {
    prog.subjects?.forEach((sub) => {
      // @ts-ignore
      acc[sub.id] = prog.name;
    });
    return acc;
  }, {} as Record<number, string>);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Subject Details" />

      <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        <h3 className="text-3xl font-semibold text-black dark:text-white mb-6">
          {subject?.name}
        </h3>

        <div className="space-y-4">
          {/* Program */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Program:
            </h4>
            <p className="flex-1">{
              // @ts-ignore
              subjectProgramMap[subject?.id]}</p>
          </div>

          {/* Number of Credits */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              No. of Credits:
            </h4>
            <p className="flex-1">{subject?.noOfCredits}</p>
          </div>

          {/* Assigned Status */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Is a lecturer assigned?:
            </h4>
            <p className="flex-1">
              {subject?.isAssigned ? (
                <span className="text-green-500">Yes</span>
              ) : (
                <span className="text-red-500">No</span>
              )}
            </p>
          </div>

          {/* Lecturer ID */}
          {subject?.lecturerId && (
            <div className="flex gap-4">
              <h4 className="font-semibold text-black dark:text-white w-40">
                Lecturer ID:
              </h4>
              <p className="flex-1">{subject?.lecturerId}</p>
            </div>
          )}

          {/* Description */}
          {subject?.description && (
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <h4 className="font-semibold text-black dark:text-white w-full sm:w-40">
                Description:
              </h4>
              <p className="flex-1 break-words">{subject?.description}</p>
            </div>
          )}
        </div>
        <Link
          to={`/app/subjects/update-subject/${subject?.id}`}
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
          Update Subject
        </Link>
      </div>
    </>
  );
};

export default Subject;