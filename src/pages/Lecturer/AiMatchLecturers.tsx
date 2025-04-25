import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import Loader from '../../common/Loader/Loader.tsx';
import lecturerService from '../../services/lecturerService.ts';
import { useData } from '../../context/MainContext.tsx';
import dummyProfileImg from '../../images/user/profile_dummy.png';
import { LecturerRes } from '../../types/lecturerTypes/lecturerRes.ts';
import { InstituteRes } from '../../types/instituteTypes/instituteRes.ts';
import { AiMatchRequest } from '../../types/lecturerTypes/AiMatchRequest.ts';
import { Recommendation } from '../../types/lecturerTypes/AiMatchResponse.ts';

const AiMatchLecturers = () => {
  //@ts-ignore
  const instituteData: InstituteRes | null = useData();
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [matchedLecturers, setMatchedLecturers] = useState<any>(null);
  const [lecturersToDisplay, setLecturersToDisplay] = useState([] as LecturerRes[]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (instituteData?.programs) {
      const subjectNames = instituteData.programs.flatMap((program: any) =>
        program.subjects?.map((subject: any) => subject.name) || []
      );
      setSubjects(subjectNames);
      setSelectedSubject(subjectNames[0]);
    }
  }, []);

  const { mutate: getAiMatchPrediction, isLoading: isGettingAiMatchPrediction } = useMutation(
    lecturerService.getAiMatchPrediction,
    {
      onSuccess: (data) => {
        setMatchedLecturers(data);
      },
      onError: () => {
        alert('Failed to retrieve AI-matched lecturers.');
      },
    }
  );

  const handleAiMatch = () => {

    const programDetails = instituteData?.programs?.find((program) =>
      program?.subjects?.some((subject) => subject.name === selectedSubject)
    );

    if (!programDetails) {
      throw new Error("Program not found for the selected subject.");
    }

    const subjectDetails = programDetails?.subjects?.find(
      (subject) => subject.name === selectedSubject
    );

    if (!subjectDetails) {
      throw new Error("Subject details not found.");
    }

    const payload : AiMatchRequest = {
      program: programDetails.name?.toLowerCase(),
      hourlyPay: programDetails.hourlyPayRate,
      level: programDetails.level.toLowerCase(),
      time_pref: programDetails.timePreference.toLowerCase(),
      studentCount: programDetails.studentCount,
      subject: subjectDetails.name?.toLowerCase(),
      noOfCredits: subjectDetails.noOfCredits,
      instituteRating: instituteData?.currentRating,
      duration: programDetails?.durationInDays,
      division: instituteData?.division.toLowerCase(),
      status: instituteData?.status.toLowerCase(),
      language: programDetails.language.toLowerCase(),
    };

    getAiMatchPrediction(payload);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const fetchLecturers = async (lecturerIds: number[]) => {
    let lecturerDetails;
    try {
      lecturerDetails = await Promise.all(
        lecturerIds?.map((lecturerId) => {
          if (lecturerId !== 0) {
            return lecturerService?.getLecturerById({ lecturerId });
          }
        }),
      );
    } catch (error) {
      console.error('Error fetching lecturer details:', error);
    }

    return lecturerDetails;
  };

  useEffect(() => {
    if (matchedLecturers?.top_3_recommendations) {
      const lecturerIds = matchedLecturers?.top_3_recommendations?.map(
        (recommendation: Recommendation) => recommendation.lecturer_id
      );
      fetchLecturers(lecturerIds).then((data) => {
        //@ts-expect-error
        setLecturersToDisplay(data);
      });
    }
  }, [matchedLecturers?.top_3_recommendations]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || isGettingAiMatchPrediction) {
    return <Loader />;
  }

  const getHighestQualification = (lecturer: LecturerRes) => {
    const priority = ["DOCTORATE", "MASTERS", "BACHELORS", "HND", "POSTGRADUATE", "HNC"];
    const qualifications = lecturer?.qualifications?.map(q => q.level.toUpperCase()) || [];

    return priority.find(level => qualifications.includes(level)) ?? "N/A";
  };

  const currentLecturers = lecturersToDisplay?.filter((lec) => lec?.name !== undefined);

  return (
    <>
      <Breadcrumb pageName="AI Match Lecturers" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAiMatch();
        }}
        className="flex justify-center items-center gap-10"
      >
        {/* Subject Dropdown */}
        <div className="mb-5">
          <label
            htmlFor="subject"
            className="block text-sm font-medium mb-2"
          >
            Select Subject
          </label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className={`block w-full rounded rounded-md border-[1.5px] border-2 border-gray-500 py-2 px-5 outline-none w-40 transition 'border-gray-300 focus:border-primary dark:bg-gray-800`}
          >
            {subjects.map((subject, index) => (
              <option key={index + subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="flex mb-5">
          <button
            type="submit"
            className="mt-5 w-full hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
            id={'ai-match-btn'}
          >
            <svg
              width="32"
              data-name="Layer 1"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M335 156.17H177A20.85 20.85 0 0 0 156.17 177v158A20.85 20.85 0 0 0 177 355.83h158A20.85 20.85 0 0 0 355.83 335V177A20.85 20.85 0 0 0 335 156.17ZM346 335a11 11 0 0 1-11 11H177a11 11 0 0 1-11-11V177a11 11 0 0 1 11-11h158a11 11 0 0 1 11 11ZM172 140.4h168a4.93 4.93 0 0 0 0-9.86h-16.17V88.41a4.93 4.93 0 0 0-9.86 0v42.13H292V66.28a4.93 4.93 0 0 0-9.86 0v64.26h-22V88.41a4.93 4.93 0 0 0-9.86 0v42.13h-22V66.28a4.93 4.93 0 0 0-9.86 0v64.26h-22V88.41a4.93 4.93 0 0 0-9.86 0v42.13H172a4.93 4.93 0 1 0 0 9.86ZM340 371.6H172a4.93 4.93 0 0 0 0 9.86h16.18v42.13a4.93 4.93 0 0 0 9.86 0v-42.13h22v64.26a4.93 4.93 0 0 0 9.86 0v-64.26h22v42.13a4.93 4.93 0 0 0 9.86 0v-42.13h22v64.26a4.93 4.93 0 0 0 9.86 0v-64.26h22v42.13a4.93 4.93 0 0 0 9.86 0v-42.13H340a4.93 4.93 0 1 0 0-9.86ZM445.71 282.1h-64.26v-22h42.15a4.93 4.93 0 0 0 0-9.85h-42.15v-22h64.26a4.93 4.93 0 1 0 0-9.85h-64.26v-22h42.15a4.93 4.93 0 0 0 0-9.85h-42.15V172a4.93 4.93 0 0 0-9.86 0v168a4.93 4.93 0 0 0 9.86 0v-16.17h42.15a4.93 4.93 0 0 0 0-9.85h-42.15V292h64.26a4.93 4.93 0 1 0 0-9.85ZM135.47 167.06a4.92 4.92 0 0 0-4.93 4.92v16.19H88.4a4.93 4.93 0 0 0 0 9.85h42.14v22H66.29a4.93 4.93 0 1 0 0 9.85h64.25v22H88.4a4.93 4.93 0 0 0 0 9.85h42.14v22H66.29a4.93 4.93 0 1 0 0 9.85h64.25v22H88.4a4.93 4.93 0 0 0 0 9.85h42.14V340a4.93 4.93 0 0 0 9.85 0V172a4.92 4.92 0 0 0-4.92-4.94Z"
                fill="#ffffff"
                className="fill-000000"
              ></path>
              <path
                d="M241.79 207.56c-1.38-3.93-7.9-3.93-9.29 0l-22 62.38-2.45 6.95v.07l-8.52 24.2a4.91 4.91 0 0 0 3 6.28 4.81 4.81 0 0 0 1.64.29 4.94 4.94 0 0 0 4.65-3.29l7.39-21h41.9l7.4 21a4.93 4.93 0 0 0 9.29-3.28Zm-22.11 66 3.26-9.24a.56.56 0 0 1 0-.12l14.21-40.2 17.47 49.58ZM307.84 204.27a4.93 4.93 0 0 0-4.93 4.93v93.6a4.93 4.93 0 1 0 9.85 0v-93.6a4.93 4.93 0 0 0-4.92-4.93Z"
                fill="#ffffff"
                className="fill-000000"
              ></path>
            </svg>
            AI Match
          </button>
        </div>
      </form>

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
                    Division in Colombo
                  </th>
                  <th className="min-w-[150px] py-4 px-4 text-left font-medium text-black dark:text-white">
                    Contact Number
                  </th>
                  <th
                    className="min-w-[100px] py-4 px-4 text-left font-medium text-black dark:text-white cursor-pointer"
                  >
                    Hourly Rate (LKR){' '}
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
                {currentLecturers?.length === 0 ? (
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
                            'doctorate'
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
                        {lecturer?.division ?? 'N/A'}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {lecturer?.contactNo ?? 'N/A'}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {lecturer?.hourlyPayRate?.toLocaleString()}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AiMatchLecturers;