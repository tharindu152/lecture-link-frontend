import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Loader from '../../common/Loader/Loader.tsx';
import { useMutation } from 'react-query';
import subjectService from '../../services/subjectService.ts';
import Toast from '../../components/Miscellaneous/Toast.tsx';
import { FilteredSubjectRes } from '../../types/instituteTypes/filteredSubjectRes.ts';

const districtOptions = ['Kandy', 'Colombo', 'Kurunagala', 'Matale', 'Nuwareliya', 'Galle'];
const levelOptions = ['PHD', 'MSC', 'BSC', 'PGD', 'HND'];
const creditOptions = [1,2,3,4];
const hourlyRateOptions = ['500-1000', '1000-1500', '1500-2000', '2000-3000', '3000-5000'];
const durationOptions = ['1-2', '2-3', '3-6', '6-12', '12-48'];
const studentCountOptions = ['10-50', '50-100', '100-200', '200-500', '500-1000'];

const FilteredSubjects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [filteredSubjects, setFilteredSubjects] = useState([] as FilteredSubjectRes[]);
  const [toast, setToast] = useState(null);

  const { mutate: filterSubjects, isLoading: isFilteringSubject } = useMutation(
    subjectService.getFilteredSubjects,
    {
      onSuccess: (data) => {
        // @ts-ignore
        data.content.length !== 0
          ? setToast({
            // @ts-ignore
              message: 'Subjects are successfully filtered!',
              type: 'success',
            })
          : setToast({
            // @ts-ignore
              message: 'No subjects are available for given filters!',
              type: 'error',
            });
        // @ts-ignore
        console.log(data)
        // @ts-ignore
        setFilteredSubjects(data.content)
      },
      onError: () => {
        // @ts-ignore
        setToast({ message: "Subject filtration is unsuccessful!", type: "error" });
      },
    },
  );

  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubjects = filteredSubjects.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filterSubjects.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNavigation = (path: string) => {
    navigate(path); // Route navigation
  };

  const formik = useFormik({
    initialValues: {
      district: '',
      programLevel: '',
      credits: '',
      hourlyRate: '',
      duration: '',
      studentCount: '',
      globalSearch: '',
      size: 10,
      page: 0,
      sort: 'name',
    },
    onSubmit: (values) => {
      filterSubjects({
        district: values.district ?? null,
        programLevel: values.programLevel ?? null,
        credits: values.credits ? Number(values.credits) : undefined,
        hourlyRate: values.hourlyRate ?? null,
        duration: values.duration ?? null,
        studentCount: values.studentCount ?? null,
        globalSearch: values.globalSearch ?? null,
        size: values.size ? Number(values.size) : 10,
        page: values.page ? Number(values.page) : 0,
        sort: values.sort,
      });
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulating a loading state
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading || isFilteringSubject) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Filtered Subjects" />

      {/* Filters Section */}
      <div className="mb-4 p-4 bg-white dark:bg-boxdark shadow-md rounded-md">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-wrap gap-4 items-center justify-center sm:justify-between"
        >
          {/* District Filter */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2" htmlFor="district">
              District
            </label>
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
              <option value="">Select District</option>
              {districtOptions.map((district, index) => (
                <option key={index + district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2" htmlFor="programLevel">
              Level
            </label>
            <select
              id="programLevel"
              name="programLevel"
              value={formik.values.programLevel}
              onChange={formik.handleChange}
              className={`block w-full rounded rounded-md border-[1.5px] border-2 border-gray-500 py-2 px-5 outline-none w-40 transition ${
                formik.touched.programLevel && formik.errors.programLevel
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-primary'
              } dark:bg-gray-800`}
            >
              <option value="">Select Level</option>
              {levelOptions.map((level, index) => (
                <option key={index + level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Credits Filter */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2" htmlFor="credits">
              Credits
            </label>
            <select
              id="credits"
              name="credits"
              value={formik.values.credits}
              onChange={formik.handleChange}
              className={`block w-full rounded rounded-md border-[1.5px] border-2 border-gray-500 py-2 px-5 outline-none w-40 transition ${
                formik.touched.credits && formik.errors.credits
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-primary'
              } dark:bg-gray-800`}
            >
              <option value="">Select Credits</option>
              {creditOptions.map((credit, index) => (
                <option key={index + credit} value={credit}>
                  {credit}
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
              } dark:bg-gray-800`}
            >
              <option value="">Select Rate</option>
              {hourlyRateOptions.map((rate, index) => (
                <option key={index + rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Rate Filter */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2" htmlFor="duration">
              Duration (months)
            </label>
            <select
              id="duration"
              name="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
              className={`block w-full rounded rounded-md border-[1.5px] border-2 border-gray-500 py-2 px-5 outline-none w-40 transition ${
                formik.touched.duration && formik.errors.duration
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-primary'
              } dark:bg-gray-800`}
            >
              <option value="">Select Duration</option>
              {durationOptions.map((duration, index) => (
                <option key={index + duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>

          {/* Student Count Rate Filter */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2" htmlFor="studentCount">
              Student Count
            </label>
            <select
              id="studentCount"
              name="studentCount"
              value={formik.values.studentCount}
              onChange={formik.handleChange}
              className={`block w-full rounded rounded-md border-[1.5px] border-2 border-gray-500 py-2 px-5 outline-none w-40 transition ${
                formik.touched.studentCount && formik.errors.studentCount
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-primary'
              } dark:bg-gray-800`}
            >
              <option value="">Select Count</option>
              {studentCountOptions.map((count, index) => (
                <option key={index + count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>

          {/*Global search term*/}
          <div className="flex flex-col" title="Search term will be used to find matched from Subject name and description">
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
              disabled={!formik.isValid}
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
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Subject
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Level
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  No of Credits
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Duration (months)
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Student Count
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  District
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Hourly Rate (LKR)
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
              </thead>
              <tbody>
              {currentSubjects.map((subject, key) => (
                <tr
                  key={key + subject.name + subject.noOfCredits}
                  className={'hover:bg-gray-200 dark:hover:bg-gray-800'}
                >
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {subject.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        subject.level.toLowerCase() === 'phd'
                          ? 'bg-meta-7 text-meta-7'
                          : subject.level.toLowerCase() === 'msc'
                            ? 'bg-danger text-danger'
                            : subject.level.toLowerCase() === 'bsc'
                              ? 'bg-primary text-primary'
                              : subject.level.toLowerCase() === 'pgd'
                                ? 'bg-warning text-warning'
                                : subject.level.toLowerCase() === 'hnd'
                                  ? 'bg-success text-success'
                                  : ''
                      }`}
                    >
                      {subject.level}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {subject.noOfCredits}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {Math.ceil((subject.durationInDays ?? 0) / 30)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="text-black dark:text-white">
                      {subject.studentCount}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                    <h5 className="text-black dark:text-white">
                      {subject.district}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                    <h5 className="text-black dark:text-white">
                      {subject.payment}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        title="View"
                        onClick={() =>
                          handleNavigation(`/app/subjects/${subject.id}`)
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

export default FilteredSubjects;