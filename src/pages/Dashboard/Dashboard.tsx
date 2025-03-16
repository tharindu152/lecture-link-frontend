import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/Miscellaneous/CardDataStats.tsx';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import TableOne from '../../components/Tables/TableOne';
import Loader from '../../common/Loader/Loader.tsx';
import { useData } from '../../context/MainContext.tsx';
import { Program } from '../../types/instituteTypes/program.ts';
import { Subject } from '../../types/instituteTypes/subject.ts';
import { LecturerRes } from '../../types/lecturerTypes/lecturerRes.ts';
import { InstituteRes } from '../../types/instituteTypes/instituteRes.ts';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const data: LecturerRes | InstituteRes = useData();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Ongoing Programs"
          // @ts-ignore
          total={`${data?.programs?.length}`}
          rate=""
          levelUp
        >
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m28.82 8.69-11-6.13a3.13 3.13 0 0 0-3.58 0l-11 6.13a2.85 2.85 0 0 0 0 4.62l.11.07L7 15.44V25c0 1.57 2.26 5 9 5s9-3.43 9-5v-9.56l3-1.67V25a1 1 0 0 0 2 0V11a2.87 2.87 0 0 0-1.18-2.31ZM23 25c0 .39-1.41 3-7 3s-7-2.61-7-3v-8.45l5.2 2.89a3.17 3.17 0 0 0 3.6 0l5.2-2.89Zm4.67-13.33-11 6.12a1.14 1.14 0 0 1-1.32 0l-11-6.12a.85.85 0 0 1 0-1.34s11-6.09 11-6.12a1.17 1.17 0 0 1 1.34 0s11 6.12 11 6.12a.85.85 0 0 1 0 1.34Z"
              data-name="cap, graduation, hat, graduate, university, school, student, ceremony, diploma, college"
              fill=""
              className="fill-000000"
            ></path>
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Ongoing Subjects"
          // @ts-ignore
          total={data?.programs?.reduce((total: number, program: Program) => {
            return total + (program.subjects ? program.subjects.length : 0);
          }, 0)}
          rate=""
          levelUp
        >
          <svg
            className="stroke-current"
            width="18"
            height="18"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g data-name="81-book">
              <path
                d="M3 27V5a4 4 0 0 1 4-4h22v22H7.17A4.12 4.12 0 0 0 3 26.61 4 4 0 0 0 7 31h22M27 23v8"
                fill="none"
                stroke=""
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3px"
                className="fill-000000"
              ></path>
            </g>
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Lecturers Assigned"
          // @ts-ignore
          total={data?.programs?.reduce((total: number, program: Program) => {
            return (
              total +
              (program?.subjects
                ? program?.subjects?.filter(
                    (subject: Subject) => subject?.isAssigned === true,
                  ).length
                : 0)
            );
          }, 0)}
        >
          <svg
            className="stroke-current"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.249 6a5.25 5.25 0 1 1-10.5 0V.75h10.5ZM2.249 23.25a9.75 9.75 0 1 1 19.5 0M.749.75h22.5M6.749 5.25h10.5M2.249.75v7.5"
              fill="none"
              stroke=""
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5px"
              className="stroke-000000"
            ></path>
            <path
              d="m7.012 14.871 4.987 3.879 4.987-3.879"
              fill="none"
              stroke=""
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5px"
              className="stroke-000000"
            ></path>
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Total Students"
          // @ts-ignore
          total={data?.programs?.reduce((total: number, program: Program) => {
            return total + program?.studentCount;
          }, 0)}
          rate="0.95%"
          levelDown
        >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <TableOne />
      </div>
    </>
  );
};

export default Dashboard;
