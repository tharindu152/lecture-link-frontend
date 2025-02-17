import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Level } from '../../types/level.ts';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../common/Loader';

// Mock Qualification Data
const qualifications: Qualification[] = [
  {
    id: 1,
    name: "Bachelor of Science in Computer Science",
    awardingBody: "University of Technology",
    durationInDays: 1095,
    discipline: "Computer Science",
    completedAt: "2022-05-15",
    level: Level.PHD,
    lecturerId: 101,
  },
  {
    id: 2,
    name: "Master of Business Administration",
    awardingBody: "Global Business Institute",
    durationInDays: 730,
    discipline: "Management",
    completedAt: "2021-11-25",
    level: Level.HND,
    lecturerId: 102,
  },
  {
    id: 3,
    name: "Diploma in Graphic Design",
    awardingBody: "Creative Arts Academy",
    durationInDays: 180,
    completedAt: "2020-08-10",
    level: Level.PGD,
    lecturerId: 103,
  },
  {
    id: 4,
    name: "Ph.D. in Astrophysics",
    awardingBody: "Institute of Advanced Sciences",
    durationInDays: 1825,
    discipline: "Astrophysics",
    completedAt: "2023-02-14",
    level: Level.BSC,
    lecturerId: 104,
  },
  {
    id: 5,
    name: "Certificate in Data Analysis",
    awardingBody: "Online Data Academy",
    durationInDays: 90,
    completedAt: "2021-06-30",
    level: Level.MSC,
    lecturerId: 105,
  },
];

type Qualification = {
  id: number;
  name: string;
  awardingBody: string;
  durationInDays: number;
  discipline?: string;
  completedAt: string;
  level: Level;
  lecturerId: number;
};

const Qualification = () => {

  // Parse the qualificationId from params and find the relevant qualification
  const qualification = qualifications[0];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulating a loading state
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Qualification Details" />

      <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        <h3 className="text-3xl font-semibold text-black dark:text-white mb-6">
          {qualification.name}
        </h3>

        <div className="space-y-4">
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Title:
            </h4>
            <p className="flex-1">{qualification.name}</p>
          </div>

          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Awarding Body:
            </h4>
            <p className="flex-1">{qualification.awardingBody}</p>
          </div>

          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Discipline:
            </h4>
            <p className="flex-1">{qualification.discipline}</p>

          </div>

            <div className="flex gap-4">
              <h4 className="font-semibold text-black dark:text-white w-40">
                Duration (Months):
              </h4>
              <p className="flex-1">{Math.ceil(qualification.durationInDays / 30)}</p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <h4 className="font-semibold text-black dark:text-white w-full sm:w-40">
                Level:
              </h4>
              <p
                className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                  qualification.level === 'PhD'
                    ? 'bg-meta-7 text-meta-7'
                    : qualification.level === 'MSc'
                      ? 'bg-danger text-danger'
                      : qualification.level === 'BSc'
                        ? 'bg-primary text-primary'
                        : qualification.level === 'PGD'
                          ? 'bg-warning text-warning'
                          : qualification.level === 'HND'
                            ? 'bg-success text-success'
                            : ''
                }`}
              >
                {qualification.level}
              </p>
            </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <h4 className="font-semibold text-black dark:text-white w-full sm:w-40">
              Completed At:
            </h4>
            <p className="flex-1 break-words">{qualification.completedAt}</p>
          </div>
        </div>
        <Link
          to="/app/qualifications/add-qualification"
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
          Update Qualification
        </Link>
      </div>
    </>
  );
};

export default Qualification;