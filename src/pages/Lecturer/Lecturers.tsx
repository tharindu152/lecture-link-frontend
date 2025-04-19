import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../common/Loader/Loader.tsx';
import { useQuery } from 'react-query';
import lecturerService from '../../services/lecturerService.ts';
import { LecturerRes } from '../../types/lecturerTypes/lecturerRes.ts';
import Toast from '../../components/Miscellaneous/Toast.tsx';
import dummyProfileImg from '../../images/user/profile_dummy.png';
import { useData } from '../../context/MainContext.tsx';
import { InstituteRes } from '../../types/instituteTypes/instituteRes.ts';

const Lecturers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [lecturerList, setLecturerList] = useState<LecturerRes[]>([]);
  const [toast, setToast] = useState(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<string>('');
  // @ts-ignore
  const institute: InstituteRes = useData();

  const { isLoading: isLoadingLecturers } = useQuery(
    ['getLecturers'],
    () =>
      lecturerService.getLecturersForInstitute({
        instituteId: institute?.id,
      }),
    {
      onSuccess: (data) => {
        setLecturerList(data);
      },
    },
  );

  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalPages = Math.ceil(lecturerList?.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const getHighestQualification = (lecturer: LecturerRes) => {
    const priority = ["DOCTORATE", "MASTERS", "BACHELORS", "HND", "POSTGRADUATE", "HNC"];
    const qualifications = lecturer?.qualifications?.map(q => q.level.toUpperCase()) || [];

    return priority.find(level => qualifications.includes(level)) ?? "N/A";
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const sortLecturers = (lecturers: LecturerRes[]) => {
    return [...lecturers].sort((a, b) => {
      const rateA = a.hourlyPayRate || 0;
      const rateB = b.hourlyPayRate || 0;
      return sortOrder === 'asc' ? rateA - rateB : rateB - rateA;
    });
  };;

  const currentLecturers = sortLecturers(lecturerList)?.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };


  if (loading || isLoadingLecturers) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Lecturers" />

      <div className="flex flex-col gap-10">
        <div className="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
              <tr className="bg-gray-2 dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 text-left font-medium text-black dark:text-white">
                  Picture
                </th>
                <th className="min-w-[150px] py-4 px-4 text-left font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 text-left font-medium text-black dark:text-white">
                  Highest Qualification
                </th>
                <th className="min-w-[150px] py-4 px-4 text-left font-medium text-black dark:text-white">
                  District
                </th>
                <th className="min-w-[150px] py-4 px-4 text-left font-medium text-black dark:text-white">
                  Contact Number
                </th>
                <th
                  className="min-w-[100px] py-4 px-4 text-left font-medium text-black dark:text-white cursor-pointer"
                  onClick={() => handleSort('hourlyRate')}
                >
                  Hourly Rate (LKR) {sortColumn === 'hourlyRate' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="min-w-[150px] py-4 px-4 text-left font-medium text-black dark:text-white">
                  Already assigned to a Subject
                </th>
                <th className="py-4 px-4 text-left font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
              </thead>
              <tbody>
              {lecturerList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-5">
                    <p className="text-gray-500">No Lecturers Found</p>
                  </td>
                </tr>
              ) : (
                currentLecturers?.map((lecturer, key) => (
                  <tr
                    key={key + lecturer?.name}
                    className="hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <img
                        src={lecturer?.picture ?? dummyProfileImg}
                        alt={lecturer?.name}
                        className="h-12 w-12 rounded-full"
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {lecturer?.name}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          getHighestQualification(lecturer)?.toLowerCase() ===
                          'phd'
                            ? 'bg-meta-7 text-meta-7'
                            : getHighestQualification(
                              lecturer,
                            )?.toLowerCase() === 'masters'
                              ? 'bg-danger text-danger'
                              : getHighestQualification(
                                lecturer,
                              )?.toLowerCase() === 'bachelors'
                                ? 'bg-primary text-primary'
                                : getHighestQualification(
                                  lecturer,
                                )?.toLowerCase() === 'pgd'
                                  ? 'bg-warning text-warning'
                                  : getHighestQualification(
                                    lecturer,
                                  )?.toLowerCase() === 'hnd'
                                    ? 'bg-success text-success'
                                    : ''
                        }`}
                      >
                        {getHighestQualification(lecturer)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {lecturer?.district ?? 'N/A'}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {lecturer?.contactNo ?? 'N/A'}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      ${lecturer?.hourlyPayRate?.toLocaleString()}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          lecturer?.isAssigned
                            ? 'bg-success bg-opacity-10 text-success'
                            : 'bg-warning bg-opacity-10 text-warning'
                        }`}
                      >
                        {lecturer?.isAssigned ? 'Assigned' : 'Unassigned'}
                      </span>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          title="View"
                          onClick={() =>
                            handleNavigation(`/app/lecturers/${lecturer?.id}`)
                          }
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                              fill=""
                            />
                            <path
                              d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded text-black dark:text-white"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? 'bg-primary text-white'
                      : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded text-black dark:text-white"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

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
    </>
  );
};

export default Lecturers;