import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Loader from '../../common/Loader/Loader.tsx';
import { useMutation } from 'react-query';
import lecturerService from '../../services/lecturerService.ts';
import { LecturerRes } from '../../types/lecturerTypes/lecturerRes.ts';
import Toast from '../../components/Miscellaneous/Toast.tsx';
import dummyProfileImg from '../../images/user/profile.png';

// Dropdown options
const districtOptions = ['Kandy', 'Colombo', 'Kurunagala', 'Matale', 'Nuwareliya', 'Galle'];
const qualificationOptions = ['PhD', 'MSc', 'BSc', 'PGD', 'HND'];
const hourlyRateOptions = ['500-1000', '1000-1500', '1500-2000', '2000-3000', '3000<'];
const isAssignedOptions = ["true", "false"];
const languageOptions = ['ENGLISH', 'SINHALA', 'TAMIL'];

const FilteredLecturers = () => {

  const [filteredLecturers, setFilteredLecturers] = useState([] as LecturerRes[]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const { mutate: filterLecturer, isLoading: isFilteringLecturer } = useMutation(
    lecturerService.getFilteredLecturers,
    {
      onSuccess: (data) => {
        // @ts-ignore
        data.content.length !== 0
          ? setToast({
            // @ts-ignore
            message: 'Lecturers are successfully filtered!',
            type: 'success',
          })
          : setToast({
            // @ts-ignore
            message: 'No lecturers are available for given filters!',
            type: 'error',
          });
        // @ts-ignore
        console.log(data)
        // @ts-ignore
        setFilteredLecturers(data.content)
      },
      onError: () => {
        // @ts-ignore
        setToast({ message: "Lecturer filteration is unsuccessful!", type: "error" });
      },
    },
  );

  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredLecturers?.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const formik = useFormik({
    initialValues: {
      district: '',
      hourlyRate: '',
      qualification: '',
      isAssigned: '',
      language: '',
      globalSearch: '',
      size: 10,
      page: 0,
      sort: 'id',
    },
    onSubmit: (values) => {
      filterLecturer({
        district: values.district ?? null,
        hourlyRate: values.hourlyRate ?? null,
        qualification: values.qualification ?? null,
        isAssigned: values.isAssigned === 'true',
        language: values.language ?? null,
        globalSearch: values.globalSearch ?? null,
        size: values.size ? Number(values.size) : 5,
        page: values.page ? Number(values.page) : 0,
        sort: values.sort,
      })
    },
  });

  const getHighestQualification = (lecturer: LecturerRes) => {
    const priority = ["PHD", "MSC", "BSC", "HND", "PGD"];
    const qualifications = lecturer?.qualifications?.map(q => q.level.toUpperCase()) || [];

    return priority.find(level => qualifications.includes(level)) ?? "N/A";
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulating a loading state
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading || isFilteringLecturer) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Filtered Lecturers" />

      {/* Filters Section */}
      <div className="mb-4 p-4 bg-white dark:bg-boxdark shadow-md rounded-md">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-wrap gap-4 items-center justify-center sm:justify-between"
        >
          {/* District Filter */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2" htmlFor="district">District</label>
            <select
              id="district"
              name="district"
              value={formik.values.district}
              onChange={formik.handleChange}
              className={`block w-full rounded rounded-md border-[1.5px] border-2 border-gray-500 py-2 px-5 outline-none w-40 transition ${
                formik.touched.district && formik.errors.district
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-primary'
              } dark:bg-gray-800`}
            >
              <option value="">All</option>
              {districtOptions.map((district, index) => (
                <option key={index+district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Qualification Filter */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2" htmlFor="qualification">
              Qualification
            </label>
            <select
              id="qualification"
              name="qualification"
              value={formik.values.qualification}
              onChange={formik.handleChange}
              className={`block w-full rounded rounded-md border-[1.5px] border-2 border-gray-500 py-2 px-5 outline-none w-40 transition ${
                formik.touched.qualification && formik.errors.qualification
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-primary'
              } dark:bg-gray-800`}>
              <option value="">All</option>
              {qualificationOptions.map((qualification, index) => (
                <option key={index+qualification} value={qualification}>
                  {qualification}
                </option>
              ))}
            </select>
          </div>

          {/* Hourly Rate Filter */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2" htmlFor="hourlyRate">
              Hourly Rate
            </label>
            <select
              id="hourlyRate"
              name="hourlyRate"
              value={formik.values.hourlyRate}
              onChange={formik.handleChange}
              className={`block w-full rounded rounded-md border-[1.5px] border-2 border-gray-500 py-2 px-5 outline-none w-40 transition ${
                formik.touched.hourlyRate && formik.errors.hourlyRate
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-primary'
              } dark:bg-gray-800`}>
              <option value="">All</option>
              {hourlyRateOptions.map((rate, index) => (
                <option key={index+rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </div>

          {/* Is Assigned Filter */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2" htmlFor="isAssigned">
              Is Assigned
            </label>
            <select
              id="isAssigned"
              name="isAssigned"
              value={formik.values.isAssigned}
              onChange={formik.handleChange}
              className={`block w-full rounded rounded-md border-[1.5px] border-2 border-gray-500 py-2 px-5 outline-none w-40 transition ${
                formik.touched.isAssigned && formik.errors.isAssigned
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-primary'
              } dark:bg-gray-800`}>
              <option value="">All</option>
              {isAssignedOptions.map((option, index) => (
                <option key={index+option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2" htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              value={formik.values.language}
              onChange={formik.handleChange}
              className={`block w-full rounded rounded-md border-[1.5px] border-2 border-gray-500 py-2 px-5 outline-none w-40 transition ${
                formik.touched.language && formik.errors.language
                  ? 'border-red-500'
                  : 'border-gray-500 focus:border-primary'
              } dark:bg-gray-800`}>
              <option value="">All</option>
              {languageOptions.map((language, index) => (
                <option key={index+language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          {/*Global search term*/}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2" htmlFor="globalSearch">
              Search Term
            </label>
            <div className="relative">
              <button disabled={true} className="absolute right-0 top-1/2 -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-primary mx-2 dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
                type="text"
                id="globalSearch"
                placeholder="Enter search term"
                className={`block w-full rounded rounded-md border-[1.5px] border-2 border-gray-500 py-2 px-5 outline-none w-40 transition ${
                  formik.touched.globalSearch && formik.errors.globalSearch
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-primary'
                } dark:bg-gray-800`}
                onChange={(e) => {
                  formik.setFieldValue('globalSearch', e.target.value);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.globalSearch}
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={() => {
                return formik.handleSubmit
              }}
              type="submit"
              className="mt-6 w-full hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
            >
              Search
            </button>
          </div>
        </form>
      </div>

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
                  <th className="min-w-[100px] py-4 px-4 text-left font-medium text-black dark:text-white">
                    Hourly Rate (LKR)
                  </th>
                  <th className="min-w-[150px] py-4 px-4 text-left font-medium text-black dark:text-white">
                    Is Assigned
                  </th>
                  <th className="py-4 px-4 text-left font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLecturers?.map((lecturer: LecturerRes, key) => (
                  <tr
                    key={key+lecturer?.name}
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
                          getHighestQualification(lecturer)?.toLowerCase() === 'phd'
                            ? 'bg-meta-7 text-meta-7'
                            : getHighestQualification(lecturer)?.toLowerCase() === 'msc'
                              ? 'bg-danger text-danger'
                              : getHighestQualification(lecturer)?.toLowerCase() === 'bsc'
                                ? 'bg-primary text-primary'
                                :getHighestQualification(lecturer)?.toLowerCase() === 'pgd'
                                  ? 'bg-warning text-warning'
                                  : getHighestQualification(lecturer)?.toLowerCase() === 'hnd'
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
                      ${lecturer?.payRate?.toFixed(2)}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          lecturer.isAssigned
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
                            handleNavigation(
                              `/app/lecturers/${lecturer.id}`,
                            )
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
                ))}
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

export default FilteredLecturers;