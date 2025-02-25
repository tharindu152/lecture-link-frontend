import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Link, useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import Loader from '../../common/Loader/Loader.tsx';
import { useQuery } from 'react-query';
import LecturerService from '../../services/lecturerService.ts';
import { Subject } from '../../types/subject.ts';

const Lecturer = () => {

  const [rating, setRating] = useState(0);
  const location = useLocation();
  const { pathname } = location;

  const {
    data: lecturer,
    isLoading: isLoadingLecturer,
  } = useQuery(['getLecturerById'], () => LecturerService.getLecturerById({lecturerId:pathname.slice(15)}));


  if (isLoadingLecturer) {
    return <Loader />;
  }

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
                src={lecturer?.picture}
                alt="lecturer-profile"
                className="mx-auto md:-mt-3 md:-ml-3 sm:-mt-3 sm:-ml-3 -mt-1 -ml-1 h-30 max-w-30 rounded-full p-1 sm:h-44 sm:max-w-44 sm:p-3"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 p-4">
            <h3 className="mb-4 text-3xl font-semibold text-black dark:text-white text-center md:text-left">
              {lecturer?.name}
            </h3>

            <div className="space-y-3">
              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  Lecturer ID:
                </h4>
                <p>{lecturer?.id}</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  E-mail:
                </h4>
                <p>{lecturer?.email}</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  Telephone Number:
                </h4>
                <p>{lecturer?.contactNo}</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  District:
                </h4>
                <p>{lecturer?.district}</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  Date of Birth:
                </h4>
                <p>{lecturer?.dob}</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  Hourly Rate:
                </h4>
                <p>LKR {lecturer?.payRate}</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  Status:
                </h4>
                <p>{lecturer?.status}</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-44">
                  Languages:
                </h4>
                <p>{lecturer?.languages}</p>
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
                      onClick={() => setRating((lecturer?.review?.split(" ").length ?? 0) % 6)}
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

              {lecturer?.subjects && (
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                  <h4 className="font-semibold text-black dark:text-white sm:w-40">
                    Assigned Subjects:
                  </h4>
                  <ul className="list-disc flex-1 pl-4">
                    {lecturer?.subjects.map((subject : Subject, index) => (
                      <li key={index + subject.name}>{subject.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {lecturer?.qualifications && (
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                  <h4 className="font-semibold text-black dark:text-white sm:w-40">
                    Qualifications:
                  </h4>
                  <ul className="list-disc flex-1 pl-4">
                    {lecturer?.qualifications.map((qualification, index) => (
                      <li key={index + qualification.name}>{qualification.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-black dark:text-white">
                  Review:
                </h4>
                <p className="mt-1.5">
                  {lecturer?.review}
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