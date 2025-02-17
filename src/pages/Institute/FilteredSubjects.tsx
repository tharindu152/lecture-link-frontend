import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Loader from '../../common/Loader';

// Type definition for Lecturer
type Lecturer = {
  id: number;
  name: string;
  district: string;
  email: string;
  password: string;
  dob: string;
  contactNo?: string;
  review?: string;
  payRate: number;
  qualifications?: string[];
  picture?: string; // Path to image (Optional for dummy data)
  status: 'ACTIVE' | 'INACTIVE';
  isAssigned: boolean;
  languages?: string;
};

const lecturers: Lecturer[] = [
  {
    id: 1,
    name: 'John Doe',
    district: 'Colombo',
    email: 'john.doe@example.com',
    password: 'password123',
    dob: '1985-02-15',
    contactNo: '123-456-7890',
    review: 'Highly enthusiastic and motivating.',
    payRate: 55.0,
    qualifications: ["HND"],
    picture:
      '../../../src/images/user/user-01.png', // Dummy image URL (replace with actual image if needed)
    status: 'ACTIVE',
    isAssigned: true,
    languages: 'English, Spanish',
  },
  {
    id: 2,
    name: 'Jane Smith',
    district: 'Kurunagala',
    email: 'jane.smith@example.com',
    password: 'pass98765',
    dob: '1990-06-20',
    contactNo: '321-654-0987',
    review: 'Excellent in business management lectures.',
    payRate: 47.5,
    qualifications: ["PGD"],
    picture:
      '../../../src/images/user/user-02.png',
    status: 'ACTIVE',
    isAssigned: false,
    languages: 'English, French',
  },
  {
    id: 3,
    name: 'Michael Brown',
    district: 'Nuwareliya',
    email: 'michael.brown@example.com',
    password: 'securePass80',
    dob: '1977-10-11',
    contactNo: '309-413-5566',
    payRate: 60.0,
    status: 'INACTIVE',
    isAssigned: false,
    qualifications: ["BSc"],
    picture:
      '../../../src/images/user/user-03.png',
  },
  {
    id: 4,
    name: 'Emily White',
    district: 'Galle',
    email: 'emily.white@example.com',
    password: 'passstrong77',
    dob: '1980-12-21',
    contactNo: '425-862-5540',
    payRate: 40.0,
    status: 'ACTIVE',
    review: 'Amazing at explaining complex concepts.',
    qualifications: ["MSc"],
    picture:
      '../../../src/images/user/user-04.png',
    isAssigned: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    district: 'Kandy',
    email: 'jane.smith@example.com',
    password: 'pass98765',
    dob: '1990-06-20',
    contactNo: '321-654-0987',
    review: 'Excellent in business management lectures.',
    payRate: 47.5,
    qualifications: ["PhD"],
    picture:
      '../../../src/images/user/user-05.png',
    status: 'ACTIVE',
    isAssigned: false,
    languages: 'English, French',
  },
  {
    id: 5,
    name: 'Daniel Wilson',
    district: 'Colombo',
    email: 'daniel.wilson@example.com',
    password: 'securePass90',
    dob: '1979-08-11',
    contactNo: '456-231-7566',
    payRate: 40.0,
    status: 'INACTIVE',
    review: 'Amazing at explaining Agile concepts',
    qualifications: ["HND"],
    picture:
      '../../../src/images/user/user-06.png',
    isAssigned: false,
  },
  {
    id: 1,
    name: 'John Doe',
    district: 'Kurunagala',
    email: 'john.doe@example.com',
    password: 'password123',
    dob: '1985-02-15',
    contactNo: '123-456-7890',
    review: 'Highly enthusiastic and motivating.',
    payRate: 55.0,
    qualifications: ["PGD"],
    picture:
      '../../../src/images/user/user-07.png', // Dummy image URL (replace with actual image if needed)
    status: 'ACTIVE',
    isAssigned: true,
    languages: 'English, Spanish',
  },

  {
    id: 3,
    name: 'Michael Brown',
    district: 'Matale',
    email: 'michael.brown@example.com',
    password: 'securePass80',
    dob: '1977-10-11',
    contactNo: '309-413-5566',
    payRate: 60.0,
    status: 'INACTIVE',
    isAssigned: false,
    qualifications: ["BSc"],
    picture:
      '../../../src/images/user/user-08.png',
  },
  {
    id: 5,
    name: 'Daniel Wilson',
    district: 'Nuwareliya',
    email: 'daniel.wilson@example.com',
    password: 'securePass90',
    dob: '1979-08-11',
    contactNo: '456-231-7566',
    payRate: 40.0,
    status: 'INACTIVE',
    review: 'Amazing at explaining Agile concepts',
    qualifications: ["MSc"],
    picture:
      '../../../src/images/user/user-09.png',
    isAssigned: false,
  },
  {
    id: 4,
    name: 'Emily White',
    district: 'Galle',
    email: 'emily.white@example.com',
    password: 'passstrong77',
    dob: '1980-12-21',
    contactNo: '425-862-5540',
    payRate: 40.0,
    status: 'ACTIVE',
    review: 'Amazing at explaining complex concepts.',
    qualifications: ["PhD"],
    picture:
      '../../../src/images/user/user-10.png',
    isAssigned: true,
  },]


