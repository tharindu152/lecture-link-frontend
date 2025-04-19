import { useEffect, useState } from "react";
import { Qualification } from '../../types/lecturerTypes/qualification.ts'; 
import { LecturerRes } from "../../types/lecturerTypes/lecturerRes.ts";
import { useData } from "../../context/MainContext.tsx";

const TableOneLec = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const data: LecturerRes | null = useData();
  const [qualificationList, setQualificationList] = useState<Qualification[]>([]);

  useEffect(() => {
    if (data?.qualifications) {
      setQualificationList(data.qualifications);
      setLoading(false); 
    }
    localStorage.removeItem('qualification');
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100); 
    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={`rounded-sm col-span-6 border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 
      ${isVisible ? "opacity-100 translate-y-0 transition-all duration-700 ease-out" : "opacity-0 translate-y-5"}
    `}>
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Qualification Completed
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Title
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Level
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Awarding Body
            </h5>
          </div>
        </div>

        {qualificationList.map((qualification, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${
              key === qualificationList.length - 1 ? '' : 'border-b hover:bg-gray-200 dark:hover:bg-gray-800 border-stroke dark:border-strokedark'
            } transition-all duration-700 ease-out transform 
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}
              `}
            style={{ transitionDelay: `${key * 100}ms` }}
            key={qualification.id} 
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{qualification.name}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p
              className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                qualification?.level?.toLowerCase() === 'doctorate'
                  ? 'bg-meta-7 text-meta-7'
                  : qualification?.level?.toLowerCase() === 'masters'
                  ? 'bg-danger text-danger'
                  : qualification?.level?.toLowerCase() === 'bachelors'
                  ? 'bg-primary text-primary'
                  : qualification?.level?.toLowerCase() === 'postgraduate'
                  ? 'bg-warning text-warning'
                  : qualification?.level?.toLowerCase() === 'hnd'
                  ? 'bg-success text-success'
                  : qualification?.level?.toLowerCase() === 'hnc'
                  ? 'bg-success text-success'
                  : ''
              }`}
            >{qualification.level}
            </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{qualification.awardingBody}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOneLec;