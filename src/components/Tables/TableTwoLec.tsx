import { useEffect, useState } from "react";
import ProgramService from "../../services/programService.ts"; 
import { Program } from '../../types/instituteTypes/program.ts'; 

interface TableTwoLecProps {
  lecturerId: string | number | undefined;
}

const TableTwoLec: React.FC<TableTwoLecProps> = ({ lecturerId }) => { 
  const [isVisible, setIsVisible] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const fetchPrograms = async () => {
      try {
        const data = await ProgramService.getProgramsForLecturer({ lecturerId });
        setPrograms(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [lecturerId]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`rounded-sm col-span-6 border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 
      ${isVisible ? "opacity-100 translate-y-0 transition-all duration-700 ease-out" : "opacity-0 translate-y-5"}
    `}>
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Programs Assigned
      </h4>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Program Name</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Duration (Days)</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Language</h5>
          </div>
        </div>

        {programs.map((program, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${
              key === programs.length - 1 ? '' : 'border-b hover:bg-gray-200 dark:hover:bg-gray-800 border-stroke dark:border-strokedark'
            } transition-all duration-700 ease-out transform 
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}
              delay-[${key * 100}ms]
            `}
            key={program.id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{program.name}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{program.durationInDays}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{program.language}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableTwoLec;