import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useLocation } from 'react-router-dom';
import Loader from '../../common/Loader/Loader.tsx';
import { useEffect, useState } from 'react';
import { useData } from '../../context/MainContext.tsx';
import { Program } from '../../types/instituteTypes/program.ts';
import { Role } from '../../types/enums/role.ts';

const Subject = () => {
  const [programsList, setProgramsList] = useState<Program[]>([]);
  const location = useLocation();
  const data = useData();
  const { pathname } = location;

  useEffect(() => {
    // @ts-ignore
    setProgramsList(data?.programs);
  }, []);

  const subject = programsList?.flatMap(prog => prog.subjects || []).find(sub => sub?.id === Number(pathname.slice(14)));

  const subjectProgramMap = programsList?.reduce((acc, prog) => {
    prog.subjects?.forEach((sub) => {
      //@ts-ignore
      if (!acc[sub?.id]) {
        //@ts-ignore
        acc[sub?.id] = [];
      }
      //@ts-ignore
      acc[sub?.id].push(prog.name);
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
              Program(s):
            </h4>
            <p className="flex-1">{
              // @ts-ignore
              subjectProgramMap[subject?.id].join(", ") ?? ''}</p>
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

          {localStorage.getItem('role') === Role.LECTURER && (
            <div className="mt-6">
              <button
                type="submit"
                onClick={() => {
                }}
                className="mt-4 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 mx-5 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
              >
                Convey Interest
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Subject;