// Dropdown options
const districtOptions = ['Kandy', 'Colombo', 'Kurunagala', 'Matale', 'Nuwareliya', 'Galle'];
const qualificationOptions = ['PhD', 'MSc', 'BSc', 'PGD', 'HND'];
const hourlyRateOptions = ['1000-1500', '1500-2000', '2000-3000', '3000<'];
const isAssignedOptions = ["true", "false"];
const languageOptions = ['English', 'Sinhala', 'Tamil'];

const FilteredSubjects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [filteredLecturers, setFilteredLecturers] = useState([]);

  const itemsPerPage = 5; // Number of lecturers per page

  // Calculate pagination indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLecturers = filteredLecturers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(lecturers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNavigation = (path: string) => {
    navigate(path); // Route navigation
  };

  const formik = useFormik({
    initialValues: {
      district: '',
      qualification: '',
      hourlyRate: '',
      isAssigned: '',
      language: '',
    },
    onSubmit: (values) => {
      // Filtering logic based on form values
      const filtered = lecturers.filter((lecturer) => {
        return (
          (!values.district || lecturer.district === values.district) &&
          (!values.qualification ||
            lecturer.qualifications?.includes(values.qualification)) &&
          (!values.hourlyRate ||
            (values.hourlyRate === '1000-1500' &&
              lecturer.payRate >= 1000 &&
              lecturer.payRate <= 1500) ||
            (values.hourlyRate === '1500-2000' &&
              lecturer.payRate > 1500 &&
              lecturer.payRate <= 2000) ||
            (values.hourlyRate === '2000-3000' &&
              lecturer.payRate > 2000 &&
              lecturer.payRate <= 3000) ||
            (values.hourlyRate === '3000<' && lecturer.payRate > 3000)) &&
          (!values.isAssigned ||
            (values.isAssigned === 'Yes' && lecturer.isAssigned) ||
            (values.isAssigned === 'No' && !lecturer.isAssigned)) &&
          (!values.language ||
            lecturer.languages
              ?.toLowerCase()
              .includes(values.language.toLowerCase()))
        );
      });

      // Set the filtered lecturers to display in the table
      // @ts-ignore
      setFilteredLecturers(filtered);
    },
  });

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
      <Breadcrumb pageName="Filtered Subjects" />

      {/* Filters Section */}
      <div className="mb-4 p-4 bg-white dark:bg-boxdark shadow-md rounded-md">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-wrap gap-4 items-center justify-between"
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

          {/* Search Button */}
          <div className="flex items-end">
            <button
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
              {currentLecturers.map((lecturer: Lecturer, key) => (
                <tr
                  key={key+lecturer.id}
                  className="hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {lecturer.picture ? (
                      <img
                        src={lecturer.picture}
                        alt={lecturer.name}
                        className="h-12 w-12 rounded-full"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-300 text-black dark:bg-gray-700 dark:text-white flex items-center justify-center rounded-full">
                        No Img
                      </div>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {lecturer.name}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {lecturer.qualifications ? lecturer.qualifications[0] : 'N/A'}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {lecturer.contactNo ?? 'N/A'}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    ${lecturer.payRate.toFixed(2)}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          lecturer.isAssigned
                            ? 'bg-success bg-opacity-10 text-success'
                            : 'bg-warning bg-opacity-10 text-warning'
                        }`}
                      >
                        {lecturer.isAssigned ? 'Assigned' : 'Unassigned'}
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
      </div>
    </>
  );
};

export default FilteredSubjects;