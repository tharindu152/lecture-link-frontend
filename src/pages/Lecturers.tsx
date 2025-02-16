import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
  preference?: string;
  picture?: string; // Path to image (Optional for dummy data)
  status: 'ACTIVE' | 'INACTIVE';
  isAssigned: boolean;
  languages?: string;
};

const lecturers: Lecturer[] = [
  {
    id: 1,
    name: 'John Doe',
    district: 'California',
    email: 'john.doe@example.com',
    password: 'password123',
    dob: '1985-02-15',
    contactNo: '123-456-7890',
    review: 'Highly enthusiastic and motivating.',
    payRate: 55.0,
    preference: 'PhD in Computer Science',
    picture:
      '../../../src/images/user/user-01.png', // Dummy image URL (replace with actual image if needed)
    status: 'ACTIVE',
    isAssigned: true,
    languages: 'English, Spanish',
  },
  {
    id: 2,
    name: 'Jane Smith',
    district: 'New York',
    email: 'jane.smith@example.com',
    password: 'pass98765',
    dob: '1990-06-20',
    contactNo: '321-654-0987',
    review: 'Excellent in business management lectures.',
    payRate: 47.5,
    preference: 'MBA',
    picture:
      '../../../src/images/user/user-02.png',
    status: 'ACTIVE',
    isAssigned: false,
    languages: 'English, French',
  },
  {
    id: 3,
    name: 'Michael Brown',
    district: 'Texas',
    email: 'michael.brown@example.com',
    password: 'securePass80',
    dob: '1977-10-11',
    contactNo: '309-413-5566',
    payRate: 60.0,
    status: 'INACTIVE',
    isAssigned: false,
    preference: 'Masters in Data Science',
    picture:
      '../../../src/images/user/user-03.png',
  },
  {
    id: 4,
    name: 'Emily White',
    district: 'Washington',
    email: 'emily.white@example.com',
    password: 'passstrong77',
    dob: '1980-12-21',
    contactNo: '425-862-5540',
    payRate: 40.0,
    status: 'ACTIVE',
    review: 'Amazing at explaining complex concepts.',
    preference: 'MA in Teaching',
    picture:
      '../../../src/images/user/user-04.png',
    isAssigned: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    district: 'New York',
    email: 'jane.smith@example.com',
    password: 'pass98765',
    dob: '1990-06-20',
    contactNo: '321-654-0987',
    review: 'Excellent in business management lectures.',
    payRate: 47.5,
    preference: 'MBA',
    picture:
      '../../../src/images/user/user-05.png',
    status: 'ACTIVE',
    isAssigned: false,
    languages: 'English, French',
  },
  {
    id: 5,
    name: 'Daniel Wilson',
    district: 'Texas',
    email: 'daniel.wilson@example.com',
    password: 'securePass90',
    dob: '1979-08-11',
    contactNo: '456-231-7566',
    payRate: 40.0,
    status: 'INACTIVE',
    review: 'Amazing at explaining Agile concepts',
    preference: 'Masters Scrum Teaching',
    picture:
      '../../../src/images/user/user-06.png',
    isAssigned: false,
  },
  {
    id: 1,
    name: 'John Doe',
    district: 'California',
    email: 'john.doe@example.com',
    password: 'password123',
    dob: '1985-02-15',
    contactNo: '123-456-7890',
    review: 'Highly enthusiastic and motivating.',
    payRate: 55.0,
    preference: 'PhD in Computer Science',
    picture:
      '../../../src/images/user/user-07.png', // Dummy image URL (replace with actual image if needed)
    status: 'ACTIVE',
    isAssigned: true,
    languages: 'English, Spanish',
  },

  {
    id: 3,
    name: 'Michael Brown',
    district: 'Texas',
    email: 'michael.brown@example.com',
    password: 'securePass80',
    dob: '1977-10-11',
    contactNo: '309-413-5566',
    payRate: 60.0,
    status: 'INACTIVE',
    isAssigned: false,
    preference: 'Masters in Data Science',
    picture:
      '../../../src/images/user/user-08.png',
  },
  {
    id: 5,
    name: 'Daniel Wilson',
    district: 'Texas',
    email: 'daniel.wilson@example.com',
    password: 'securePass90',
    dob: '1979-08-11',
    contactNo: '456-231-7566',
    payRate: 40.0,
    status: 'INACTIVE',
    review: 'Amazing at explaining Agile concepts',
    preference: 'Masters Scrum Teaching',
    picture:
      '../../../src/images/user/user-09.png',
    isAssigned: false,
  },
  {
    id: 4,
    name: 'Emily White',
    district: 'Washington',
    email: 'emily.white@example.com',
    password: 'passstrong77',
    dob: '1980-12-21',
    contactNo: '425-862-5540',
    payRate: 40.0,
    status: 'ACTIVE',
    review: 'Amazing at explaining complex concepts.',
    preference: 'MA in Teaching',
    picture:
      '../../../src/images/user/user-10.png',
    isAssigned: true,
  },


  // Add more lecturer profiles up to at least 10 if required
];

const Lecturers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 5; // Number of lecturers per page

  // Calculate pagination indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLecturers = lecturers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(lecturers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNavigation = (path: string) => {
    navigate(path); // Route navigation
  };

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
              {currentLecturers.map((lecturer, key) => (
                <tr key={key+lecturer} className="hover:bg-gray-200 dark:hover:bg-gray-800">
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
                    {lecturer.preference ?? 'N/A'}
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
                          handleNavigation(`/app/lecturers/${lecturer.id}`)
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
                      <button
                        className="hover:text-warning"
                        title="Edit"
                        onClick={() =>
                          handleNavigation(`/app/lecturers/add-lecturer`)
                        }
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g data-name="Layer 18">
                            <path
                              d="M2 31a1 1 0 0 1-1-1.11l.9-8.17a1 1 0 0 1 .29-.6L21.27 2.05a3.56 3.56 0 0 1 5.05 0L30 5.68a3.56 3.56 0 0 1 0 5.05L10.88 29.8a1 1 0 0 1-.6.29L2.11 31Zm8.17-1.91Zm-6.31-6.81-.73 6.59 6.59-.73L28.54 9.31a1.58 1.58 0 0 0 0-2.22l-3.63-3.63a1.58 1.58 0 0 0-2.22 0Z"
                              className="fill-101820"
                            ></path>
                            <path
                              d="M26.52 13.74a1 1 0 0 1-.7-.29l-7.27-7.27A1 1 0 0 1 20 4.77L27.23 12a1 1 0 0 1 0 1.41 1 1 0 0 1-.71.33Z"
                              className="fill-101820"
                            ></path>
                            <path
                              transform="rotate(-45 14.719 17.283)"
                              d="M8.29 16.28h12.84v2H8.29z"
                              className="fill-101820"
                            ></path>
                          </g>
                        </svg>
                      </button>
                      <button className="hover:text-danger" title="Delete">
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
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

        {/* Add New Lecturer Button */}
        <Link
          to="/app/lecturers/add-lecturer"
          className="mt-4 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
        >
          <svg
            width="18"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 14H18V4a2 2 0 0 0-4 0v10H4a2 2 0 0 0 0 4h10v10a2 2 0 0 0 4 0V18h10a2 2 0 0 0 0-4z"
              fill="currentColor"
              className="fill-current"
            ></path>
          </svg>
          Add New Lecturer
        </Link>
      </div>
    </>
  );
};

export default Lecturers;