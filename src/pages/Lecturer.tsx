import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import lecturerImage from '../images/user/user-02.png';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

const Lecturer = () => {
  const qualifications = [
    'BSc in Computer Science',
    'MSc in Artificial Intelligence',
    'PhD in Machine Learning',
    'Certified Data Scientist',
  ];

  const subjects = [
    'Computer Science',
    'Artificial Intelligence',
    'Machine Learning',
    'Data Scientist',
  ];

  const [rating, setRating] = useState(0);

  return (
    <>
      <Breadcrumb pageName="Lecturer Profile" />

      <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Responsive Wrapper */}
        <div className="flex flex-col md:flex-row items-center md:items-start px-4 pb-6 text-left lg:pb-8 xl:pb-11.5">
          {/* Profile Picture Section */}
          <div className="relative z-30 mx-auto mt-5 mb-4 md:mb-0 md:ml-1 md:mr-4 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img
                src={lecturerImage}
                alt="lecturer-profile"
                className="mx-auto md:-mt-3 md:-ml-3 sm:-mt-3 sm:-ml-3 -mt-1 -ml-1 h-30 max-w-30 rounded-full p-1 sm:h-44 sm:max-w-44 sm:p-3"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 p-4">
            <h3 className="mb-4 text-3xl font-semibold text-black dark:text-white text-center md:text-left">
              Dr. John Doe
            </h3>

            <div className="space-y-3">
              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  Lecturer ID:
                </h4>
                <p>LEC-102345</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  E-mail:
                </h4>
                <p>john.doe@university.edu</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  Telephone Number:
                </h4>
                <p>+94123456789</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  District:
                </h4>
                <p>Kandy</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  Date of Birth:
                </h4>
                <p>01/04/1995</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  Hourly Rate:
                </h4>
                <p>LKR 2500</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  Status:
                </h4>
                <p>ACTIVE</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  Languages:
                </h4>
                <p>English, Sinhala</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  Rating:
                </h4>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <FaStar
                        size={20}
                        className={
                          star <= rating ? 'text-yellow-500' : 'text-gray-400'
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              {subjects && (
                <div className="flex gap-4">
                  <h4 className="font-semibold text-black dark:text-white w-40">
                    Assigned Subjects:
                  </h4>
                  <ul className="list-disc flex-1 pl-4">
                    {subjects.map((subject, index) => (
                      <li key={index+subject}>{subject}</li>
                    ))}
                  </ul>
                </div>
              )}

              {qualifications && (
                <div className="flex gap-4">
                  <h4 className="font-semibold text-black dark:text-white w-40">
                    Qualifications:
                  </h4>
                  <ul className="list-disc flex-1 pl-4">
                    {qualifications.map((qualification, index) => (
                      <li key={index+qualification}>{qualification}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-black dark:text-white">
                  Description:
                </h4>
                <p className="mt-1.5">
                  Dr. John Doe is a senior lecturer at the University of XYZ,
                  specializing in Machine Learning and Artificial Intelligence.
                  With 15+ years of experience, Dr. Doe has worked on numerous
                  research projects and published extensively in the field of
                  data science.
                </p>
              </div>
            </div>

            <Link
              to="/app/lecturers/add-lecturer"
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
              Update Lecturer
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lecturer;