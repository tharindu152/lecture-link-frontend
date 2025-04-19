import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../common/Loader/Loader.tsx';
import dummyLogo from '../../images/brand/logo_dummy.jpg';
import { useQuery } from 'react-query';
import InstituteService from '../../services/instituteService.ts';
import StarRating from '../../components/StarRate/StarRating.tsx';
import { Rating } from '@mui/material';

const Institute = () => {
  // @ts-ignore
  const location = useLocation();
  const { pathname } = location;

  const { data: institute, isLoading: isLoadingInstitutes } = useQuery(
    ['getInstituteById', pathname.slice(16)],
    () => InstituteService.getInstituteById({ instituteId: pathname.slice(16) }),
  );

  const [expandedProgramIds, setExpandedProgramIds] = useState<number[]>([]);

  const toggleSubjects = (programId: number) => {
    if (expandedProgramIds.includes(programId)) {
      setExpandedProgramIds(
        expandedProgramIds.filter((id) => id !== programId),
      );
    } else {
      setExpandedProgramIds([...expandedProgramIds, programId]);
    }
  };

  document.addEventListener('mousemove', () => {
    // @ts-ignore
    setRating(institute?.currentRating)
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || isLoadingInstitutes) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Institute Profile" />

      <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Responsive Wrapper */}
        <div className="flex flex-col md:flex-row items-center md:items-start px-4 pb-6 text-left lg:pb-8 xl:pb-11.5">
          {/* Logo Section */}
          <div className="relative z-30 mx-auto mt-5 mb-4 md:mb-0 md:ml-1 md:mr-4 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img
                src={institute?.logo ?? dummyLogo}
                alt="profile"
                className="mx-auto md:-mt-3 md:-ml-3 sm:-mt-3 sm:-ml-3 -mt-1 -ml-1 h-30 max-w-30 rounded-full p-1 sm:h-44 sm:max-w-44 sm:p-3"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 p-4">
            <h3 className="mb-4 text-3xl font-semibold text-black dark:text-white text-center md:text-left">
              {institute?.name}
            </h3>

            <div className="space-y-3">

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-56">
                  E-mail:
                </h4>
                <p>{institute?.email}</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-56">
                  Telephone Number:
                </h4>
                <p>{institute?.telephone}</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-56">
                  Division:
                </h4>
                <p>{institute?.division}</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-56">
                  Rating:
                </h4>
                <div className="flex items-center">
                  <Rating
                    value={institute?.currentRating}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-56">
                  Subscribed:
                </h4>
                <p>{institute?.subscribed ? 'Yes' : 'No'}</p>
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <h4 className="font-semibold text-black dark:text-white w-full md:w-52">
                  Programs & Subjects:
                </h4>
                <ul className="flex-1 w-full">
                  {institute?.programs?.map((program) => (
                    <li key={program.id} className="mb-2">
                      <div
                        className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
                        // @ts-ignore
                        onClick={() => toggleSubjects(program.id)}
                      >
                            <span
                              className={`transition-transform duration-300 ${
                                // @ts-ignore
                                expandedProgramIds.includes(program.id)
                                  ? 'rotate-90'
                                  : 'rotate-0'
                              }`}
                            >
                              ▶
                            </span>
                        <span className="ml-1">{program.name} Program</span>
                      </div>
                      <ul
                        className={`overflow-hidden transition-max-h duration-300 ease-in-out ${
                          // @ts-ignore
                          expandedProgramIds.includes(program.id)
                            ? 'max-h-screen'
                            : 'max-h-0'
                        } pl-9`}
                      >
                        {program?.subjects?.map((subject) => (
                          <li key={subject.id} className="list-disc">
                            {subject.name}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-black dark:text-white">
                  Description:
                </h4>
                <p className="mt-1.5">{institute?.description}</p>
              </div>
            </div>
            <StarRating instituteId={institute?.id} marginLeft={10}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Institute;