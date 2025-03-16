import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect, useState } from 'react';
import Loader from '../../common/Loader/Loader.tsx';
import dummyLogo from '../../images/brand/logo_dummy.jpg';
import lectureLinkLogo from '../../images/logo/LectureLinkLogoDark.png';

const About = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }
    
    return (
      <>
        <Breadcrumb pageName="About" />

        <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* Responsive Wrapper */}
          <div className="flex flex-col md:flex-row items-center md:items-start px-4 pb-6 text-left lg:pb-8 xl:pb-11.5">
            {/* Logo Section */}
            <div className="relative z-30 mx-auto mt-5 mb-4 md:mb-0 md:ml-1 md:mr-4 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <img
                  src={lectureLinkLogo ?? dummyLogo}
                  alt="profile"
                  className="mx-auto md:-mt-3 md:-ml-3 sm:-mt-3 sm:-ml-3 -mt-1 -ml-1 h-30 max-w-30 rounded-full p-1 sm:h-44 sm:max-w-44 sm:p-3"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="flex-1 p-4">
              <h3 className="mb-4 text-3xl font-semibold text-black dark:text-white text-center md:text-left">
                Lecture Link
              </h3>

              <div>
                <h4 className="font-semibold text-black dark:text-white">
                  Description:
                </h4>
                <p className="mt-1.5 mb-1.5">
                  This application is designed to make it easier for academic
                  institutions to connect with qualified lecturers, creating a
                  smoother and more efficient matching process. By doing so, we
                  help tackle recruitment challenges, enhance teaching quality,
                  and ensure students have access to skilled professionals for a
                  better learning experience.
                  <br />
                  <br />
                  By bringing together institutions and talented lecturers from
                  both academia and industry, this platform expands
                  opportunities for everyone involved. It gives institutions
                  access to a wider network of qualified educators, helps
                  lighten the workload of full-time staff, and ultimately raises
                  the standard of education.
                  <br />
                  <br />
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row">
                  <h4 className="font-semibold text-black dark:text-white w-full md:w-56">
                    Contact Us
                  </h4>
                </div>
                <div className="flex flex-col md:flex-row">
                  <h4 className="font-semibold text-black dark:text-white w-full md:w-56">
                    E-mail:
                  </h4>
                  <p>chanaka152@gmail.com</p>
                </div>

                <div className="flex flex-col md:flex-row">
                  <h4 className="font-semibold text-black dark:text-white w-full md:w-56">
                    Telephone Number:
                  </h4>
                  <p>+94766046486</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default About;