import { Program } from '../../types/instituteTypes/program.ts';
import { Level } from '../../types/enums/level.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const programs: Program[] = [
  {
    id: 1,
    name: 'Computer Science',
    description: 'A comprehensive program covering core concepts in computing.',
    level: Level.BSC,
    durationInDays: 700,
    studentCount: 150,
    batchId: 'CS-B2023',
    payment: 1000.0,
    instituteId: 101,
    subjects: [
      {
        id: 1,
        name: 'Data Structures',
        noOfCredits: 3,
        isAssigned: true,
        lecturerId: 202,
      },
      {
        id: 2,
        name: 'Operating Systems',
        noOfCredits: 4,
        isAssigned: true,
        lecturerId: 203,
      },
    ],
  },
  {
    id: 2,
    name: 'Business Administration',
    description:
      'A program focused on developing business and management skills.',
    level: Level.MSC,
    durationInDays: 900,
    studentCount: 50,
    batchId: 'BA-M2023',
    payment: 1500.0,
    instituteId: 102,
    subjects: [
      { id: 3, name: 'Strategic Management', noOfCredits: 4, isAssigned: true },
      {
        id: 4,
        name: 'Corporate Finance',
        noOfCredits: 3,
        isAssigned: true,
        lecturerId: 204,
      },
    ],
  },
  {
    id: 3,
    name: 'Software Engineering',
    description: 'Combining programming skills with engineering principles.',
    level: Level.HND,
    durationInDays: 600,
    studentCount: 200,
    batchId: 'SE-H2023',
    payment: 800.0,
    instituteId: 103,
    subjects: [
      {
        id: 5,
        name: 'Object-Oriented Programming',
        noOfCredits: 3,
        isAssigned: true,
      },
      {
        id: 6,
        name: 'Agile Development',
        noOfCredits: 2,
        isAssigned: true,
        lecturerId: 205,
      },
    ],
  },
  {
    id: 4,
    name: 'Cybersecurity',
    description: 'A program focused on protecting systems and networks.',
    level: Level.PGD,
    durationInDays: 365,
    studentCount: 30,
    batchId: 'CY-P2023',
    payment: 1200.0,
    instituteId: 104,
    subjects: [
      {
        id: 7,
        name: 'Network Security',
        noOfCredits: 4,
        isAssigned: true,
        lecturerId: 206,
      },
      { id: 8, name: 'Ethical Hacking', noOfCredits: 3, isAssigned: true },
    ],
  },
  {
    id: 1,
    name: 'Computer Science',
    description: 'A comprehensive program covering core concepts in computing.',
    level: Level.BSC,
    durationInDays: 700,
    studentCount: 150,
    batchId: 'CS-B2023',
    payment: 1000.0,
    instituteId: 101,
    subjects: [
      {
        id: 1,
        name: 'Data Structures',
        noOfCredits: 3,
        isAssigned: true,
        lecturerId: 202,
      },
      {
        id: 2,
        name: 'Operating Systems',
        noOfCredits: 4,
        isAssigned: true,
        lecturerId: 203,
      },
    ],
  },
  {
    id: 2,
    name: 'Business Administration',
    description:
      'A program focused on developing business and management skills.',
    level: Level.MSC,
    durationInDays: 900,
    studentCount: 50,
    batchId: 'BA-M2023',
    payment: 1500.0,
    instituteId: 102,
    subjects: [
      { id: 3, name: 'Strategic Management', noOfCredits: 4, isAssigned: true },
      {
        id: 4,
        name: 'Corporate Finance',
        noOfCredits: 3,
        isAssigned: true,
        lecturerId: 204,
      },
    ],
  },
  {
    id: 3,
    name: 'Software Engineering',
    description: 'Combining programming skills with engineering principles.',
    level: Level.HND,
    durationInDays: 600,
    studentCount: 200,
    batchId: 'SE-H2023',
    payment: 800.0,
    instituteId: 103,
    subjects: [
      {
        id: 5,
        name: 'Object-Oriented Programming',
        noOfCredits: 3,
        isAssigned: true,
      },
      {
        id: 6,
        name: 'Agile Development',
        noOfCredits: 2,
        isAssigned: true,
        lecturerId: 205,
      },
    ],
  },
  {
    id: 4,
    name: 'Cybersecurity',
    description: 'A program focused on protecting systems and networks.',
    level: Level.PGD,
    durationInDays: 365,
    studentCount: 30,
    batchId: 'CY-P2023',
    payment: 1200.0,
    instituteId: 104,
    subjects: [
      {
        id: 7,
        name: 'Network Security',
        noOfCredits: 4,
        isAssigned: true,
        lecturerId: 206,
      },
      { id: 8, name: 'Ethical Hacking', noOfCredits: 3, isAssigned: true },
    ],
  },
];

const TableThree = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 5; // Define how many items to display per page.

  // Calculate the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPrograms = programs.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(programs.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNavigation = (path: string) => {
    navigate(path); // Navigate to the desired route
  };


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Program
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Student Count
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Duration (Months)
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Level
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPrograms.map((program, key) => (
              <tr
                key={key}
                className={'hover:bg-gray-200 dark:hover:bg-gray-800'}
              >
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {program.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {program.studentCount}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {Math.ceil(program.durationInDays / 30)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      program.level === 'MSc'
                        ? 'bg-danger text-danger'
                        : program.level === 'BSc'
                        ? 'bg-primary text-primary'
                        : program.level === 'PGD'
                        ? 'bg-warning text-warning'
                        : program.level === 'HND'
                        ? 'bg-success text-success'
                        : ''
                    }`}
                  >
                    {program.level}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary" title="View" onClick={() => handleNavigation(`/programs/${program.id}`)}>
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
                    <button className="hover:text-warning" title="Edit" onClick={() => handleNavigation(`/programs/add-program`)}>
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
                    <button className="hover:text-danger" title="View">
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
  );
};

export default TableThree;
